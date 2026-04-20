#!/bin/bash

# ONELINK CRM - Backup Unused Screens Script
# วันที่: 17 กุมภาพันธ์ 2569
# วัตถุประสงค์: ย้ายไฟล์หน้าจอที่ไม่ได้ใช้งานไปที่โฟลเดอร์ backup

echo "🗂️  ONELINK CRM - Backup Unused Screens"
echo "========================================"
echo ""

# สร้างโฟลเดอร์ backup
BACKUP_DIR="src/app/components/screens/_backup_versions"
echo "📁 Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
mkdir -p "$BACKUP_DIR/customer-versions"
mkdir -p "$BACKUP_DIR/dashboard-versions"
mkdir -p "$BACKUP_DIR/deal-versions"
mkdir -p "$BACKUP_DIR/other-screens"
mkdir -p "$BACKUP_DIR/admin-subfolder"
echo "✅ Backup directories created"
echo ""

# นับจำนวนไฟล์
TOTAL_FILES=0
MOVED_FILES=0

echo "🔄 Moving unused screen files..."
echo ""

# ========================================
# Customer Detail Versions (7 ไฟล์)
# ========================================
echo "📦 Customer Detail Versions:"

FILES=(
  "customer-detail-screen.tsx"
  "customer-detail-screen-enhanced.tsx"
  "customer-detail-screen-enhanced-v2.tsx"
  "customer-detail-simple.tsx"
  "customer-detail-ultra-simple.tsx"
  "customer-detail-hcp.tsx"
  "customer-detail-mobile.tsx"
)

for file in "${FILES[@]}"; do
  TOTAL_FILES=$((TOTAL_FILES + 1))
  SOURCE="src/app/components/screens/$file"
  DEST="$BACKUP_DIR/customer-versions/$file"
  
  if [ -f "$SOURCE" ]; then
    mv "$SOURCE" "$DEST"
    echo "  ✅ Moved: $file"
    MOVED_FILES=$((MOVED_FILES + 1))
  else
    echo "  ⚠️  Not found: $file"
  fi
done

echo ""

# ========================================
# Dashboard Versions (3 ไฟล์)
# ========================================
echo "📦 Dashboard Versions:"

FILES=(
  "dashboard-screen.tsx"
  "improved-dashboard-screen.tsx"
  "admin-dashboard-screen.tsx"
)

for file in "${FILES[@]}"; do
  TOTAL_FILES=$((TOTAL_FILES + 1))
  SOURCE="src/app/components/screens/$file"
  DEST="$BACKUP_DIR/dashboard-versions/$file"
  
  if [ -f "$SOURCE" ]; then
    mv "$SOURCE" "$DEST"
    echo "  ✅ Moved: $file"
    MOVED_FILES=$((MOVED_FILES + 1))
  else
    echo "  ⚠️  Not found: $file"
  fi
done

echo ""

# ========================================
# Deal Versions (2 ไฟล์)
# ========================================
echo "📦 Deal Versions:"

FILES=(
  "deals-list-screen-new.tsx"
  "deal-detail-screen-redesign.tsx"
)

for file in "${FILES[@]}"; do
  TOTAL_FILES=$((TOTAL_FILES + 1))
  SOURCE="src/app/components/screens/$file"
  DEST="$BACKUP_DIR/deal-versions/$file"
  
  if [ -f "$SOURCE" ]; then
    mv "$SOURCE" "$DEST"
    echo "  ✅ Moved: $file"
    MOVED_FILES=$((MOVED_FILES + 1))
  else
    echo "  ⚠️  Not found: $file"
  fi
done

echo ""

# ========================================
# Other Screens (12 ไฟล์)
# ========================================
echo "📦 Other Unused Screens:"

FILES=(
  "quotation-screen.tsx"
  "contract-list-screen.tsx"
  "approval-list-screen.tsx"
  "activities-screen.tsx"
  "site-visit-overview.tsx"
  "site-visit-detail.tsx"
  "admin-master-screen.tsx"
  "admin-tags-screen.tsx"
  "tickets-screen.tsx"
  "data-structure-overview.tsx"
  "layout-manager.tsx"
  "layout-preview-modal.tsx"
)

for file in "${FILES[@]}"; do
  TOTAL_FILES=$((TOTAL_FILES + 1))
  SOURCE="src/app/components/screens/$file"
  DEST="$BACKUP_DIR/other-screens/$file"
  
  if [ -f "$SOURCE" ]; then
    mv "$SOURCE" "$DEST"
    echo "  ✅ Moved: $file"
    MOVED_FILES=$((MOVED_FILES + 1))
  else
    echo "  ⚠️  Not found: $file"
  fi
done

echo ""

# ========================================
# Admin Subfolder (5 ไฟล์)
# ========================================
echo "📦 Admin Subfolder Files:"

FILES=(
  "admin/admin-master-data-screen.tsx"
  "admin/admin-quotation-templates-screen.tsx"
  "admin/admin-contract-templates-screen.tsx"
  "admin/admin-security-policy-screen.tsx"
  "admin/admin-business-structure-screen.tsx"
)

for file in "${FILES[@]}"; do
  TOTAL_FILES=$((TOTAL_FILES + 1))
  SOURCE="src/app/components/screens/$file"
  FILENAME=$(basename "$file")
  DEST="$BACKUP_DIR/admin-subfolder/$FILENAME"
  
  if [ -f "$SOURCE" ]; then
    mv "$SOURCE" "$DEST"
    echo "  ✅ Moved: $file"
    MOVED_FILES=$((MOVED_FILES + 1))
  else
    echo "  ⚠️  Not found: $file"
  fi
done

echo ""
echo "========================================"
echo "📊 Summary:"
echo "  Total files to backup: $TOTAL_FILES"
echo "  Successfully moved: $MOVED_FILES"
echo "  Not found: $((TOTAL_FILES - MOVED_FILES))"
echo ""
echo "✅ Backup completed!"
echo "📁 Backup location: $BACKUP_DIR"
echo ""
echo "💡 Note: คุณสามารถลบโฟลเดอร์ _backup_versions ได้ถ้าไม่ต้องการ"
echo "   หรือเก็บไว้เผื่อใช้ในอนาคต"
echo ""
