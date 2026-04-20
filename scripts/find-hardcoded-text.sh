#!/bin/bash

# ONELINK CRM - Hardcoded Text Finder
# This script finds all hardcoded Thai and English text in components

echo "🔍 ONELINK CRM - Hardcoded Text Finder"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counter
total_files_with_issues=0

echo "📁 Searching in: src/app/components"
echo ""

# Function to check file
check_file() {
    local file=$1
    local has_issues=false
    
    # Check for Thai text
    if grep -q '[ก-๙]' "$file" 2>/dev/null; then
        if ! grep -q "// Thai content OK" "$file"; then
            if [ "$has_issues" = false ]; then
                echo -e "${RED}❌ $file${NC}"
                has_issues=true
            fi
            echo -e "  ${YELLOW}⚠ Contains Thai text${NC}"
            grep -n '[ก-๙]' "$file" | head -3 | while read line; do
                echo -e "    Line: $line"
            done
        fi
    fi
    
    # Check for hardcoded button text
    if grep -qE '<Button[^>]*>[A-Z][a-z]+ ?[A-Z]?[a-z]*</Button>' "$file" 2>/dev/null; then
        if [ "$has_issues" = false ]; then
            echo -e "${RED}❌ $file${NC}"
            has_issues=true
        fi
        echo -e "  ${YELLOW}⚠ Hardcoded button text${NC}"
        grep -nE '<Button[^>]*>[A-Z][a-z]+ ?[A-Z]?[a-z]*</Button>' "$file" | head -3 | while read line; do
            echo -e "    Line: $line"
        done
    fi
    
    # Check for hardcoded placeholders
    if grep -qE 'placeholder="[^{]' "$file" 2>/dev/null; then
        if [ "$has_issues" = false ]; then
            echo -e "${RED}❌ $file${NC}"
            has_issues=true
        fi
        echo -e "  ${YELLOW}⚠ Hardcoded placeholder${NC}"
        grep -nE 'placeholder="[^{]' "$file" | head -3 | while read line; do
            echo -e "    Line: $line"
        done
    fi
    
    # Check if file uses useTranslation
    if ! grep -q "useTranslation" "$file" 2>/dev/null; then
        if [ "$has_issues" = true ]; then
            echo -e "  ${RED}⚠ Missing useTranslation import${NC}"
        fi
    fi
    
    if [ "$has_issues" = true ]; then
        total_files_with_issues=$((total_files_with_issues + 1))
        echo ""
    fi
}

# Find all TypeScript React files
echo "Scanning components..."
echo ""

find src/app/components -name "*.tsx" -type f | while read file; do
    check_file "$file"
done

echo ""
echo "========================================"
echo -e "${BLUE}📊 Summary${NC}"
echo "========================================"
echo -e "Total files with hardcoded text: ${RED}$total_files_with_issues${NC}"
echo ""
echo -e "${GREEN}✅ Recommendation:${NC}"
echo "1. Start with high-priority files (see HARDCODED_TEXT_FIX_GUIDE.md)"
echo "2. Add useTranslation hook to each file"
echo "3. Replace hardcoded text with t() calls"
echo "4. Test language switching"
echo ""
echo "See /HARDCODED_TEXT_FIX_GUIDE.md for detailed instructions"
echo ""
