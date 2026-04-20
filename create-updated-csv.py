#!/usr/bin/env python3
"""
สร้างไฟล์ CSV ใหม่โดยแก้ไข Module และ Sub-module ให้ตรงกับหน้าพรีวิวระบบ
"""

import csv

def process_row(row):
    """แก้ไขแต่ละบรรทัดตามกฎที่กำหนด"""
    if not row or len(row) < 8:
        return row
    
    # คัดลอก row
    new_row = row[:]
    
    module = new_row[0] if len(new_row) > 0 else ""
    submodule = new_row[1] if len(new_row) > 1 else ""
    category = new_row[2] if len(new_row) > 2 else ""
    thai_name = new_row[3] if len(new_row) > 3 else ""
    eng_name = new_row[4] if len(new_row) > 4 else ""
    desc = new_row[5] if len(new_row) > 5 else ""
    figma = new_row[6] if len(new_row) > 6 else ""
    page_type = new_row[7] if len(new_row) > 7 else ""
    
    # ===============================================
    # กฎที่ 1: แก้ไข Module "Tasks" → "To-Do"
    # ===============================================
    if module == "Tasks":
        new_row[0] = "To-Do"
        
        # แก้ไข Sub-module names
        if submodule == "Task List Views":
            new_row[1] = "To-Do List Views"
        elif submodule == "Task Detail & Management":
            new_row[1] = "To-Do Detail & Management"
        elif submodule == "Task Actions & Modals":
            new_row[1] = "To-Do Actions & Modals"
        elif submodule == "Task Filters & Bulk Actions":
            new_row[1] = "To-Do Filters & Bulk Actions"
        elif submodule == "Task States":
            new_row[1] = "To-Do States"
        
        # แก้ไข Figma Frame Name
        new_row[6] = figma.replace("Tasks_", "ToDo_")
        
        # แก้ไขชื่อภาษาไทย - ครอบคลุมทุกกรณี
        replacements_thai = [
            ("รายการงาน - มุมมองรายการ", "รายการ To-Do - มุมมองรายการ"),
            ("รายการงาน - มุมมองบอร์ด", "รายการ To-Do - มุมมองบอร์ด"),
            ("รายการงาน - มุมมองปฏิทิน", "รายการ To-Do - มุมมองปฏิทิน"),
            ("งานของฉัน", "To-Do ของฉัน"),
            ("งานทีม", "To-Do ของทีม"),
            ("รายละเอียดงาน - แก้ไข", "รายละเอียด To-Do - แก้ไข"),
            ("รายละเอียดงาน", "รายละเอียด To-Do"),
            ("สร้างงานใหม่", "สร้าง To-Do ใหม่"),
            ("แก้ไขงาน", "แก้ไข To-Do"),
            ("ลบงาน - ยืนยัน", "ลบ To-Do - ยืนยัน"),
            ("คัดลอกงาน", "คัดลอก To-Do"),
            ("มอบหมายงาน", "มอบหมาย To-Do"),
            ("เปลี่ยนสถานะงาน", "เปลี่ยนสถานะ To-Do"),
            ("เพิ่มหมายเหตุในงาน", "เพิ่มหมายเหตุใน To-Do"),
            ("ประวัติการเปลี่ยนแปลงงาน", "ประวัติการเปลี่ยนแปลง To-Do"),
            ("กรองตามสถานะงาน", "กรองตามสถานะ To-Do"),
            ("การดำเนินการงานเป็นกลุ่ม", "การดำเนินการ To-Do เป็นกลุ่ม"),
            ("มอบหมายงานหลาย", "มอบหมาย To-Do หลาย"),
            ("เปลี่ยนสถานะงานหลาย", "เปลี่ยนสถานะ To-Do หลาย"),
            ("ลบงานหลาย", "ลบ To-Do หลาย"),
            ("ไม่มีงาน", "ไม่มี To-Do"),
            ("ไม่มีงานที่กรอง", "ไม่มี To-Do ที่กรอง"),
            ("เมื่อเลือกงาน", "เมื่อเลือก To-Do"),
        ]
        
        for old, new in replacements_thai:
            new_row[3] = new_row[3].replace(old, new)
        
        # แก้ไขชื่อภาษาอังกฤษ - ครอบคลุมทุกกรณี
        replacements_eng = [
            ("Task List - List View", "To-Do List - List View"),
            ("Task List - Kanban View", "To-Do List - Kanban View"),
            ("Task List - Calendar View", "To-Do List - Calendar View"),
            ("My Tasks", "My To-Do"),
            ("Team Tasks", "Team To-Do"),
            ("Task Detail - Edit Mode", "To-Do Detail - Edit Mode"),
            ("Task Detail", "To-Do Detail"),
            ("Create Task", "Create To-Do"),
            ("Edit Task", "Edit To-Do"),
            ("Delete Task - Confirm", "Delete To-Do - Confirm"),
            ("Duplicate Task", "Duplicate To-Do"),
            ("Assign Task", "Assign To-Do"),
            ("Change Status", "Change Status"),
            ("Add Note", "Add Note"),
            ("Attach File", "Attach File"),
            ("Task History", "To-Do History"),
            ("Filter by Status", "Filter by Status"),
            ("Filter by Priority", "Filter by Priority"),
            ("Filter by Assignee", "Filter by Assignee"),
            ("Filter by Due Date", "Filter by Due Date"),
            ("Advanced Filters", "Advanced Filters"),
            ("Bulk Actions Bar", "Bulk Actions Bar"),
            ("Bulk Assign", "Bulk Assign"),
            ("Bulk Change Status", "Bulk Change Status"),
            ("Bulk Delete - Confirm", "Bulk Delete - Confirm"),
            ("No Tasks", "No To-Do"),
            ("No Filtered Tasks", "No Filtered To-Do"),
        ]
        
        for old, new in replacements_eng:
            new_row[4] = new_row[4].replace(old, new)
        
        # แก้ไข Description
        desc_replacements = [
            ("แสดงงานทั้งหมด", "แสดง To-Do ทั้งหมด"),
            ("แสดงงานใน", "แสดง To-Do ใน"),
            ("งานที่มอบหมาย", "To-Do ที่มอบหมาย"),
            ("งานของทีม", "To-Do ของทีม"),
            ("หน้าแสดงรายละเอียดงาน", "หน้าแสดงรายละเอียด To-Do"),
            ("โหมดแก้ไขข้อมูลงาน", "โหมดแก้ไขข้อมูล To-Do"),
            ("Modal/Page สร้างงาน", "Modal/Page สร้าง To-Do"),
            ("Modal/Page แก้ไขงาน", "Modal/Page แก้ไข To-Do"),
            ("Modal ยืนยันการลบงาน", "Modal ยืนยันการลบ To-Do"),
            ("Modal คัดลอกงาน", "Modal คัดลอก To-Do"),
            ("Modal มอบหมายงาน", "Modal มอบหมาย To-Do"),
            ("Dropdown/Modal เปลี่ยนสถานะงาน", "Dropdown/Modal เปลี่ยนสถานะ To-Do"),
            ("Modal เพิ่มหมายเหตุในงาน", "Modal เพิ่มหมายเหตุใน To-Do"),
            ("Timeline การเปลี่ยนแปลงงาน", "Timeline การเปลี่ยนแปลง To-Do"),
            ("Tab/Section แสดงประวัติการแก้ไขงาน", "Tab/Section แสดงประวัติการแก้ไข To-Do"),
            ("Filter งานตาม", "Filter To-Do ตาม"),
            ("Action bar เมื่อเลือกงาน", "Action bar เมื่อเลือก To-Do"),
            ("Modal มอบหมายงานหลาย", "Modal มอบหมาย To-Do หลาย"),
            ("Modal เปลี่ยนสถานะงานหลาย", "Modal เปลี่ยนสถานะ To-Do หลาย"),
            ("Modal ยืนยันการลบงานหลาย", "Modal ยืนยันการลบ To-Do หลาย"),
            ("เมื่อไม่มีงาน", "เมื่อไม่มี To-Do"),
            ("เมื่อไม่มีงานตาม", "เมื่อไม่มี To-Do ตาม"),
        ]
        
        for old, new in desc_replacements:
            new_row[5] = new_row[5].replace(old, new)
    
    # ===============================================
    # กฎที่ 2: แก้ไข Sub-module "Customer Visits" → "Visit Log"
    # ===============================================
    if submodule == "Customer Visits":
        new_row[1] = "Visit Log"
        
        # แก้ไข Figma Frame Name
        new_row[6] = figma.replace("Visits_Customers_", "Visits_Log_")
        
        # แก้ไขชื่อภาษาไทย - ครอบคลุมทุกกรณี
        replacements_thai = [
            ("รายการเข้าพบลูกค้า - ตาราง", "ประวัติการเข้าเยี่ยม - ตาราง"),
            ("รายการเข้าพบลูกค้า - การ์ด", "ประวัติการเข้าเยี่ยม - การ์ด"),
            ("ลูกค้าที่ควรเข้าพบ", "ลูกค้าที่ครบรอบเข้าเยี่ยม"),
            ("ลูกค้าที่ไม่ได้เข้าพบนาน", "ลูกค้าที่ไม่ได้เข้าเยี่ยมนาน"),
            ("รายละเอียดการเข้าพบ", "รายละเอียดการเข้าเยี่ยม"),
            ("ประวัติการเข้าพบลูกค้า", "ประวัติการเข้าเยี่ยม"),
            ("บันทึกการเข้าพบ", "บันทึกการเข้าเยี่ยม"),
            ("กำหนดนัดหมายเข้าพบ", "กำหนดนัดหมายเข้าเยี่ยม"),
            ("ยกเลิกนัดหมายเข้าพบ", "ยกเลิกนัดหมายเข้าเยี่ยม"),
            ("เลื่อนนัดหมายเข้าพบ", "เลื่อนนัดหมายเข้าเยี่ยม"),
            ("กรองตามลูกค้าที่เข้าพบ", "กรองตามลูกค้าที่เข้าเยี่ยม"),
            ("กรองตามความถี่การเข้าพบ", "กรองตามความถี่การเข้าเยี่ยม"),
            ("สร้างนัดหมายเป็นกลุ่มเข้าพบ", "สร้างนัดหมายเป็นกลุ่มเข้าเยี่ยม"),
            ("ไม่มีการเข้าพบ", "ไม่มีประวัติการเข้าเยี่ยม"),
        ]
        
        for old, new in replacements_thai:
            new_row[3] = new_row[3].replace(old, new)
        
        # แก้ไขชื่อภาษาอังกฤษ
        replacements_eng = [
            ("Customer Visits - Table", "Visit Log - Table"),
            ("Customer Visits - Card", "Visit Log - Card"),
            ("Customers Due Visit", "Customers Due Visit"),
            ("Inactive Customers", "Inactive Customers"),
            ("Visit Detail", "Visit Detail"),
            ("Customer Visit History", "Visit History"),
            ("Log Visit", "Log Visit"),
            ("Schedule Visit", "Schedule Visit"),
            ("Cancel Visit", "Cancel Visit"),
            ("Reschedule Visit", "Reschedule Visit"),
            ("Filter by Customer", "Filter by Customer"),
            ("Filter by Frequency", "Filter by Frequency"),
            ("Bulk Schedule", "Bulk Schedule"),
            ("No Visits", "No Visits"),
        ]
        
        for old, new in replacements_eng:
            new_row[4] = new_row[4].replace(old, new)
        
        # แก้ไข Description
        desc_replacements = [
            ("แสดงการเข้าพบแยกตามลูกค้า", "ประวัติการเข้าเยี่ยมในรูปแบบตาราง"),
            ("แสดงการเข้าพบในรูปแบบการ์ด", "ประวัติการเข้าเยี่ยมในรูปแบบการ์ด"),
            ("รายการลูกค้าที่ครบรอบต้องเข้าพบ", "ลูกค้าที่ครบรอบต้องเข้าเยี่ยม"),
            ("ลูกค้าที่ไม่ได้เข้าพบนานเกินกำหนด", "ลูกค้าที่ไม่ได้เข้าเยี่ยมนานเกินกำหนด"),
            ("หน้ารายละเอียดการเข้าพบลูกค้าแต่ละครั้ง", "รายละเอียดการเข้าเยี่ยมแต่ละครั้ง"),
            ("Timeline การเข้าพบลูกค้ารายนี้ทั้งหมด", "Timeline การเข้าเยี่ยมทั้งหมด"),
            ("Modal บันทึกการเข้าพบลูกค้า", "Modal บันทึกการเข้าเยี่ยม"),
            ("Modal กำหนดนัดหมายเข้าพบล่วงหน้า", "Modal กำหนดนัดหมายเข้าเยี่ยมล่วงหน้า"),
            ("Modal ยกเลิกนัดหมายเข้าพบ", "Modal ยกเลิกนัดหมายเข้าเยี่ยม"),
            ("Modal เลื่อนนัดหมายเข้าพบ", "Modal เลื่อนนัดหมายเข้าเยี่ยม"),
            ("Filter ตามความถี่การเข้าพบ", "Filter ตามความถี่การเข้าเยี่ยม"),
            ("Modal กำหนดนัดหลายลูกค้าเข้าพบ", "Modal กำหนดนัดหลายลูกค้าเข้าเยี่ยม"),
        ]
        
        for old, new in desc_replacements:
            new_row[5] = new_row[5].replace(old, new)
    
    return new_row


def main():
    input_csv = 'Mini-CRM-Complete-UI-Inventory.csv'
    output_csv = 'Mini-CRM-Complete-UI-Inventory-UPDATED.csv'
    
    print("=" * 70)
    print("  สร้างไฟล์ CSV ใหม่ที่ตรงกับหน้าพรีวิวระบบ")
    print("=" * 70)
    print(f"\n📂 Input:  {input_csv}")
    print(f"📂 Output: {output_csv}\n")
    
    try:
        # อ่านไฟล์ CSV
        with open(input_csv, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            rows = list(reader)
        
        print(f"✓ อ่านไฟล์สำเร็จ: {len(rows)} บรรทัด\n")
        
        # ประมวลผลข้อมูล
        output_rows = []
        changes_count = 0
        tasks_count = 0
        visits_count = 0
        
        for i, row in enumerate(rows):
            if i == 0:
                # Header row
                output_rows.append(row)
            else:
                # ประมวลผลข้อมูล
                original = row[:]
                processed = process_row(row)
                
                if original != processed:
                    changes_count += 1
                    
                    # นับการเปลี่ยนแปลงแต่ละประเภท
                    if len(original) > 0 and original[0] == "Tasks":
                        tasks_count += 1
                    if len(original) > 1 and original[1] == "Customer Visits":
                        visits_count += 1
                
                output_rows.append(processed)
        
        # เขียนไฟล์ CSV ใหม่
        with open(output_csv, 'w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerows(output_rows)
        
        print("=" * 70)
        print("✅ สร้างไฟล์สำเร็จ!")
        print("=" * 70)
        print(f"\n📊 สถิติการเปลี่ยนแปลง:")
        print(f"   • แก้ไขทั้งหมด: {changes_count} บรรทัด")
        print(f"   • Module 'Tasks' → 'To-Do': {tasks_count} บรรทัด")
        print(f"   • Sub-module 'Customer Visits' → 'Visit Log': {visits_count} บรรทัด")
        print(f"\n📋 รายละเอียดการเปลี่ยนแปลง:")
        print(f"   1. Module: Tasks → To-Do")
        print(f"   2. Sub-modules:")
        print(f"      • Task List Views → To-Do List Views")
        print(f"      • Task Detail & Management → To-Do Detail & Management")
        print(f"      • Task Actions & Modals → To-Do Actions & Modals")
        print(f"      • Task Filters & Bulk Actions → To-Do Filters & Bulk Actions")
        print(f"      • Task States → To-Do States")
        print(f"   3. Sub-module: Customer Visits → Visit Log")
        print(f"   4. ปรับคำภาษาไทย/อังกฤษที่เกี่ยวข้องทั้งหมด")
        print(f"   5. อัปเดต Figma Frame Names:")
        print(f"      • Tasks_ → ToDo_")
        print(f"      • Visits_Customers_ → Visits_Log_")
        print(f"\n✅ ไฟล์พร้อมใช้งาน: {output_csv}\n")
        print("=" * 70)
        
    except FileNotFoundError:
        print(f"\n❌ ไม่พบไฟล์: {input_csv}")
        print("   กรุณาตรวจสอบว่าไฟล์อยู่ในโฟลเดอร์เดียวกับสคริปต์\n")
    except Exception as e:
        print(f"\n❌ เกิดข้อผิดพลาด: {str(e)}\n")


if __name__ == '__main__':
    main()
