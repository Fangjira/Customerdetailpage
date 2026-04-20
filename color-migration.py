#!/usr/bin/env python3
"""
ONELINK CRM Color Migration Script
Converts all purple colors to green across the entire codebase
"""

import os
import re
from pathlib import Path

# Color mapping: Purple -> Green
COLOR_MAP = {
    # Hex colors (case-insensitive)
    r'#705add': '#16a34a',
    r'#8b5cf6': '#22c55e',
    r'#a78bfa': '#4ade80',
    r'#c4b5fd': '#86efac',
    r'#ddd6fe': '#bbf7d0',
    r'#e9d5ff': '#dcfce7',
    r'#ede9fe': '#f0fdf4',
    r'#f3e8ff': '#f0fdf4',
    r'#f5f3ff': '#f0fdf4',
    r'#faf8ff': '#f0fdf4',
    r'#4c1d95': '#15803d',
    r'#5b21b6': '#16a34a',
    r'#6d28d9': '#15803d',
    r'#7c3aed': '#22c55e',
    r'#9333ea': '#4ade80',
    r'#6B21A8': '#15803d',
    r'#C4B5FD': '#86efac',
    r'#E9D5FF': '#dcfce7',
    
    # Tailwind classes
    r'purple-50': 'green-50',
    r'purple-100': 'green-100',
    r'purple-200': 'green-200',
    r'purple-300': 'green-300',
    r'purple-400': 'green-400',
    r'purple-500': 'green-500',
    r'purple-600': 'green-600',
    r'purple-700': 'green-700',
    r'purple-800': 'green-800',
    r'purple-900': 'green-900',
    r'violet-': 'green-',
}

def replace_colors_in_file(file_path):
    """Replace all purple colors with green in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply all replacements (case-insensitive for hex colors)
        for old_color, new_color in COLOR_MAP.items():
            # Use case-insensitive replacement for hex colors
            if old_color.startswith('#'):
                content = re.sub(re.escape(old_color), new_color, content, flags=re.IGNORECASE)
            else:
                # Case-sensitive for Tailwind classes
                content = content.replace(old_color, new_color)
        
        # Write back only if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Updated: {file_path}")
            return True
        return False
    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all TSX files"""
    src_dir = Path('./src')
    
    if not src_dir.exists():
        print("Error: ./src directory not found")
        return
    
    print("Starting color migration from Purple to Green...")
    print("-" * 60)
    
    # Find all .tsx files
    tsx_files = list(src_dir.rglob('*.tsx'))
    total_files = len(tsx_files)
    updated_files = 0
    
    print(f"Found {total_files} .tsx files to process\n")
    
    for file_path in tsx_files:
        if replace_colors_in_file(file_path):
            updated_files += 1
    
    print("\n" + "-" * 60)
    print(f"Migration complete!")
    print(f"Updated: {updated_files}/{total_files} files")
    print("-" * 60)

if __name__ == "__main__":
    main()
