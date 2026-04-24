#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.join(process.cwd(), 'src');

function getSourceFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getSourceFiles(fullPath));
    } else if (['.tsx', '.ts'].includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = getSourceFiles(SRC_DIR);
let totalIssues = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(process.cwd(), file);
  
  const issues = [];
  
  // Check DialogContent without DialogDescription
  const dialogBlocks = content.match(/<DialogContent\b[\s\S]*?<\/DialogContent>/g) || [];
  for (const block of dialogBlocks) {
    if (!/<DialogDescription\b/.test(block)) {
      issues.push(`Missing DialogDescription`);
    }
  }
  
  // Check DialogPrimitive.Content aria-describedby
  const primitiveBlocks = content.match(/<DialogPrimitive\.Content\b[\s\S]*?>/g) || [];
  for (const block of primitiveBlocks) {
    if (!/aria-describedby=\{props\["aria-describedby"\] \?\? undefined\}/.test(block)) {
      issues.push(`Incorrect aria-describedby in DialogPrimitive.Content`);
    }
  }
  
  // Check custom modal
  if (/<div\s+className="[^"]*\bfixed\s+inset-0\b/.test(content)) {
    issues.push('Custom modal with fixed inset-0');
  }
  
  if (issues.length > 0) {
    console.log(`\n${relPath}:`);
    issues.forEach(issue => console.log(`  - ${issue}`));
    totalIssues += issues.length;
  }
});

console.log(`\n\nTotal issues: ${totalIssues}`);
