#!/bin/bash

# ONELINK CRM - Purple to Green Color Migration Script
# This script converts all purple colors to green across the entire codebase

echo "Starting color migration from Purple to Green..."

# Define color mappings
declare -A color_map=(
  ["#705add"]="#16a34a"
  ["#8b5cf6"]="#22c55e"
  ["#a78bfa"]="#4ade80"
  ["#c4b5fd"]="#86efac"
  ["#ddd6fe"]="#bbf7d0"
  ["#e9d5ff"]="#dcfce7"
  ["#ede9fe"]="#f0fdf4"
  ["#f3e8ff"]="#f0fdf4"
  ["#f5f3ff"]="#f0fdf4"
  ["#faf8ff"]="#f0fdf4"
  ["#4c1d95"]="#15803d"
  ["#5b21b6"]="#16a34a"
  ["#6d28d9"]="#15803d"
  ["#7c3aed"]="#22c55e"
  ["#9333ea"]="#4ade80"
  ["#6B21A8"]="#15803d"
  ["#C4B5FD"]="#86efac"
  ["#E9D5FF"]="#dcfce7"
)

# Tailwind class mappings
declare -A class_map=(
  ["purple-50"]="green-50"
  ["purple-100"]="green-100"
  ["purple-200"]="green-200"
  ["purple-300"]="green-300"
  ["purple-400"]="green-400"
  ["purple-500"]="green-500"
  ["purple-600"]="green-600"
  ["purple-700"]="green-700"
  ["violet-"]="green-"
)

# Find all .tsx files
find ./src -name "*.tsx" -type f | while read -r file; do
  echo "Processing: $file"
  
  # Create temporary file
  temp_file=$(mktemp)
  cp "$file" "$temp_file"
  
  # Replace hex colors
  for old_color in "${!color_map[@]}"; do
    new_color="${color_map[$old_color]}"
    sed -i "s/$old_color/$new_color/g" "$temp_file"
  done
  
  # Replace Tailwind classes
  for old_class in "${!class_map[@]}"; do
    new_class="${class_map[$old_class]}"
    sed -i "s/$old_class/$new_class/g" "$temp_file"
  done
  
  # Move temp file back
  mv "$temp_file" "$file"
done

echo "Color migration completed!"
echo "All purple colors have been converted to green."
