# ⚡ Task & Activity Modal - Quick Reference

## 🚀 Quick Access
```
URL: /task-activity-modal-demo
```

## 📋 8 Scenarios at a Glance

| # | Title | Mode | Visibility | Key Feature |
|---|-------|------|------------|-------------|
| 1 | Private To-Do | Task | 🔒 Private | No sharing section |
| 2 | Shared To-Do | Task | 👁️ Specific | 2 team avatars |
| 3 | Delegated Task | Task | 🌐 Organization | Multiple assignees |
| 4 | Multi-task & Linked | Task | 🌐 Organization | Linked Deal entity |
| 5 | Private Activity | Activity | 🔒 Private | Meeting with customer |
| 6 | Team Activity & Lead | Activity | 🌐 Organization | New lead contact info |
| 7 | Mixed Mode | Both | 🌐 Organization | Task + Activity |
| 8 | Received Task | Activity | 🌐 Organization | "Assigned to you" banner |

---

## 🎨 Visual Elements Quick Guide

### Badges & Indicators

#### Mode Badges
- 🟢 **Task** - Emerald green background
- 🟣 **Activity** - Purple background

#### Visibility Badges
- 🔒 **Private** - Gray with lock icon
- 👁️ **Specific People** - Blue with eye icon
- 🌐 **Organization** - Green with globe icon

#### Priority (Tasks only)
- 🔴 **High** - Red background
- 🟠 **Medium** - Orange background
- 🔵 **Low** - Blue background

#### Special Indicators
- 🆕 **New Lead** - Orange badge on customer card
- 📨 **Assigned to you** - Gradient banner (indigo-purple)

---

### Avatar Displays

#### "You" Avatar
- ✅ Emerald border (2px)
- ✅ Emerald-50 background
- ✅ Emerald-700 text
- ✅ "YU" initials

#### Other Team Members
- Regular gray-50 background
- Gray-200 border
- Colored avatar fallback
- Person's initials

---

## 🎯 Component Blocks

### 1. Linked Entities
```
┌──────────────────────────┐
│ 💼 [Icon]                │
│ DEAL                     │
│ Ocean Freight            │
└──────────────────────────┘
```
- Orange theme (#FFF7ED)
- Icon in circle
- Type label + name

### 2. Activity Info Block
```
┌─────────────────────────────────┐
│ Interaction Type │ Date         │
│ Time             │ Location     │
└─────────────────────────────────┘
```
- Purple theme (#F3E8FF)
- 2x2 grid layout
- Icons for each field

### 3. Customer Card (New Lead)
```
┌──────────────────────────────────┐
│ 🏢 Neo Logistics    [New Lead]   │
├──────────────────────────────────┤
│ 📧 Email  │ 📱 Phone             │
└──────────────────────────────────┘
```
- Blue theme (#DBEAFE)
- Contact info grid
- New lead badge

### 4. Received Task Banner
```
┌──────────────────────────────────┐
│ 👤 Assigned to you by Mr. C      │
└──────────────────────────────────┘
```
- Gradient background
- Left indigo border (4px)
- Creator avatar + name

---

## 🔍 Data Presence Matrix

| Element | Task | Activity | Mixed |
|---------|------|----------|-------|
| Description | ✅ | ❌ | ✅ |
| Due Date | ✅ | ❌ | ✅ |
| Priority | ✅ | ❌ | ❌ |
| Activity Info | ❌ | ✅ | ✅ |
| Agenda | ❌ | ✅ | ✅ |
| Attendees | ❌ | ✅ | ✅ |
| Assignees | ✅ | ✅ | ✅ |

---

## 🎨 Color Reference

### Backgrounds
- Task Description: `bg-gray-50`
- Activity Info: `bg-purple-50`
- Customer Card: `bg-blue-50`
- Linked Entity: `bg-orange-50`
- Shared With: `bg-blue-50`

### Borders
- Task Mode: `border-emerald-200`
- Activity Block: `border-purple-200`
- Customer Card: `border-blue-200`
- Linked Entity: `border-orange-200`

### Text
- Headers: `text-gray-900`
- Labels: `text-gray-700`
- Body: `text-gray-700`
- Meta: `text-gray-600`

---

## ⚙️ Conditional Rendering

### Shared With Section
```typescript
if (visibility === "private") {
  // ❌ Don't render section at all
}
if (visibility === "specific") {
  // ✅ Show avatars
}
if (visibility === "organization") {
  // ❌ Don't render section
}
```

### Received Task Banner
```typescript
if (data.isReceived && data.createdBy) {
  // ✅ Show banner with creator info
}
```

### New Lead Contact
```typescript
if (data.isNewLead) {
  // ✅ Show email and phone fields
  // ✅ Show "New Lead" badge
}
```

---

## 📱 Responsive Breakpoints

```typescript
// Desktop
className="grid-cols-2"  // Activity info grid

// Mobile
className="grid-cols-1"  // Stacks vertically
```

---

## 🔧 Key Props

```typescript
interface Props {
  isOpen: boolean;           // Modal visibility
  onClose: () => void;       // Close handler
  scenario: 1-8;             // Which demo scenario
}
```

---

## 🎯 Common Patterns

### Opening the Modal
```typescript
<Button onClick={() => setOpenScenario(1)}>
  View Scenario 1
</Button>
```

### Avatar Component
```typescript
<Avatar className="h-7 w-7">
  <AvatarFallback className="bg-emerald-500">
    YU
  </AvatarFallback>
</Avatar>
```

### Topic Tags
```typescript
<div className="flex items-center gap-1.5 px-3 py-1.5 
     bg-gray-50 border border-gray-200 rounded-lg">
  <Tag className="h-3.5 w-3.5" />
  <span>{tagName}</span>
</div>
```

---

## ✅ Testing Checklist

Quick visual checks:

- [ ] Scenario 1: No "Shared with" section
- [ ] Scenario 2: 2 avatars in shared section
- [ ] Scenario 3: 2 assignee avatars
- [ ] Scenario 4: Orange deal card
- [ ] Scenario 5: Purple activity block
- [ ] Scenario 6: Email + phone visible
- [ ] Scenario 7: Both description AND activity
- [ ] Scenario 8: "Assigned to you" banner

---

## 🚀 Quick Customization

### Change Colors
```typescript
// Find and replace:
bg-emerald-500  → bg-blue-500   // Your primary color
bg-purple-50    → bg-indigo-50  // Activity theme
bg-orange-50    → bg-yellow-50  // Linked entities
```

### Add New Field
```typescript
// In SCENARIOS object, add:
customField: "Your value"

// In render, add:
<div className="space-y-2">
  <label>Custom Field</label>
  <p>{data.customField}</p>
</div>
```

### Change Icons
```typescript
// Import new icon:
import { YourIcon } from "lucide-react";

// Replace in component:
<YourIcon className="h-4 w-4" />
```

---

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `task-activity-detail-modal.tsx` | Main modal component |
| `task-activity-modal-demo.tsx` | Gallery/demo page |
| `App.tsx` | Route configuration |

---

## 💡 Pro Tips

1. **Always test visibility logic** - Easy to miss conditional rendering
2. **Use scenario 8 as template** for "received" tasks in production
3. **Service tags are flexible** - Can be used for any categorization
4. **Avatar colors should be consistent** per person across the app
5. **Mixed mode is powerful** - Use when workflow has both prep + execution

---

**📍 Demo Location**: `/task-activity-modal-demo`

**🎯 Next Steps**: 
1. View the demo
2. Pick a scenario that matches your use case
3. Adapt the data structure for your backend
4. Integrate into your task/activity screens
