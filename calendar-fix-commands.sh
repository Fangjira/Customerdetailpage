#!/bin/bash
# Commands to fix calendar-screen.tsx

# 1. Add import after line 28
sed -i '28 a import { AddActivityModal } from "../modals/add-activity-modal";' /src/app/components/screens/calendar-screen.tsx

# 2. Replace lines 1097-1103 with new AddActivityModal usage
sed -i '1097,1103d' /src/app/components/screens/calendar-screen.tsx
sed -i '1096 a \      <AddActivityModal\n        isOpen={showCreateModal}\n        onClose={() => {\n          setShowCreateModal(false);\n        }}\n        onSave={(activityData) => {\n          console.log("New activity created:", activityData);\n          setShowCreateModal(false);\n        }}\n      />' /src/app/components/screens/calendar-screen.tsx

# 3. Delete CreateActivityModal function from line 1370 to end
sed -i '1370,$ {/^\/\/ Create Activity Modal Component/,$ d}' /src/app/components/screens/calendar-screen.tsx

echo "Done!"
