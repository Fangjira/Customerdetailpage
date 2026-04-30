# 🎨 Task & Activity Detail Modal Design System

## Overview

A comprehensive, professional UI design system for displaying Task and Activity details in an Enterprise CRM. Covers **8 distinct scenarios** with clean, highly organized layouts.

---

## 🚀 Quick Access

**URL**: Navigate to `/task-activity-modal-demo` in your application

Or update your navigation menu to include:
```typescript
handleNavigation("/task-activity-modal-demo")
```

---

## 📋 8 Design Scenarios

### Screen 1: Private To-Do ✅
**Use Case**: Personal task with complete privacy

**Key Features**:
- 🔒 **Private visibility** - No shared with section displayed
- 👤 **Single assignee** - "You"
- 🔴 **High priority** indicator
- 📅 **Due date & time** display
- 📝 **Task description** field

**Visual Elements**:
- Gray "Private" badge with lock icon
- No shared avatars (section completely hidden)
- Task mode badge (green)

---

### Screen 2: Shared Personal To-Do 👥
**Use Case**: Task shared with specific team members

**Key Features**:
- 👁️ **Specific people visibility**
- 👥 **Shared with block** - 2 team member avatars displayed
- 👤 **Assignee** - "You"
- 📝 **Task description**

**Visual Elements**:
- Blue "Specific People" badge with eye icon
- Avatar display for Sarah Chen and Mike Johnson
- Blue-bordered shared with section
- Clear visual distinction from private tasks

---

### Screen 3: Delegated Task 🎯
**Use Case**: Task assigned to multiple team members

**Key Features**:
- 🌐 **Organization visibility** - Visible to everyone
- 👥 **Multiple assignees** - Mr. A and Mr. B
- 📋 **Task description** with delegation context
- 🟠 **Medium priority**

**Visual Elements**:
- Green "Organization" badge with globe icon
- Multiple assignee avatars (purple and orange)
- Clear delegation messaging
- No "You" indicator (delegated to others)

---

### Screen 4: Multi-task & Linked Entity 🔗
**Use Case**: Multiple topic tags with linked business entities

**Key Features**:
- 🏷️ **2 topic tags** - "Send Document" and "Follow up Customer"
- 🔗 **Linked Entities block** - Deal card with icon
- 💼 **Deal reference** - "Ocean Freight" with briefcase icon
- 🌐 **Organization visibility**

**Visual Elements**:
- Multiple topic tag badges
- Orange-themed linked entity card with icon
- Clickable entity card design
- Entity type label (DEAL) with name

---

### Screen 5: Private Activity 📅
**Use Case**: Private meeting with customer

**Key Features**:
- 📅 **Activity mode** - Full date/time/location display
- 🎥 **Interaction type** - "Online Meeting" with video icon
- 📍 **Location** - Zoom Meeting Room
- 🏢 **Related customer** - Giant Group
- 📋 **Agenda** field
- 🔒 **Private visibility**

**Visual Elements**:
- Purple activity info block with 4 fields grid
- Date with formatted display (e.g., "Wed, Apr 24, 2026")
- Time range (14:00 - 15:30)
- Blue customer card with building icon
- Activity mode badge (purple)

---

### Screen 6: Team Activity & New Lead 🆕
**Use Case**: Customer visit with new lead contact information

**Key Features**:
- 🆕 **New Lead indicator** - Orange badge
- 📧 **Email display** - contact@neologistics.com
- 📱 **Phone display** - +66-2-123-4567
- 👥 **Multiple attendees** - 3 team members
- 🏷️ **Service tags** - "Logistics" and "Warehouse"
- 📍 **On-site visit** type

**Visual Elements**:
- Prominent "New Lead" badge on customer card
- Contact information grid (email + phone)
- Multiple attendee avatars (You, David Lee, Anna Wang)
- Indigo service tag badges
- Enhanced customer card with contact details section

---

### Screen 7: Mixed Mode (Task + Activity) 🔄
**Use Case**: Combined task preparation AND activity execution

**Key Features**:
- 📝 **Task description** - "Prepare Presentation"
- 📅 **Activity details** - "Visit Customer" with date/time
- 📋 **Dual topic tags** - Both task and activity types
- 📍 **Location** - Customer Office
- 🎯 **Agenda** - Meeting objectives

**Visual Elements**:
- BOTH task description section AND activity info block
- Mixed mode visual treatment
- Two distinct content areas (task + activity)
- Complete activity date/time/location grid
- Organization visibility

---

### Screen 8: Received Task (Co-Assignee) 📨
**Use Case**: Task/Activity created by manager and assigned to you

**Key Features**:
- 🎗️ **"Assigned to you" banner** - Prominent visual indicator
- 👤 **Created by indicator** - Mr. C - Manager with avatar
- 👥 **Co-assignees display** - You + 3 other team members
- 📅 **Team meeting** activity type
- 🌐 **Organization visibility**

**Visual Elements**:
- Gradient banner (indigo to purple) with left border
- Creator avatar and name prominently displayed
- "Assigned to you by [Name]" text
- Your avatar highlighted with green border
- All attendee avatars displayed
- Clear visual distinction that you're NOT the creator

---

## 🎨 Core UI Components

### 1. Linked Entities Block
```typescript
interface LinkedEntity {
  type: 'deal' | 'document' | 'customer' | 'quotation';
  name: string;
  icon: React.ComponentType;
}
```

**Visual Design**:
- Orange-themed card (#FFF7ED background)
- Icon in colored circle (orange-600)
- Entity type label (uppercase, small)
- Entity name (bold, prominent)
- Hover effect for clickability

---

### 2. Attendees Block (Activity Only)
**Visual Design**:
- Grid layout of avatar + name cards
- "You" highlighted with green border and emerald background
- Other attendees: gray background
- Avatar with colored fallback (initials)
- Attendee count in header

---

### 3. Shared With Block (Visibility = Specific)
**Visual Design**:
- Only shown when visibility is "Specific People"
- Blue-themed cards (#EFF6FF background)
- Avatar + name for each person
- Labeled "Shared with"
- Compact layout

**Behavior**:
- ❌ **Completely hidden** when visibility = "Private"
- ✅ **Shown** when visibility = "Specific People"
- ❌ **Not shown** when visibility = "Organization"

---

## 📊 Visibility System

### Private 🔒
- **Badge**: Gray with lock icon
- **Shared With**: Completely hidden (no section rendered)
- **Use Case**: Personal tasks

### Specific People 👁️
- **Badge**: Blue with eye icon
- **Shared With**: Shown with avatar list
- **Use Case**: Team collaboration

### Organization 🌐
- **Badge**: Green with globe icon
- **Shared With**: Not shown (everyone has access)
- **Use Case**: Company-wide visibility

---

## 🎯 Smart UI Adaptation

### Task Mode Only
**Shows**:
- ✅ Task description
- ✅ Due date & time
- ✅ Priority badge
- ✅ Assignee(s)
- ❌ Activity info block
- ❌ Attendees
- ❌ Agenda

### Activity Mode Only
**Shows**:
- ✅ Activity info block (date/time/type/location)
- ✅ Agenda
- ✅ Attendees
- ✅ Related customer
- ❌ Task description (unless mixed mode)
- ❌ Due date field
- ❌ Priority badge

### Mixed Mode (Task + Activity)
**Shows**:
- ✅ Task description
- ✅ Activity info block
- ✅ Agenda
- ✅ Both topic tags
- ✅ All fields from both modes

---

## 🎨 Design Principles

### 1. Clean & Organized
- Clear visual hierarchy with sections
- Consistent spacing (Tailwind spacing scale)
- Color-coded blocks for different data types
- Proper use of white space

### 2. People-First Design
- Avatars prominently displayed
- Clear "You" vs "Others" distinction
- Team member names always visible
- Creator attribution for received tasks

### 3. Context-Rich
- Linked entities always visible
- Customer information readily available
- Related data in compact cards
- Service tags for quick categorization

### 4. Smart Adaptation
- UI changes based on visibility setting
- Different layouts for task vs activity
- Conditional rendering of sections
- No empty or placeholder sections

---

## 🔧 Technical Implementation

### Component Files
```
/src/app/components/
├── task-activity-detail-modal.tsx    # Main modal component
└── task-activity-modal-demo.tsx      # Demo gallery (8 scenarios)
```

### Props Interface
```typescript
interface TaskActivityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}
```

### Key Features
- 🎨 Tailwind CSS for styling
- 📱 Responsive design
- ♿ Accessible (dialog with proper ARIA)
- 🔄 Reusable component architecture
- 🎯 Type-safe with TypeScript

---

## 📐 Layout Structure

```
┌─────────────────────────────────────┐
│ Header                              │
│ - Title + Mode Badge                │
│ - Topic Tags                        │
│ - Received Task Banner (if needed)  │
├─────────────────────────────────────┤
│ Main Content                        │
│ - Description (Task/Mixed)          │
│ - Activity Info Block (Activity)    │
│ - Agenda (Activity)                 │
│ - Due Date & Priority (Task)        │
│ - Assignees                         │
│ - Attendees (Activity)              │
│ - Related Customer                  │
│ - Service Tags                      │
│ - Linked Entities                   │
├─────────────────────────────────────┤
│ Visibility & Sharing                │
│ - Visibility Badge                  │
│ - Shared With (if specific)         │
├─────────────────────────────────────┤
│ Footer Actions                      │
│ - Close Button                      │
│ - Mark as Complete Button           │
└─────────────────────────────────────┘
```

---

## 🎨 Color Palette

### Mode Indicators
- **Task Mode**: Emerald (#059669)
- **Activity Mode**: Purple (#9333EA)
- **Mixed Mode**: Indigo (#4F46E5)

### Visibility
- **Private**: Gray (#6B7280)
- **Specific People**: Blue (#2563EB)
- **Organization**: Emerald (#059669)

### Priority
- **High**: Red (#DC2626)
- **Medium**: Orange (#EA580C)
- **Low**: Blue (#2563EB)

### Data Blocks
- **Activity Info**: Purple (#F3E8FF)
- **Customer Info**: Blue (#DBEAFE)
- **Linked Entities**: Orange (#FFF7ED)
- **Task Description**: Gray (#F9FAFB)

---

## 🚦 Testing Scenarios

### Visual Testing Checklist
- [ ] All 8 scenarios render correctly
- [ ] Visibility badges display proper colors
- [ ] Avatars load with correct initials
- [ ] "You" is highlighted properly
- [ ] Shared with section hidden for private tasks
- [ ] New lead contact info displays correctly
- [ ] Received task banner is prominent
- [ ] Activity info grid is properly aligned
- [ ] Linked entities show correct icons
- [ ] Modal is responsive on mobile

---

## 📱 Responsive Behavior

### Desktop (>1024px)
- Full 2-column grid for activity info
- All fields visible side-by-side

### Tablet (768px - 1023px)
- 2-column grid maintained
- Slightly reduced padding

### Mobile (<768px)
- Single column layout
- Activity info stacks vertically
- Full-width cards

---

## 🎯 Use Cases Summary

| Scenario | Primary Use Case | Key Feature |
|----------|------------------|-------------|
| #1 | Personal task | Private visibility |
| #2 | Team collaboration | Shared with specific people |
| #3 | Task delegation | Multiple assignees |
| #4 | Entity linking | Related deals/documents |
| #5 | Private meeting | Activity with customer |
| #6 | New lead capture | Contact information display |
| #7 | Complex workflow | Task + Activity combined |
| #8 | Received assignment | Creator attribution |

---

## 🔗 Integration

### Using in Your App

1. **Import the modal**:
```typescript
import { TaskActivityDetailModal } from './components/task-activity-detail-modal';
```

2. **Add state**:
```typescript
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedScenario, setSelectedScenario] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);
```

3. **Render**:
```typescript
<TaskActivityDetailModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  scenario={selectedScenario}
/>
```

### Adapting for Real Data

Replace the `SCENARIOS` constant with your actual data fetching:

```typescript
// Instead of fixed scenarios, fetch real data
const taskData = await fetchTaskById(taskId);

// Map your data to the expected format
const modalProps = {
  title: taskData.name,
  topicTags: taskData.tags,
  assignee: taskData.assignedTo,
  // ... etc
};
```

---

## 📚 Additional Resources

- **Component File**: `/src/app/components/task-activity-detail-modal.tsx`
- **Demo File**: `/src/app/components/task-activity-modal-demo.tsx`
- **Route**: `/task-activity-modal-demo`
- **Tailwind Docs**: https://tailwindcss.com/docs

---

## ✨ Best Practices

1. **Always show creator** for received tasks
2. **Hide empty sections** - Don't show "Shared with" if not applicable
3. **Highlight current user** with distinct styling
4. **Use semantic colors** - Red for urgent, green for completed
5. **Maintain consistency** across all modes
6. **Provide context** - Show related entities and customers
7. **Make actions clear** - Prominent CTA buttons

---

**🎉 You now have a complete, professional Task & Activity detail modal system ready for production use!**

Access the demo at: **`/task-activity-modal-demo`**
