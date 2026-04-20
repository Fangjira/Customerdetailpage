#!/usr/bin/env python3
import re

# Read file
with open('/src/app/components/screens/calendar-screen.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and modify
new_lines = []
skip_until_line = -1
import_added = False

for i, line in enumerate(lines, 1):
    # Skip lines if we're inside CreateActivityModal function
    if skip_until_line > 0:
        if i <= skip_until_line:
            continue
        else:
            skip_until_line = -1
    
    # Add import after line 28
    if i == 29 and not import_added:
        new_lines.append('import { AddActivityModal } from "../modals/add-activity-modal";\n')
        import_added = True
    
    # Replace CreateActivityModal usage (around line 1098)
    if i == 1098 and 'CreateActivityModal' in line:
        # Replace the next few lines
        new_lines.append('        <AddActivityModal\n')
        new_lines.append('          isOpen={showCreateModal}\n')
        # Skip original onClose line (1099-1101)
        continue
    elif i == 1099:
        new_lines.append('          onClose={() => {\n')
        continue
    elif i == 1100:
        new_lines.append('            setShowCreateModal(false);\n')
        new_lines.append('          }}\n')
        new_lines.append('          onSave={(activityData) => {\n')
        new_lines.append('            console.log("New activity created:", activityData);\n')
        new_lines.append('            setShowCreateModal(false);\n')
        new_lines.append('          }}\n')
        continue
    elif i == 1101:
        # Skip the closing of onClose
        continue
    
    # Delete CreateActivityModal function (from line 1370 onwards)
    if i == 1370 and '// Create Activity Modal Component' in line:
        # Find the end of this function - it's the last line of the file
        skip_until_line = len(lines)
        continue
    
    new_lines.append(line)

# Write back
with open('/src/app/components/screens/calendar-screen.tsx', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ Fixed calendar-screen.tsx!")
print(f"   - Added AddActivityModal import")
print(f"   - Replaced CreateActivityModal with AddActivityModal")
print(f"   - Removed old CreateActivityModal function")
