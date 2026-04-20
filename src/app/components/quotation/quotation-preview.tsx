import { QuotationData, LanguageType } from "./quotation-types";
import { A4Content } from "./a4-preview-frame";
import { SectionHeader, PreviewTextBlock, SignatureBlock, ApprovalBlock } from "./quotation-components";
import { WarehouseTransportPreview } from "./template-previews/warehouse-transport-preview";
import { CustomsLicensePreview } from "./template-previews/customs-license-preview";
import { CrossBorderPreview } from "./template-previews/cross-border-preview";
import { InternationalFreightPreview } from "./template-previews/international-freight-preview";
import { FreightDetailPreview } from "./freight-detail-preview";

interface QuotationPreviewProps {
  data: QuotationData | null;
}

export function QuotationPreview({ data }: QuotationPreviewProps) {
  if (!data) {
    return (
      <A4Content>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-gray-500 text-sm">ไม่มีข้อมูลใบเสนอราคา</p>
          </div>
        </div>
      </A4Content>
    );
  }

  console.log("🎨 QuotationPreview rendering:", {
    templateType: data.templateType,
    language: data.language,
    description: data.description?.substring(0, 80) + "...",
    scopeOfWork: data.scopeOfWork?.substring(0, 80) + "..."
  });

  const { 
    language, 
    info, 
    customer, 
    company, 
    introduction, 
    description, 
    scopeOfWork, 
    templateData, 
    termsAndConditions, 
    signatureName, 
    signaturePosition, 
    approvalRequired, 
    approverName, 
    approverPosition 
  } = data;

  const labels = {
    th: {
      quotation: "ใบเสนอราคา",
      quotationNo: "เลขที่",
      issueDate: "วันที่ออกใบเสนอราคา",
      effectiveDate: "วันที่มีผลบังคับใช้",
      validUntil: "ใช้ได้ถึงวันที่",
      to: "เรียน",
      company: "บริษัท",
      contactName: "ผู้ติดต่อ",
      position: "ตำแหน่ง",
      email: "อีเมล",
      phone: "โทรศัพท์",
    },
    en: {
      quotation: "QUOTATION",
      quotationNo: "Quotation No.",
      issueDate: "Issue Date",
      effectiveDate: "Effective Date",
      validUntil: "Valid Until",
      to: "To",
      company: "Company",
      contactName: "Contact Name",
      position: "Position",
      email: "Email",
      phone: "Phone",
    },
  };

  const label = labels[language];

  return (
    <A4Content padding="48px">
      {/* Header */}
      <div className="mb-8 pb-6 border-b-2 border-[#7BC9A6]">
        <div className="flex items-start justify-between">
          {/* Company Logo & Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7BC9A6] to-[#5FB88E] flex items-center justify-center">
                <span className="text-white font-bold text-lg">OL</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {language === "th" ? company.name : company.nameEn}
                </h2>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed max-w-md">
              {language === "th" ? company.address : company.addressEn}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {company.phone} | {company.email}
            </p>
          </div>

          {/* Quotation Title */}
          <div className="text-right">
            <h1 className="text-2xl font-bold text-[#7BC9A6] mb-2">{label.quotation}</h1>
            <div className="space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-semibold">{label.quotationNo}:</span> {info.quotationNo}
              </p>
              <p>
                <span className="font-semibold">{label.issueDate}:</span> {info.issueDate}
              </p>
              <p>
                <span className="font-semibold">{label.validUntil}:</span> {info.validUntil}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3">{label.to}</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">{label.company}:</span>
            <span className="ml-2 font-medium text-gray-900">{customer.company}</span>
          </div>
          <div>
            <span className="text-gray-600">{label.contactName}:</span>
            <span className="ml-2 font-medium text-gray-900">{customer.contactName}</span>
          </div>
          <div>
            <span className="text-gray-600">{label.position}:</span>
            <span className="ml-2 font-medium text-gray-900">{customer.position}</span>
          </div>
          <div>
            <span className="text-gray-600">{label.phone}:</span>
            <span className="ml-2 font-medium text-gray-900">{customer.phone}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-600">{label.email}:</span>
            <span className="ml-2 font-medium text-gray-900">{customer.email}</span>
          </div>
        </div>
      </div>

      {/* Section 1: Introduction */}
      <div className="mb-6">
        <SectionHeader
          number="1"
          title="คำนำ"
          titleEn="Introduction"
          language={language}
        />
        <PreviewTextBlock content={introduction || ""} className="text-sm" />
      </div>

      {/* Section 2: Description */}
      {data.templateType !== "customs-license" && (
        <div className="mb-6">
          <SectionHeader
            number="2"
            title="รายละเอียดบริการ"
            titleEn="Service Description"
            language={language}
          />
          <PreviewTextBlock content={description || ""} className="text-sm" />
        </div>
      )}

      {/* Section 3: Scope of Work */}
      {data.templateType !== "customs-license" && (
        <div className="mb-6">
          <SectionHeader
            number="3"
            title="ขอบเขตงาน"
            titleEn="Scope of Work"
            language={language}
          />
          
          {/* Show Freight Detail for International Freight */}
          {data.templateType === "international-freight" && templateData?.freightDetail && (
            <FreightDetailPreview data={templateData.freightDetail} language={language} />
          )}
          
          <PreviewTextBlock content={scopeOfWork || ""} className="text-sm" />
        </div>
      )}

      {/* Section 2-4 for Customs & License: All-in-one */}
      {data.templateType === "customs-license" && (
        <div className="mb-6">
          <SectionHeader
            number="2"
            title="ข้อมูลบริการและขอบเขตงาน"
            titleEn="Service Information & Scope of Work"
            language={language}
          />
          <CustomsLicensePreview data={templateData} language={language} />
        </div>
      )}

      {/* Section 4: Dynamic Rate Section */}
      {data.templateType !== "customs-license" && (
        <div className="mb-6">
          <SectionHeader
            number="4"
            title="อัตราค่าบริการ"
            titleEn="Service Rates"
            language={language}
          />
          {data.templateType === "warehouse-transport" && (
            <WarehouseTransportPreview data={templateData} language={language} />
          )}
          {data.templateType === "cross-border" && (
            <CrossBorderPreview data={templateData} language={language} />
          )}
          {data.templateType === "international-freight" && (
            <InternationalFreightPreview data={templateData} language={language} />
          )}
          {data.templateType === "freight-detail" && (
            <FreightDetailPreview data={templateData} language={language} />
          )}
        </div>
      )}

      {/* Section 5: Terms & Conditions */}
      <div className="mb-6">
        <SectionHeader
          number={data.templateType === "customs-license" ? "3" : "5"}
          title="เงื่อนไขการให้บริการ"
          titleEn="Terms & Conditions"
          language={language}
        />
        <PreviewTextBlock content={termsAndConditions || ""} className="text-sm" />
      </div>

      {/* Signature Block */}
      <SignatureBlock
        name={signatureName || ""}
        position={signaturePosition || ""}
        date={info.issueDate}
        language={language}
      />

      {/* Approval Block */}
      {approvalRequired && approverName && approverPosition && (
        <ApprovalBlock
          name={approverName}
          position={approverPosition}
          language={language}
        />
      )}

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
        {language === "th" ? company.name : company.nameEn} | Tax ID: {company.taxId}
      </div>
    </A4Content>
  );
}