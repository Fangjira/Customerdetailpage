#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.join(process.cwd(), 'src');
const TARGET_EXTENSIONS = new Set(['.tsx', '.ts', '.jsx', '.js']);
const MAX_PASSES = 8;

function getSourceFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getSourceFiles(fullPath));
      continue;
    }
    if (TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function stripLayoutConflictClasses(classValue) {
  return classValue
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => !/^top-/.test(token) && !/^left-/.test(token) && !/translate-/.test(token))
    .join(' ');
}

function fixDialogPrimitiveContent(content) {
  let changed = false;

  // Force normalized spread + aria-describedby order for DialogPrimitive.Content
  content = content.replace(/<DialogPrimitive\.Content([\s\S]*?)>/g, (full, attrs) => {
    if (!attrs.includes('{...props}')) {
      return full;
    }

    // Keep ref if present; drop pre-existing aria-describedby/spread in attrs, preserve className and others.
    const refMatch = attrs.match(/\sref=\{[^}]+\}/);
    const classNameMatch = attrs.match(/\sclassName=\{[\s\S]*?\}/);

    let cleaned = attrs
      .replace(/\saria-describedby=\{[\s\S]*?\}/g, '')
      .replace(/\s\{\.\.\.props\}/g, '')
      .trim();

    // Remove preserved attrs from cleaned body to avoid duplication.
    if (refMatch) cleaned = cleaned.replace(refMatch[0].trim(), '').trim();
    if (classNameMatch) cleaned = cleaned.replace(classNameMatch[0].trim(), '').trim();

    const parts = ['<DialogPrimitive.Content'];
    if (refMatch) parts.push(refMatch[0].trim());
    if (cleaned) parts.push(cleaned);
    parts.push('{...props}');
    parts.push('aria-describedby={props["aria-describedby"] ?? undefined}');
    if (classNameMatch) parts.push(classNameMatch[0].trim());
    const rebuilt = `${parts.join('\n        ')}>`;

    if (rebuilt !== full) changed = true;
    return rebuilt;
  });

  return { content, changed };
}

function ensureDescriptionInDialogContent(content) {
  let changed = false;

  content = content.replace(/<DialogContent\b([\s\S]*?)>([\s\S]*?)<\/DialogContent>/g, (block, attrs, inner) => {
    const hasDescription = /<DialogDescription\b/.test(inner);
    if (hasDescription) return block;

    let updatedInner = inner;

    if (/<DialogHeader\b[\s\S]*?<\/DialogHeader>/.test(inner)) {
      updatedInner = inner.replace(/(<DialogHeader\b[\s\S]*?>)([\s\S]*?)(<\/DialogHeader>)/, (hBlock, open, hInner, close) => {
        if (/<DialogDescription\b/.test(hInner)) return hBlock;
        changed = true;
        return `${open}${hInner}\n          <DialogDescription className=\"sr-only\">\n            Dialog description\n          </DialogDescription>${close}`;
      });
    } else {
      changed = true;
      updatedInner = `\n        <DialogHeader>\n          <DialogTitle>Title</DialogTitle>\n          <DialogDescription className=\"sr-only\">\n            Dialog description\n          </DialogDescription>\n        </DialogHeader>${inner}`;
    }

    return `<DialogContent${attrs}>${updatedInner}</DialogContent>`;
  });

  return { content, changed };
}

function fixDialogContentLayoutClasses(content) {
  let changed = false;
  content = content.replace(/<DialogContent\b([\s\S]*?)>/g, (full, attrs) => {
    const classMatch = attrs.match(/className=("([^"]*)"|'([^']*)')/);
    if (!classMatch) return full;
    const quoteWrapped = classMatch[1];
    const classValue = classMatch[2] || classMatch[3] || '';
    const stripped = stripLayoutConflictClasses(classValue);
    if (stripped === classValue) return full;
    changed = true;
    const newClassExpr = quoteWrapped[0] === '"' ? `\"${stripped}\"` : `'${stripped}'`;
    return full.replace(`className=${quoteWrapped}`, `className=${newClassExpr}`);
  });

  return { content, changed };
}

function replaceCustomModalSkeleton(content) {
  let changed = false;
  const skeleton = `<Dialog open={true}>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Title</DialogTitle>\n      <DialogDescription className=\"sr-only\">\n        Dialog description\n      </DialogDescription>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>`;

  content = content.replace(/<div\s+className=\"([^\"]*\bfixed\s+inset-0\b[^\"]*)\"([^>]*)>/g, (full, cls, rest) => {
    if (/\bDialog\b/.test(full)) return full;
    changed = true;
    return skeleton;
  });

  return { content, changed };
}

function scanIssues(fileContent) {
  const issues = [];

  const dialogBlocks = fileContent.match(/<DialogContent\b[\s\S]*?<\/DialogContent>/g) || [];
  for (const block of dialogBlocks) {
    if (!/<DialogDescription\b/.test(block)) {
      issues.push('DialogContent without DialogDescription');
    }
    if (/\bclassName=/.test(block) && /(?:\btop-[^\s"'}]+|\bleft-[^\s"'}]+|translate-[^\s"'}]+)/.test(block)) {
      issues.push('DialogContent layout conflict classes');
    }
  }

  const primitiveBlocks = fileContent.match(/<DialogPrimitive\.Content\b[\s\S]*?>/g) || [];
  for (const block of primitiveBlocks) {
    if (!/aria-describedby=\{props\["aria-describedby"\] \?\? undefined\}/.test(block)) {
      issues.push('aria-describedby overridden incorrectly');
    }
    if (!/\{\.\.\.props\}/.test(block)) {
      issues.push('DialogPrimitive.Content missing {...props}');
    }
  }

  if (/<div\s+className=\"[^\"]*\bfixed\s+inset-0\b/.test(fileContent)) {
    issues.push('Custom modal (fixed inset-0)');
  }

  if (/from\s+["']@radix-ui\/react-dialog["']/.test(fileContent)) {
    issues.push('Direct Radix dialog usage');
  }

  if (/from\s+["'][^"']*ui\/dialog["']/.test(fileContent) && /from\s+["']@radix-ui\/react-dialog["']/.test(fileContent)) {
    issues.push('Multiple dialog systems in same file');
  }

  return issues;
}

function applyFixesToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let touched = false;

  const fixers = [
    fixDialogPrimitiveContent,
    ensureDescriptionInDialogContent,
    fixDialogContentLayoutClasses,
    replaceCustomModalSkeleton,
  ];

  for (const fix of fixers) {
    const result = fix(content);
    content = result.content;
    touched = touched || result.changed;
  }

  if (touched && content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }

  return false;
}

function scanAndFix() {
  const files = getSourceFiles(SRC_DIR);
  const modified = new Set();

  for (let pass = 1; pass <= MAX_PASSES; pass++) {
    let passChanges = 0;

    for (const file of files) {
      if (applyFixesToFile(file)) {
        modified.add(path.relative(process.cwd(), file));
        passChanges++;
      }
    }

    let remainingIssues = 0;
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      remainingIssues += scanIssues(content).length;
    }

    if (passChanges === 0 || remainingIssues === 0) {
      return {
        fixedFilesCount: modified.size,
        remainingIssues,
        modifiedFiles: Array.from(modified).sort(),
        passes: pass,
      };
    }
  }

  let remainingIssues = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    remainingIssues += scanIssues(content).length;
  }

  return {
    fixedFilesCount: modified.size,
    remainingIssues,
    modifiedFiles: Array.from(modified).sort(),
    passes: MAX_PASSES,
  };
}

if (!fs.existsSync(SRC_DIR)) {
  console.error(`src directory not found at: ${SRC_DIR}`);
  process.exit(1);
}

const result = scanAndFix();
console.log(`✔ Fixed files count: ${result.fixedFilesCount}`);
console.log(`✔ Remaining issues: ${result.remainingIssues}`);
console.log('✔ Files modified:');
if (result.modifiedFiles.length === 0) {
  console.log('- none');
} else {
  for (const file of result.modifiedFiles) {
    console.log(`- ${file}`);
  }
}
console.log(`✔ Passes run: ${result.passes}`);
