# 👁️ Visual Guide - All 8 Scenarios

A text-based visual preview of each modal scenario.

---

## Scenario 1: Private To-Do 🔒

```
┌─────────────────────────────────────────────────────┐
│ Private To-Do                          [Task] ✅    │
│ 📌 Compile Monthly Sales Report                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📝 Task Description                                 │
│ ┌─────────────────────────────────────────────┐   │
│ │ Compile and analyze all sales data from... │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 📅 Due Date              🎯 Priority                │
│ Wed, Apr 25, 2026        🔴 HIGH                   │
│ 17:00                                               │
│                                                     │
│ 👤 Assignee                                         │
│ ┌──────────┐                                       │
│ │ 🟢 You   │                                       │
│ └──────────┘                                       │
│                                                     │
│ Visibility                                          │
│ 🔒 Private                                          │
│                                                     │
│ [Close]  [Mark as Complete ✓]                      │
└─────────────────────────────────────────────────────┘
```

**Key Points**:
- ❌ NO "Shared With" section (completely hidden)
- ✅ Private badge with lock icon
- ✅ "You" as single assignee
- ✅ Task description + due date + priority

---

## Scenario 2: Shared Personal To-Do 👥

```
┌─────────────────────────────────────────────────────┐
│ Shared Personal To-Do                  [Task] ✅    │
│ 📌 Prepare Q2 Sales Plan                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📝 Task Description                                 │
│ ┌─────────────────────────────────────────────┐   │
│ │ Create comprehensive Q2 sales plan...       │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 📅 Due Date              🎯 Priority                │
│ Mon, Apr 28, 2026        🔴 HIGH                   │
│ 15:00                                               │
│                                                     │
│ 👤 Assignee                                         │
│ ┌──────────┐                                       │
│ │ 🟢 You   │                                       │
│ └──────────┘                                       │
│                                                     │
│ Visibility                     Shared with          │
│ 👁️ Specific People            ┌─────────────┐     │
│                                │ SC  MJ      │     │
│                                │ Sarah Mike  │     │
│                                └─────────────┘     │
│                                                     │
│ [Close]  [Mark as Complete ✓]                      │
└─────────────────────────────────────────────────────┘
```

**Key Points**:
- ✅ "Shared with" section VISIBLE with 2 avatars
- ✅ Blue "Specific People" badge
- ✅ Sarah Chen and Mike Johnson avatars shown

---

## Scenario 3: Delegated Task 🎯

```
┌─────────────────────────────────────────────────────┐
│ Delegated Task                         [Task] ✅    │
│ 📌 Coordinate Product Claim                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📝 Task Description                                 │
│ ┌─────────────────────────────────────────────┐   │
│ │ Coordinate with logistics team and...       │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 📅 Due Date              🎯 Priority                │
│ Sun, Apr 27, 2026        🟠 MEDIUM                 │
│                                                     │
│ 👥 Assignees (2)                                    │
│ ┌────────┐  ┌────────┐                            │
│ │ A      │  │ B      │                            │
│ │ Mr. A  │  │ Mr. B  │                            │
│ └────────┘  └────────┘                            │
│                                                     │
│ Visibility                                          │
│ 🌐 Organization                                     │
│                                                     │
│ [Close]  [Mark as Complete ✓]                      │
└─────────────────────────────────────────────────────┘
```

**Key Points**:
- ✅ Multiple assignees (Mr. A and Mr. B)
- ✅ Green "Organization" badge
- ✅ No "Shared with" section (organization-wide)
- ❌ No "You" (delegated to others)

---

## Scenario 4: Multi-task & Linked Entity 🔗

```
┌─────────────────────────────────────────────────────┐
│ Multi-task & Linked Entity             [Task] ✅    │
│ 📌 Send Document  📌 Follow up Customer            │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📝 Task Description                                 │
│ ┌─────────────────────────────────────────────┐   │
│ │ Send updated contract documents...          │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 📅 Due Date              🎯 Priority                │
│ Fri, Apr 26, 2026        🔴 HIGH                   │
│                                                     │
│ 👤 Assignee                                         │
│ ┌──────────┐                                       │
│ │ 🟢 You   │                                       │
│ └──────────┘                                       │
│                                                     │
│ 🔗 Linked Entities                                  │
│ ┌─────────────────────────────────────────────┐   │
│ │ 💼 DEAL                                     │   │
│ │    Ocean Freight                            │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ Visibility                                          │
│ 🌐 Organization                                     │
│                                                     │
│ [Close]  [Mark as Complete ✓]                      │
└─────────────────────────────────────────────────────┘
```

**Key Points**:
- ✅ TWO topic tags displayed
- ✅ Linked entity card (orange) with deal icon
- ✅ "Ocean Freight" deal prominently shown

---

## Scenario 5: Private Activity 📅

```
┌─────────────────────────────────────────────────────┐
│ Private Activity                    [Activity] 🟣   │
│ 📌 Schedule Meeting                                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ 🎥 Online Meeting    │ 📅 Wed, Apr 24, 2026    ││
│ │ ⏰ 14:00 - 15:30     │ 📍 Zoom Meeting Room    ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ 📋 Agenda                                           │
│ ┌─────────────────────────────────────────────┐   │
│ │ Discuss project requirements, timeline...   │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 👤 Attendees (1)                                    │
│ ┌──────────┐                                       │
│ │ 🟢 You   │                                       │
│ └──────────┘                                       │
│                                                     │
│ 🏢 Related Customer                                 │
│ ┌─────────────────────────────────────────────┐   │
│ │ 🏢 Giant Group                              │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ Visibility                                          │
│ 🔒 Private                                          │
│                                                     │
│ [Close]  [Mark as Complete ✓]                      │
└─────────────────────────────────────────────────────┘
```

**Key Points**:
- ✅ Purple activity info block (2x2 grid)
- ✅ Date/Time/Type/Location all shown
- ✅ Agenda field present
- ✅ Related customer card
- ✅ Attendees section (only "You")
- ❌ No task description or priority

---

## Scenario 6: Team Activity & New Lead 🆕

```
┌─────────────────────────────────────────────────────┐
│ Team Activity & New Lead           [Activity] 🟣    │
│ 📌 Visit Customer                                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ 📍 On-site Visit     │ 📅 Fri, Apr 25, 2026    ││
│ │ ⏰ 10:00 - 12:00     │ 📍 Neo Logistics HQ     ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ 📋 Agenda                                           │
│ ┌─────────────────────────────────────────────┐   │
│ │ Initial site visit to assess logistics...   │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 👥 Attendees (3)                                    │
│ ┌────┐ ┌────┐ ┌────┐                              │
│ │🟢You│ │DL  │ │AW  │                              │
│ │    │ │David│ │Anna│                              │
│ └────┘ └────┘ └────┘                              │
│                                                     │
│ 🏢 Related Customer                                 │
│ ┌─────────────────────────────────────────────┐   │
│ │ 🏢 Neo Logistics            [New Lead] 🆕   │   │
│ ├─────────────────────────────────────────────┤   │
│ │ 📧 contact@neologistics.com                 │   │
│ │ 📱 +66-2-123-4567                           │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 🏷️ Service Tags                                    │
│ [Logistics]  [Warehouse]                           │
│                                                     │
│ Visibility                                          │
│ 🌐 Organization                                     │
│                                                     │
│ [Close]  [Mark as Complete ✓]                      │
└─────────────────────────────────────────────────────┘
```

**Key Points**:
- ✅ "New Lead" badge in ORANGE
- ✅ EMAIL prominently displayed
- ✅ PHONE prominently displayed
- ✅ 3 attendee avatars
- ✅ Service tags shown
- ✅ Contact info in grid layout

---

## Scenario 7: Mixed Mode (Task + Activity) 🔄

```
┌─────────────────────────────────────────────────────┐
│ Mixed Mode (Task + Activity)       [Activity] 🟣    │
│ 📌 Prepare Presentation  📌 Visit Customer         │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 📝 Task Description                                 │
│ ┌─────────────────────────────────────────────┐   │
│ │ Prepare comprehensive presentation...       │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ 🚗 Customer Visit    │ 📅 Sat, Apr 26, 2026    ││
│ │ ⏰ 09:00 - 11:00     │ 📍 Customer Office      ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ 📋 Agenda                                           │
│ ┌─────────────────────────────────────────────┐   │
│ │ Present company capabilities, demonstrate...│   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 📅 Due Date              🎯 Priority                │
│ Sat, Apr 26, 2026        🔴 HIGH                   │
│                                                     │
│ 👤 Assignee                                         │
│ ┌──────────┐                                       │
│ │ 🟢 You   │                                       │
│ └──────────┘                                       │
│                                                     │
│ Visibility                                          │
│ 🌐 Organization                                     │
│                                                     │
│ [Close]  [Mark as Complete ✓]                      │
└─────────────────────────────────────────────────────┘
```

**Key Points**:
- ✅ BOTH task description AND activity block
- ✅ TWO topic tags
- ✅ Activity info block present
- ✅ Agenda shown
- ✅ Due date AND priority (from task mode)
- ✅ Complete mixed mode layout

---

## Scenario 8: Received Task (Co-Assignee) 📨

```
┌─────────────────────────────────────────────────────┐
│ Received Task (Co-Assignee)       [Activity] 🟣     │
│ 📌 Monthly Sales Team Meeting                      │
├═════════════════════════════════════════════════════┤
│ ║ 👤 Assigned to you by Mr. C - Manager        ║   │
│ ╚════════════════════════════════════════════════╝  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌─────────────────────────────────────────────────┐│
│ │ 👥 Team Meeting      │ 📅 Wed, Apr 30, 2026    ││
│ │ ⏰ 13:00 - 15:00     │ 📍 Conference Room A    ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ 📋 Agenda                                           │
│ ┌─────────────────────────────────────────────┐   │
│ │ Review monthly sales performance, discuss...│   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ 👥 Assignees (4)                                    │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                       │
│ │🟢You│ │ A  │ │ SC │ │ MJ │                       │
│ │    │ │Mr.A│ │Sarah│ │Mike│                       │
│ └────┘ └────┘ └────┘ └────┘                       │
│                                                     │
│ 👥 Attendees (4)                                    │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐                       │
│ │🟢You│ │ A  │ │ SC │ │ MJ │                       │
│ │    │ │Mr.A│ │Sarah│ │Mike│                       │
│ └────┘ └────┘ └────┘ └────┘                       │
│                                                     │
│ Visibility                                          │
│ 🌐 Organization                                     │
│                                                     │
│ [Close]  [Mark as Complete ✓]                      │
└─────────────────────────────────────────────────────┘
```

**Key Points**:
- ✅ **PROMINENT BANNER** at top (gradient indigo-purple)
- ✅ Left border (4px indigo)
- ✅ Creator avatar shown (MC - Mr. C)
- ✅ "Assigned to you by Mr. C - Manager" text
- ✅ You + 3 co-assignees/attendees
- ✅ "You" highlighted with green border
- ✅ Impossible to miss the assignment indicator

---

## 🎨 Color Legend

### Mode Badges
- 🟢 **Green** = Task mode
- 🟣 **Purple** = Activity mode

### Visibility Badges
- 🔒 **Gray** = Private
- 👁️ **Blue** = Specific People
- 🌐 **Green** = Organization

### Priority
- 🔴 **Red** = High
- 🟠 **Orange** = Medium
- 🔵 **Blue** = Low

### Special Indicators
- 🟢 **Green border** = "You"
- 🆕 **Orange badge** = New Lead
- 📨 **Gradient banner** = Assigned to you

### Data Blocks
- **Purple background** = Activity info
- **Blue background** = Customer info
- **Orange background** = Linked entities
- **Gray background** = Task description

---

## 📊 Feature Comparison Matrix

| Feature | Sc1 | Sc2 | Sc3 | Sc4 | Sc5 | Sc6 | Sc7 | Sc8 |
|---------|-----|-----|-----|-----|-----|-----|-----|-----|
| Task Description | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| Activity Block | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ✅ |
| Attendees | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Shared With | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Linked Entities | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| New Lead Info | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Received Banner | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

---

**🎯 Access all scenarios at**: `/task-activity-modal-demo`

**Click any card to see the full, interactive modal design!** ✨
