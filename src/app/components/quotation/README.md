# ONELINK CRM - Professional Quotation Module

## Overview

A comprehensive enterprise-grade quotation system with 4 dynamic templates for logistics services. Built with React, TypeScript, and Tailwind CSS, featuring real-time A4 preview and Thai/English language support.

---

## Features

### ✅ Core Capabilities
- **4 Dynamic Templates** - Warehouse, Customs, Cross-Border, International Freight
- **A4 Layout System** - Professional print-ready documents (794px × 1123px)
- **Bilingual Support** - Full Thai/English toggle
- **Real-time Preview** - Live document preview while editing
- **Split-View Interface** - Form editor (left) + Live preview (right)
- **Responsive Design** - Desktop, tablet, and mobile layouts
- **PDF Export Ready** - Optimized for PDF generation
- **Component-Based** - Reusable, modular architecture

---

## File Structure

```
/src/app/components/quotation/
├── quotation-types.ts                      # TypeScript type definitions
├── quotation-constants.ts                  # Constants and default values
├── quotation-components.tsx                # Reusable UI components
├── quotation-preview.tsx                   # Master preview component
├── quotation-creator-screen.tsx            # Main creator with split view
├── template-selection-screen.tsx           # Template selection grid
├── quotation-builder-main.tsx              # Entry point wrapper
├── a4-preview-frame.tsx                    # A4 document frame
├── dynamic-tables.tsx                      # Table components (Warehouse, Transport, Service)
│
├── template-forms/                         # Template-specific forms
│   ├── warehouse-transport-form.tsx
│   ├── customs-license-form.tsx
│   ├── cross-border-form.tsx
│   └── international-freight-form.tsx
│
└── template-previews/                      # Template-specific previews
    ├── warehouse-transport-preview.tsx
    ├── customs-license-preview.tsx
    ├── cross-border-preview.tsx
    └── international-freight-preview.tsx
```

---

## Template Specifications

### 1. Warehouse + Transport Template
**Use Case:** Combined warehousing and domestic transportation services

**Sections:**
- 4.1 Warehousing Service Rates (toggleable)
  - Columns: No | Service | Rate | Unit | Remarks
- 4.2 Transportation Rates (toggleable)
  - Columns: No | Truck Type | Origin | Destination | Price | Unit | Remarks

**Best For:** Full-service logistics with storage and delivery

---

### 2. Customs & License Template
**Use Case:** Import/export clearance and license management

**Sections:**
- 4.1 Customs Clearance Rates (toggleable)
- 4.2 License Management Rates (toggleable)
- 4.3 Combined Package (toggleable)
- General Remarks (large text area)
  - Columns: No | Service | Price | Unit | Remarks

**Best For:** Companies handling customs documentation and compliance

---

### 3. Cross-Border Transport (CLMV) Template
**Use Case:** Regional cross-border logistics in CLMV countries

**Sections:**
- 4.1 Rate Summary (large text block)
- CLMV Remarks (Cambodia, Laos, Myanmar, Vietnam specifics)
- JTS Remarks (Join Through Service notes)
- Sales & Customs Remarks
- 4.2 Optional Customs & License table

**Best For:** International land transport in Southeast Asia

---

### 4. International Freight (Air/Sea) Template
**Use Case:** Global freight forwarding by air and ocean

**Sections:**
- 4.1 Air Freight (toggleable)
  - Export/Import checkboxes
  - Service rate table
  - Specific remarks
- 4.2 Sea Freight (toggleable)
  - Export/Import checkboxes
  - Service rate table
  - Specific remarks
- 4.3 Optional Customs & License table

**Best For:** International shipping companies

---

## Component System

### Core Components

#### 1. `SectionHeader`
Professional section headers with numbering and gradient underline
```tsx
<SectionHeader 
  number="1" 
  title="คำนำ" 
  titleEn="Introduction" 
  language="th" 
/>
```

#### 2. `EditableTextBlock`
Multi-line text editor for content sections
```tsx
<EditableTextBlock
  value={content}
  onChange={setContent}
  rows={6}
  placeholder="Enter content..."
/>
```

#### 3. `ToggleSection`
Collapsible sections with toggle switch
```tsx
<ToggleSection
  enabled={isEnabled}
  onToggle={setEnabled}
  title="Optional Section"
>
  {/* Content */}
</ToggleSection>
```

#### 4. `SignatureBlock` & `ApprovalBlock`
Professional signature and approval sections
```tsx
<SignatureBlock
  name="John Doe"
  position="Sales Manager"
  date="2024-01-15"
  language="en"
/>
```

---

### Table Components

#### 1. `WarehousingTable`
Specialized table for warehouse services
- Columns: No, Service, Rate, Unit, Remarks
- Add/delete rows dynamically
- Preview and edit modes

#### 2. `TransportTable`
Transportation service table
- Columns: No, Truck Type, Origin, Destination, Price, Unit, Remarks
- Route-based pricing
- Dynamic row management

#### 3. `ServiceTable`
Generic service table (for customs, freight, etc.)
- Columns: No, Service, Price, Unit, Remarks (optional)
- Flexible for various service types
- Configurable columns

---

## Master Quotation Structure

Every quotation follows this consistent structure:

```
1. Header
   - Company logo and info
   - Quotation number, dates
   - Customer information

2. Section 1: Introduction
   - Welcome message
   - Project overview

3. Section 2: Service Description
   - Detailed service explanation

4. Section 3: Scope of Work
   - Clear deliverables definition

5. Section 4: Service Rates (DYNAMIC)
   - Template-specific rate tables
   - Varies by template type

6. Section 5: Terms & Conditions
   - Payment terms
   - Validity period
   - Legal conditions

7. Signature Block
   - Authorized signatory
   - Date and position

8. Approval Block (Optional)
   - Manager approval
   - Conditional display
```

---

## Usage Guide

### Basic Implementation

```tsx
import { QuotationBuilderMain } from "./components/quotation/quotation-builder-main";

function App() {
  return (
    <QuotationBuilderMain
      onBack={() => navigate('/quotations')}
      onSave={(data) => {
        console.log('Saving:', data);
        // Save to backend
      }}
    />
  );
}
```

### Standalone Template Selection

```tsx
import { TemplateSelectionScreen } from "./components/quotation/template-selection-screen";

<TemplateSelectionScreen
  onSelectTemplate={(type) => console.log(type)}
  onBack={() => history.back()}
/>
```

### Direct Creator (Skip Template Selection)

```tsx
import { QuotationCreatorScreen } from "./components/quotation/quotation-creator-screen";

<QuotationCreatorScreen
  templateType="warehouse-transport"
  onBack={() => navigate(-1)}
  onSave={(data) => saveQuotation(data)}
/>
```

---

## A4 Layout System

### Dimensions
- **Width:** 794px (210mm at 96 DPI)
- **Height:** 1123px (297mm at 96 DPI)
- **Padding:** 48-64px (print margins)

### Preview Scaling
```tsx
<A4PreviewFrame scale={0.65}>
  <QuotationPreview data={quotationData} />
</A4PreviewFrame>
```

Scales dynamically for screen viewing while maintaining print proportions.

---

## Responsive Breakpoints

### Desktop (≥1024px)
- Split view: Form (50%) | Preview (50%)
- Full feature set
- Side-by-side editing

### Tablet (768px - 1023px)
- Stacked layout
- Toggle between form and preview
- Optimized controls

### Mobile (≤767px)
- Wizard-style flow
- Step-by-step sections
- Full-screen preview mode
- Sticky action buttons

---

## Color System

Inherits from ONELINK CRM brand identity:

```css
--primary: #7BC9A6          /* Pastel Green */
--primary-dark: #6CB88A     /* Dark Green */
--primary-light: #B8E6D5    /* Light Green */
--accent: #5FB88E           /* Accent Green */
```

Template-specific accents:
- Warehouse: `#7BC9A6`
- Customs: `#5FB88E`
- Cross-Border: `#6CB88A`
- International: `#4FA67C`

---

## Language Support

### Thai (th)
- Default language
- Full section translations
- Thai date formatting
- Local business terms

### English (en)
- Complete English translations
- International date format
- Global terminology

Toggle implementation:
```tsx
const [language, setLanguage] = useState<"th" | "en">("th");

// Language toggle UI
<button onClick={() => setLanguage("th")}>TH</button>
<button onClick={() => setLanguage("en")}>EN</button>
```

---

## Data Structure

```typescript
interface QuotationData {
  templateType: QuotationTemplateType;
  language: "th" | "en";
  info: QuotationInfo;
  customer: CustomerInfo;
  company: CompanyInfo;
  introduction: string;
  description: string;
  scopeOfWork: string;
  templateData: any; // Template-specific
  termsAndConditions: string;
  signatureName: string;
  signaturePosition: string;
  approvalRequired: boolean;
  approverName?: string;
  approverPosition?: string;
}
```

---

## PDF Generation

### Planned Implementation
```tsx
import html2pdf from 'html2pdf.js';

const handleGeneratePDF = () => {
  const element = document.getElementById('quotation-preview');
  
  html2pdf()
    .from(element)
    .set({
      margin: 0,
      filename: `Quotation-${quotationNo}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .save();
};
```

### Print Styles
- Remove shadows and interactive elements
- Optimize for print media
- Maintain exact A4 dimensions

---

## Future Enhancements

### Phase 2
- [ ] Save as draft
- [ ] Quotation history
- [ ] Clone existing quotations
- [ ] Email integration
- [ ] Digital signature

### Phase 3
- [ ] Multi-currency support
- [ ] Tax calculation
- [ ] Discount management
- [ ] Approval workflows
- [ ] Analytics dashboard

### Phase 4
- [ ] API integration
- [ ] Template customization
- [ ] Brand logo upload
- [ ] Custom fields
- [ ] Advanced permissions

---

## Best Practices

### Performance
- Use React.memo for table rows
- Debounce text input changes
- Lazy load preview components
- Optimize re-renders

### Accessibility
- Keyboard navigation support
- ARIA labels for form fields
- Screen reader compatibility
- Focus management

### Code Quality
- TypeScript strict mode
- Comprehensive prop types
- Error boundaries
- Unit tests for calculations

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

Print preview tested on:
- Chrome Print
- Firefox Print
- Safari Print
- PDF generators

---

## License

Part of ONELINK CRM system.  
© 2024 ONELINK Logistics Co., Ltd.

---

## Support

For issues or questions:
- Technical: dev@onelink.co.th
- Business: sales@onelink.co.th
- Documentation: https://docs.onelink.co.th/quotation-module
