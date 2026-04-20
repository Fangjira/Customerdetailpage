Enhance an existing CRM interface (Sales Rep focused) to support Admin functionality without redesigning the entire system.

Goal

Extend the current UI to support Admin users who can:

Access all Sales Rep and Sales Manager features
Manage users, customer ownership, and transfers
Approve requests

The design must reuse the existing layout and feel familiar.

Core Principle

Use role-based UI:

Sales Rep → sees only own data
Sales Manager → sees team data
Admin → sees everything + admin tools

Do NOT create a separate admin system.

Top Navigation (Enhancement)

Keep existing role switch dropdown.

Enhance behavior:

When Admin is selected:
Show additional admin menus
Expand data visibility (all customers, all teams)
Sidebar (Dynamic Menu)
Default (Sales Rep view)
Dashboard
To do list
visits
Customer
sales management
Approvals
Admin View (Extended Menu)

Add ONLY these:

User Management
Customer Ownership
Transfer Center
Audit Log (optional)

Keep existing menus visible.

Screen 1: User Management (Admin only)

Add new page:

Table:
Name
Role
Team / BU
Status
Actions:
Create user
Edit role
Deactivate

UX:

Simple, similar to existing table design
Reuse styles from Task / Deal list
Screen 2: Customer Ownership

Add lightweight control into existing "Customer" module:

Add column: Owner
Add button: "Reassign"
Bulk action: change owner

UX:

Do NOT create new complex page
Integrate into existing customer list
Screen 3: Transfer Center

New simple page:

Step 1: Select user (source)
Step 2: Show owned customers
Step 3: Select target user
Step 4: Confirm transfer

UX:

Wizard style (step-by-step)
Clear and minimal
Screen 4: Approval Flow

Reuse existing "อนุมัติ" menu

Enhance:

Add request types:
Ownership transfer
Override assignment
Add approve / reject buttons
Data Visibility Behavior
Sales Rep:
Own customers only
Manager:
Team customers
Admin:
All customers
Can reassign
UI Style
Keep same visual style as current system
Do NOT add heavy dashboards
Avoid complex filters
Focus on operational efficiency
Key UX Rules
Admin actions should be quick (1–2 clicks)
Bulk actions are required
Avoid opening too many pages
Reuse existing components
What NOT to Add
Complex system settings
Technical configuration panels
Overloaded admin dashboards
Tone

Operational, efficient, lightweight — designed for internal admin staff.