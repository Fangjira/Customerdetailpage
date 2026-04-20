import { Building2, Mail, Phone, MapPin, Calendar, FolderKanban, Handshake } from "lucide-react";
import { CustomsLicenseProposalData } from "./proposal-types";
import { CustomsLicensePreview } from "./customs-license-preview";

interface ProposalPreviewProps {
  // Basic info
  proposalName: string;
  proposalNumber: string;
  startDate: string;
  expiryDate: string;
  
  // Customer info
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  
  // Template
  templateType: string | null;
  templateName?: string;
  
  // Services & Sales Channel (NEW)
  selectedServices?: string[];
  supplyChain?: string[];
  salesChannel?: string;
  
  // Description fields (for business-proposal)
  productType?: string;
  packagingType?: string;
  quantity?: string;
  warehouseLocation?: string;
  materialHandlingEquipment?: string;
  storageSpecification?: string;
  typesOfReports?: string;
  communicationMeans?: string;
  distributionService?: string;
  otherServices?: string;
  
  // Scope of Work fields (for business-proposal)
  objectiveEnglish?: string;
  objectiveThai?: string;
  scopeHeaderEnglish?: string;
  scopeHeaderThai?: string;
  scopeActivities?: string;
  
  // Tables
  warehousingRows?: Array<{
    id: string;
    service: string;
    price: string;
    unit: string;
    remarks: string;
  }>;
  
  transportRows?: Array<{
    id: string;
    serviceType: string;
    origin: string;
    destination: string;
    price: string;
    unit: string;
    remarks: string;
  }>;
  
  transportRemarks?: string;
  
  // Generic fields (for other templates)
  executiveSummary?: string;
  objectivesAndGoals?: string;
  scopeOfWork?: string;
  projectValue?: string;
  duration?: string;
  paymentTerms?: string;
  otherTerms?: string;
  
  // Customs & License specific data (for partnership-proposal)
  customsLicenseData?: CustomsLicenseProposalData;
  
  // Terms
  termsAndConditions: string;
}

export function ProposalPreview({
  proposalName,
  proposalNumber,
  startDate,
  expiryDate,
  companyName,
  contactPerson,
  email,
  phone,
  address,
  templateType,
  templateName,
  productType,
  packagingType,
  quantity,
  warehouseLocation,
  materialHandlingEquipment,
  storageSpecification,
  typesOfReports,
  communicationMeans,
  distributionService,
  otherServices,
  objectiveEnglish,
  objectiveThai,
  scopeHeaderEnglish,
  scopeHeaderThai,
  scopeActivities,
  warehousingRows = [],
  transportRows = [],
  transportRemarks,
  executiveSummary,
  objectivesAndGoals,
  scopeOfWork,
  projectValue,
  duration,
  paymentTerms,
  otherTerms,
  termsAndConditions,
  selectedServices,
  supplyChain,
  salesChannel,
  customsLicenseData,
}: ProposalPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get current user info (mock - in real app would come from auth)
  const currentUser = {
    name: "Sarah Chen",
    email: "sarah.chen@onelink-logistics.com"
  };

  return (
    <div className="flex justify-center bg-gray-100 py-8">
      {/* A4 Paper Container */}
      <div 
        className="bg-white shadow-lg" 
        style={{
          width: '210mm',
          minHeight: '297mm',
        }}
      >
        {/* ============= COVER PAGE ============= */}
        <div 
          className="flex flex-col justify-between"
          style={{
            height: '297mm',
            padding: '25mm 20mm',
          }}
        >
          {/* Top Section */}
          <div>
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-[#2563EB] mb-1" style={{ letterSpacing: '0.02em' }}>
                mini CRM
              </h1>
              <p className="text-sm text-[#2563EB] tracking-wide">
                LOGISTICS
              </p>
            </div>

            {/* Title Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ข้อเสนอโครงการ
              </h2>
              <p className="text-base font-semibold text-gray-900 mb-1">
                Business Proposal
              </p>
              <p className="text-sm text-[#2563EB]">
                For Logistics Services
              </p>
            </div>

            {/* Service/Location Info */}
            <div className="text-center mb-12">
              <p className="text-sm text-gray-700 mb-1">
                <span className="font-medium">สถานที่/Site :</span> {warehouseLocation || 'สาขาบึงสนั่นสระบุรี'}
              </p>
            </div>

            {/* Customer Info Box */}
            <div className="max-w-xl mx-auto border-4 border-gray-900 p-8 text-center">
              <p className="text-base text-gray-700 mb-3">
                สามารถนำเสนอต่อนายจ้าง
              </p>
              <p className="text-xl font-bold text-[#DC2626]">
                {contactPerson || 'Mr. Supachai Wongchai'}
              </p>
              {companyName && (
                <p className="text-sm text-gray-700 mt-2">
                  {companyName}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Section - Document Info */}
          <div className="space-y-1 text-sm">
            <div className="flex items-start">
              <span className="text-gray-700 w-48">ออกโดย / ISSUED BY</span>
              <span className="text-gray-700">: </span>
              <span className="text-gray-900 ml-2">{currentUser.name}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-700 w-48">อีเมล / EMAIL</span>
              <span className="text-gray-700">: </span>
              <span className="text-[#2563EB] ml-2">{currentUser.email}</span>
            </div>
            {supplyChain && supplyChain.length > 0 && (
              <div className="flex items-start">
                <span className="text-gray-700 w-48">SUPPLY CHAIN</span>
                <span className="text-gray-700">: </span>
                <span className="text-gray-900 ml-2">{supplyChain.join(', ')}</span>
              </div>
            )}
            <div className="flex items-start">
              <span className="text-gray-700 w-48">ช่องทางการขาย / SALES CHANNEL</span>
              <span className="text-gray-700">: </span>
              <span className="text-gray-900 ml-2">{salesChannel || 'B2B'}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-700 w-48">บริการ / SERVICE</span>
              <span className="text-gray-700">: </span>
              <span className="text-[#2563EB] ml-2">
                {selectedServices && selectedServices.length > 0 
                  ? selectedServices.join(', ') 
                  : (templateName || 'รวมบริการคลังสินค้าและค่าขนส่งทางภาคพื้นดิน')}
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-700 w-48">หมายเลขข้อเสนอ / PROPOSAL NO.</span>
              <span className="text-gray-700">: </span>
              <span className="text-gray-900 ml-2">{proposalNumber || 'QT-2025-0158'}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-700 w-48">วันที่ออกข้อเสนอ / ISSUE DATE</span>
              <span className="text-gray-700">: </span>
              <span className="text-gray-900 ml-2">{formatDate(startDate)}</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-700 w-48">สถานะของข้อเสนอ / ISSUE STATUS:</span>
              <span className="text-[#16A34A] font-semibold ml-2">Approved</span>
            </div>
          </div>
        </div>

        {/* ============= PAGE 2: CONTENT ============= */}
        <div 
          style={{
            padding: '25mm 20mm',
            pageBreakBefore: 'always',
          }}
        >
          {/* Page Header */}
          <div className="flex items-center justify-between border-b-2 border-[#7BC9A6] pb-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#7BC9A6] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">mini CRM</h1>
                <p className="text-xs text-gray-600">Logistics Solutions</p>
              </div>
            </div>
            <div className="text-right text-xs">
              <div className="text-gray-500">Proposal: {proposalNumber}</div>
              <div className="text-gray-500">Page 2</div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#7BC9A6]" />
              Customer Information / ข้อมูลลูกค้า
            </h3>
            
            <div className="border border-gray-300 rounded p-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <div className="text-gray-500 mb-0.5">Company / บริษัท</div>
                  <div className="font-semibold text-gray-900">
                    {companyName || '-'}
                  </div>
                </div>
                
                <div>
                  <div className="text-gray-500 mb-0.5">Contact Person / ผู้ติดต่อ</div>
                  <div className="text-gray-900">
                    {contactPerson || '-'}
                  </div>
                </div>
                
                {email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <div className="text-gray-700">{email}</div>
                  </div>
                )}
                
                {phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <div className="text-gray-700">{phone}</div>
                  </div>
                )}
                
                {address && (
                  <div className="col-span-2 flex items-start gap-1.5 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400 mt-0.5" />
                    <div className="text-gray-700">{address}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Validity Period */}
          {expiryDate && (
            <div className="bg-amber-50 border border-amber-300 rounded p-2.5 mb-5">
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-4 h-4 text-amber-600" />
                <div className="font-medium text-amber-900">
                  ข้อเสนอนี้มีอายุถึง / Valid Until: <span className="font-bold">{formatDate(expiryDate)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Template-specific content for business-proposal */}
          {templateType === "business-proposal" && (
            <>
              {/* 1. DESCRIPTION Section */}
              <div className="mb-5">
                <div className="bg-blue-600 text-white px-3 py-2 rounded-t flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  <h3 className="text-sm font-bold">
                    1. DESCRIPTION / รายละเอียด
                  </h3>
                </div>
                
                <div className="border border-gray-300 border-t-0 rounded-b p-3 space-y-3 text-xs">
                  {/* a) PRODUCTS */}
                  {(productType || packagingType || quantity) && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">a</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">
                          PRODUCTS / ผลิตภัณฑ์
                        </h4>
                      </div>
                      
                      <div className="pl-6 space-y-1">
                        {productType && (
                          <div>
                            <span className="font-semibold text-gray-700">Product type / ประเภทผลิตภัณฑ์: </span>
                            <span className="text-gray-900">{productType}</span>
                          </div>
                        )}
                        {packagingType && (
                          <div>
                            <span className="font-semibold text-gray-700">Packaging type / ประเภทบรรจุภัณฑ์: </span>
                            <span className="text-gray-900">{packagingType}</span>
                          </div>
                        )}
                        {quantity && (
                          <div>
                            <span className="font-semibold text-gray-700">Quantity / ปริมาณผลิตภัณฑ์: </span>
                            <span className="text-gray-900">{quantity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* b) PREFERRED WAREHOUSE LOCATION */}
                  {warehouseLocation && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">b</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">
                          PREFERRED WAREHOUSE LOCATION / สถานที่ที่ต้องการคลังสินค้า
                        </h4>
                      </div>
                      
                      <div className="pl-6">
                        <span className="font-semibold text-gray-700">Site / สถานที่: </span>
                        <span className="text-gray-900">{warehouseLocation}</span>
                      </div>
                    </div>
                  )}

                  {/* c) WAREHOUSING SERVICE */}
                  {(materialHandlingEquipment || storageSpecification || typesOfReports || communicationMeans) && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">c</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">
                          WAREHOUSING SERVICE / บริการคลังสินค้า
                        </h4>
                      </div>
                      
                      <div className="pl-6 space-y-1">
                        {materialHandlingEquipment && (
                          <div>
                            <span className="font-semibold text-gray-700">Material handling equipment / อุปกรณ์การจัดการวัสดุ: </span>
                            <span className="text-gray-900">{materialHandlingEquipment}</span>
                          </div>
                        )}
                        {storageSpecification && (
                          <div>
                            <span className="font-semibold text-gray-700">Storage specification / สเปคการจัดเก็บ: </span>
                            <span className="text-gray-900">{storageSpecification}</span>
                          </div>
                        )}
                        {typesOfReports && (
                          <div>
                            <span className="font-semibold text-gray-700">Types of reports / ประเภทรายงาน: </span>
                            <span className="text-gray-900 whitespace-pre-wrap">{typesOfReports}</span>
                          </div>
                        )}
                        {communicationMeans && (
                          <div>
                            <span className="font-semibold text-gray-700">Communication means / วิธีการสื่อสาร: </span>
                            <span className="text-gray-900">{communicationMeans}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* d) DISTRIBUTION SERVICE */}
                  {distributionService && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">d</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">
                          DISTRIBUTION SERVICE / บริการการจัดจำหน่าย
                        </h4>
                      </div>
                      
                      <div className="pl-6 text-gray-900 whitespace-pre-wrap">
                        {distributionService}
                      </div>
                    </div>
                  )}

                  {/* e) OTHER SERVICES */}
                  {otherServices && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">e</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">
                          OTHER SERVICES / บริการอื่น ๆ
                        </h4>
                      </div>
                      
                      <div className="pl-6 text-gray-900 whitespace-pre-wrap">
                        {otherServices}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. SCOPE OF WORK Section */}
              <div className="mb-5">
                <div className="bg-purple-600 text-white px-3 py-2 rounded-t flex items-center gap-2">
                  <FolderKanban className="w-4 h-4" />
                  <h3 className="text-sm font-bold">
                    2. SCOPE OF WORK / ขอบเขตการทำงาน
                  </h3>
                </div>
                
                <div className="border border-gray-300 border-t-0 rounded-b p-3 space-y-3 text-xs">
                  {/* a) OBJECTIVE */}
                  {(objectiveEnglish || objectiveThai) && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">a</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">
                          OBJECTIVE / วัตถุประสงค์
                        </h4>
                      </div>
                      
                      <div className="pl-6 space-y-2">
                        {objectiveEnglish && (
                          <div>
                            <div className="font-semibold text-gray-700 mb-0.5">English:</div>
                            <div className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                              {objectiveEnglish}
                            </div>
                          </div>
                        )}
                        {objectiveThai && (
                          <div>
                            <div className="font-semibold text-gray-700 mb-0.5">ไทย:</div>
                            <div className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                              {objectiveThai}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* b) SCOPE OF WORK */}
                  {(scopeHeaderEnglish || scopeHeaderThai || scopeActivities) && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">b</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">
                          SCOPE OF WORK / ลักษณะงาน
                        </h4>
                      </div>
                      
                      <div className="pl-6 space-y-2">
                        {scopeHeaderEnglish && (
                          <div className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                            {scopeHeaderEnglish}
                          </div>
                        )}
                        {scopeHeaderThai && (
                          <div className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                            {scopeHeaderThai}
                          </div>
                        )}
                        {scopeActivities && (
                          <div>
                            <div className="font-semibold text-gray-700 mb-1">
                              Activities and Services / กิจกรรมและบริการ:
                            </div>
                            <div className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                              {scopeActivities}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. SERVICE CHARGES Section */}
              <div className="mb-5">
                <div className="bg-green-700 text-white px-3 py-2 rounded-t flex items-center gap-2">
                  <Handshake className="w-4 h-4" />
                  <h3 className="text-sm font-bold">
                    3. Service Charges (Price Structure) / ค่าบริการ (โครงสร้างราคา)
                  </h3>
                </div>
                
                <div className="border border-gray-300 border-t-0 rounded-b p-3 space-y-4">
                  {/* A. Warehousing Services */}
                  {warehousingRows.length > 0 && warehousingRows.some(r => r.service || r.price) && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-green-700 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">A</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">
                          Warehousing Services / ค่าบริการคลังสินค้า
                        </h4>
                      </div>

                      <table className="w-full text-xs border-collapse border border-gray-400">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">NO.<br/>ลำดับ</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">Service<br/>ชื่อบริการ</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">PRICE<br/>ราคา</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">UNIT<br/>หน่วย</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">REMARKS<br/>หมายเหตุ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {warehousingRows.map((row, index) => {
                            if (!row.service && !row.price) return null;
                            return (
                              <tr key={row.id}>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-700">{index + 1}</td>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-900">{row.service || '-'}</td>
                                <td className="border border-gray-400 px-2 py-1.5 font-medium text-gray-900">
                                  {row.price || '-'}
                                </td>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-700">{row.unit || '-'}</td>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-600">{row.remarks || '-'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* B. Transport Services */}
                  {transportRows.length > 0 && transportRows.some(r => r.serviceType || r.price) && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-green-700 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">B</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900">
                          Transport Services / ค่าบริการขนส่งสินค้า
                        </h4>
                      </div>

                      <table className="w-full text-xs border-collapse border border-gray-400">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">NO.<br/>ลำดับ</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">Service Type<br/>ประเภทบริการ</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">Origin<br/>ต้นทาง</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">Destination<br/>ปลายทาง</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">Price<br/>ราคา</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">Unit<br/>หน่วย</th>
                            <th className="border border-gray-400 px-2 py-1.5 text-left font-bold">Remarks<br/>หมายเหตุ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transportRows.map((row, index) => {
                            if (!row.serviceType && !row.price) return null;
                            return (
                              <tr key={row.id}>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-700">{index + 1}</td>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-900">{row.serviceType || '-'}</td>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-700">{row.origin || '-'}</td>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-700">{row.destination || '-'}</td>
                                <td className="border border-gray-400 px-2 py-1.5 font-medium text-gray-900">
                                  {row.price || '-'}
                                </td>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-700">{row.unit || '-'}</td>
                                <td className="border border-gray-400 px-2 py-1.5 text-gray-600">{row.remarks || '-'}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      {/* Transport Remarks */}
                      {transportRemarks && (
                        <div className="mt-2 text-xs">
                          <div className="font-bold text-gray-900 mb-1">Remarks / หมายเหตุ:</div>
                          <div className="text-gray-700 whitespace-pre-wrap pl-3">
                            {transportRemarks}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Generic Proposal Content (for other templates) */}
          {templateType !== "business-proposal" && (
            <>
              {/* Executive Summary */}
              {executiveSummary && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                    บทสรุปผู้บริหาร / Executive Summary
                  </h3>
                  <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {executiveSummary}
                  </div>
                </div>
              )}

              {/* Objectives and Goals */}
              {objectivesAndGoals && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                    วัตถุประสงค์และเป้าหมาย / Objectives and Goals
                  </h3>
                  <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {objectivesAndGoals}
                  </div>
                </div>
              )}

              {/* Scope of Work/Services */}
              {scopeOfWork && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                    ขอบเขตงาน/บริการ / Scope of Work/Services
                  </h3>
                  <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {scopeOfWork}
                  </div>
                </div>
              )}

              {/* Pricing Information */}
              {(projectValue || duration || paymentTerms || otherTerms) && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                    ราคาและเงื่อนไข / Pricing and Terms
                  </h3>
                  <div className="space-y-2 text-xs">
                    {projectValue && (
                      <div>
                        <span className="font-semibold text-gray-700">มูลค่าโครงการ / Project Value: </span>
                        <span className="text-gray-900">{projectValue} บาท</span>
                      </div>
                    )}
                    {duration && (
                      <div>
                        <span className="font-semibold text-gray-700">ระยะเวลาดำเนินการ / Duration: </span>
                        <span className="text-gray-900">{duration}</span>
                      </div>
                    )}
                    {paymentTerms && (
                      <div>
                        <div className="font-semibold text-gray-700 mb-0.5">เงื่อนไขการชำระเงิน / Payment Terms:</div>
                        <div className="text-gray-700 whitespace-pre-wrap pl-3">
                          {paymentTerms}
                        </div>
                      </div>
                    )}
                    {otherTerms && (
                      <div>
                        <div className="font-semibold text-gray-700 mb-0.5">เงื่อนไขและข้อตกลงอื่นๆ / Other Terms:</div>
                        <div className="text-gray-700 whitespace-pre-wrap pl-3">
                          {otherTerms}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Customs & License specific data (for partnership-proposal) */}
          {templateType === "partnership-proposal" && customsLicenseData && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                ข้อมูลใบอนุญาตและเอกสารที่เกี่ยวข้อง / Customs License and Related Documents
              </h3>
              <CustomsLicensePreview data={customsLicenseData} />
            </div>
          )}

          {/* Terms and Conditions */}
          {termsAndConditions && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b border-gray-300">
                Terms and Conditions / ข้อตกลงและเงื่อนไข
              </h3>
              <div className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed">
                {termsAndConditions}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t-2 border-gray-300 pt-4 mt-8">
            <div className="text-center text-xs text-gray-500">
              <p className="font-medium">เอกสารนี้สร้างโดย mini CRM</p>
              <p className="mt-0.5">Powered by Logistics Solutions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}