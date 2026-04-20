import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, FileText, Handshake, Briefcase, FolderKanban, Check, X, ArrowRight, Plus, Trash2, Eye, Edit } from "lucide-react";
import { ProposalData, ProposalTemplateType, LanguageType, CustomerInfo, CustomsLicenseProposalData } from "./proposal-types";
import { PROPOSAL_TEMPLATES } from "./proposal-constants";
import { ProposalPreview } from "./proposal-preview";
import { CustomsLicenseForm } from "./customs-license-form";

interface ProposalCreatorScreenProps {
  templateType: ProposalTemplateType | null;
  onBack: () => void;
  onSave?: (data: ProposalData) => void;
  onTemplateChange?: (templateType: ProposalTemplateType) => void;
  initialCustomerData?: Partial<CustomerInfo>;
}

const iconMap = {
  briefcase: Briefcase,
  handshake: Handshake,
  service: FileText,
  project: FolderKanban,
};

export function ProposalCreatorScreen({ 
  templateType, 
  onBack, 
  onSave, 
  onTemplateChange, 
  initialCustomerData 
}: ProposalCreatorScreenProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [language, setLanguage] = useState<LanguageType>("th");
  const [selectedTemplate, setSelectedTemplate] = useState<ProposalTemplateType | null>(templateType);

  // Form data states
  const [proposalName, setProposalName] = useState("");
  const [proposalNumber, setProposalNumber] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");

  // Services and Sales Channel (NEW)
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [supplyChain, setSupplyChain] = useState<string[]>([]);
  const [salesChannel, setSalesChannel] = useState("B2B");

  // Description fields (for business-proposal template)
  const [productType, setProductType] = useState("");
  const [packagingType, setPackagingType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [materialHandlingEquipment, setMaterialHandlingEquipment] = useState("");
  const [storageSpecification, setStorageSpecification] = useState("");
  const [typesOfReports, setTypesOfReports] = useState("");
  const [communicationMeans, setCommunicationMeans] = useState("");
  const [distributionService, setDistributionService] = useState("");
  const [otherServices, setOtherServices] = useState("");

  // Scope of Work fields (for business-proposal template)
  const [objectiveEnglish, setObjectiveEnglish] = useState("It is Service Provider's objective to enter into a long-term strategic partnership with Customer, initially through the supply of a high-quality warehousing, delivery service and value added services that will provide Customer, with an ongoing competitive advantage in their markets.");
  const [objectiveThai, setObjectiveThai] = useState("เป็นวัตถุประสงค์ของ ผู้ให้บริการ จะเข้าสู่การเป็นหุ้นส่วนทางยุทธศาสตร์ระยะยาวกับ ลูกค้า ผ่านการให้บริการคลังสินค้าที่มีคุณภาพสูง, บริการจัดส่งและค่าบริการเริมที่จะช่วย ลูกค้า ได้เปรียบในการแข่งขันอย่างต่อเนื่องในตลาด");
  const [scopeHeaderEnglish, setScopeHeaderEnglish] = useState("Service Provider proposes to take full responsibility for the provision of the following activities and services to: Customer,");
  const [scopeHeaderThai, setScopeHeaderThai] = useState("ผู้ให้บริการ เสนอที่จะรับผิดชอบอย่างเต็มที่สำหรับการจัดหากิจกรรมต่อไปและการบริการเพื่อลูกค้า");
  const [scopeActivities, setScopeActivities] = useState("");
  const [transportRemarks, setTransportRemarks] = useState("");

  // Generic proposal fields (for other templates)
  const [executiveSummary, setExecutiveSummary] = useState("");
  const [objectivesAndGoals, setObjectivesAndGoals] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [projectValue, setProjectValue] = useState("");
  const [duration, setDuration] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [otherTerms, setOtherTerms] = useState("");

  // Customs & License specific data (for partnership-proposal)
  const [customsLicenseData, setCustomsLicenseData] = useState<CustomsLicenseProposalData>({
    scopeOfWorkServices: {
      warehouse: false,
      transport: false,
      freightAir: false,
      freightSea: false,
      crossBorder: false,
    },
    customFields: [],
  });

  // Warehousing Services table rows state
  type WarehousingRow = {
    id: string;
    no: string;
    service: string;
    price: string;
    unit: string;
    remarks: string;
  };
  
  const [warehousingRows, setWarehousingRows] = useState<WarehousingRow[]>([
    { id: '1', no: '1', service: '', price: '', unit: '', remarks: '' },
  ]);

  const addWarehousingRow = () => {
    const newRow: WarehousingRow = {
      id: Date.now().toString(),
      no: (warehousingRows.length + 1).toString(),
      service: '',
      price: '',
      unit: '',
      remarks: ''
    };
    setWarehousingRows([...warehousingRows, newRow]);
  };

  const removeWarehousingRow = (id: string) => {
    if (warehousingRows.length > 1) {
      setWarehousingRows(warehousingRows.filter(row => row.id !== id));
    }
  };

  // Transport Services table rows state
  type TransportRow = {
    id: string;
    no: string;
    serviceType: string;
    origin: string;
    destination: string;
    price: string;
    unit: string;
    remarks: string;
  };
  
  const [transportRows, setTransportRows] = useState<TransportRow[]>([
    { id: '1', no: '1', serviceType: '', origin: '', destination: '', price: '', unit: '', remarks: '' },
  ]);

  const addTransportRow = () => {
    const newRow: TransportRow = {
      id: Date.now().toString(),
      no: (transportRows.length + 1).toString(),
      serviceType: '',
      origin: '',
      destination: '',
      price: '',
      unit: '',
      remarks: ''
    };
    setTransportRows([...transportRows, newRow]);
  };

  const removeTransportRow = (id: string) => {
    if (transportRows.length > 1) {
      setTransportRows(transportRows.filter(row => row.id !== id));
    }
  };

  const template = templateType ? PROPOSAL_TEMPLATES.find((t) => t.id === templateType) : null;

  const handleTemplateSelect = (templateId: ProposalTemplateType) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate && onTemplateChange) {
      onTemplateChange(selectedTemplate);
    }
  };

  // Template selection screen
  if (!templateType) {
    return (
      <div className="flex flex-col bg-white max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7BC9A6] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">การสร้างข้อเสนอ</h2>
              <p className="text-sm text-gray-500">ขั้นที่ 1: เลือกเทมเพลต</p>
            </div>
          </div>
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-3xl mx-auto">
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">เลือกประเภทเทมเพลต</h3>
            <p className="text-sm text-gray-600 mb-6">
              เลือกเทมเพลตที่เหมาะสมกับประเภทบริการของคุณ ที่ตรงในการกรอกข้อมูลและปรับเปลี่ยนตาม template
            </p>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {PROPOSAL_TEMPLATES.map((tmpl) => {
                const IconComponent = iconMap[tmpl.icon as keyof typeof iconMap] || FileText;
                const isSelected = selectedTemplate === tmpl.id;
                
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => handleTemplateSelect(tmpl.id)}
                    className={`relative text-left p-5 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-[#7BC9A6] bg-[#7BC9A6]/5"
                        : "border-gray-200 hover:border-[#7BC9A6]/50 bg-white"
                    }`}
                  >
                    {/* Left Border Accent */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                      style={{ backgroundColor: tmpl.color }}
                    />

                    {/* Content */}
                    <div className="flex items-start gap-4 pl-3">
                      {/* Icon */}
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${tmpl.color}15` }}
                      >
                        <IconComponent 
                          className="w-6 h-6" 
                          style={{ color: tmpl.color }}
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 text-base">
                            {tmpl.name}
                          </h4>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-[#7BC9A6] flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {tmpl.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">คำแนะนำ</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    แต่ละเทมเพลตออกแบบมาเฉพาะสำหรับประเภทบริการที่แตกต่างกัน 
                    หรือจากการเลือกเทมเพลต ที่ตรงกับการกรอกข้อมูลและปรับเปลี่ยนให้เหมาะสมกับบริการนั้น
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex-shrink-0">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                <span className="text-xs">ℹ</span>
              </div>
              <span>เลือกเทมเพลตที่เหมาะสม</span>
            </div>
            <Button
              onClick={handleContinue}
              disabled={!selectedTemplate}
              className="bg-[#7BC9A6] hover:bg-[#6ab896] text-white px-6 h-10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ต่อไป
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Form screen (placeholder for now)
  return (
    <div className="flex flex-col bg-white max-h-[90vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#7BC9A6] flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">การสร้างข้อเสนอ</h2>
            <p className="text-sm text-gray-500">ขั้นที่ 2: กรอกข้อมูล</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {showPreview ? (
          <ProposalPreview
            proposalName={proposalName}
            proposalNumber={proposalNumber}
            startDate={startDate}
            expiryDate={expiryDate}
            companyName={companyName}
            contactPerson={contactPerson}
            email={email}
            phone={phone}
            address={address}
            templateType={templateType}
            templateName={template?.name}
            selectedServices={selectedServices}
            supplyChain={supplyChain}
            salesChannel={salesChannel}
            productType={productType}
            packagingType={packagingType}
            quantity={quantity}
            warehouseLocation={warehouseLocation}
            materialHandlingEquipment={materialHandlingEquipment}
            storageSpecification={storageSpecification}
            typesOfReports={typesOfReports}
            communicationMeans={communicationMeans}
            distributionService={distributionService}
            otherServices={otherServices}
            objectiveEnglish={objectiveEnglish}
            objectiveThai={objectiveThai}
            scopeHeaderEnglish={scopeHeaderEnglish}
            scopeHeaderThai={scopeHeaderThai}
            scopeActivities={scopeActivities}
            warehousingRows={warehousingRows}
            transportRows={transportRows}
            transportRemarks={transportRemarks}
            executiveSummary={executiveSummary}
            objectivesAndGoals={objectivesAndGoals}
            scopeOfWork={scopeOfWork}
            projectValue={projectValue}
            duration={duration}
            paymentTerms={paymentTerms}
            otherTerms={otherTerms}
            customsLicenseData={customsLicenseData}
            termsAndConditions={termsAndConditions}
          />
        ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Template Badge */}
          <div className="flex items-center gap-2">
            <div 
              className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2"
              style={{ 
                backgroundColor: `${template?.color}15`,
                color: template?.color
              }}
            >
              {(() => {
                const IconComponent = iconMap[template?.icon as keyof typeof iconMap] || FileText;
                return <IconComponent className="w-4 h-4" />;
              })()}
              {template?.name}
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#7BC9A6]" />
              ข้อมูลพื้นฐาน
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ชื่อข้อเสนอ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="เช่น ข้อเสนอบริการคลังสินค้า"
                  value={proposalName}
                  onChange={(e) => setProposalName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  หมายเลขข้อเสนอ
                </label>
                <input
                  type="text"
                  placeholder="เช่น PROP-2024-001"
                  value={proposalNumber}
                  onChange={(e) => setProposalNumber(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  วันที่สร้าง
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  วันที่หมดอายุ
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#7BC9A6]" />
              ข้อมูลลูกค้า
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ชื่อบริษัท/ลูกค้า <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ชื่อบริษัทลูกค้า"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ผู้ติดต่อ
                </label>
                <input
                  type="text"
                  placeholder="ชื่อผู้ติดต่อ"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  อีเมล
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  เบอร์โทร
                </label>
                <input
                  type="tel"
                  placeholder="0X-XXXX-XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ที่อยู่
                </label>
                <textarea
                  placeholder="ที่อยู่ลูกค้า"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Services & Sales Channel Section */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-[#7BC9A6]" />
              SUPPLY CHAIN & SALES CHANNEL
            </h3>

            {/* Supply Chain */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                SUPPLY CHAIN
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Exporter', 'Manufacturer', 'Retailer/Wholesaler', 'Other', 'Importer', 'Distributor', 'Logistics'].map((chain) => (
                  <button
                    key={chain}
                    onClick={() => {
                      if (supplyChain.includes(chain)) {
                        setSupplyChain(supplyChain.filter(c => c !== chain));
                      } else {
                        setSupplyChain([...supplyChain, chain]);
                      }
                    }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all border-2 ${
                      supplyChain.includes(chain)
                        ? 'bg-[#7BC9A6] border-[#7BC9A6] text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-[#7BC9A6]'
                    }`}
                  >
                    {chain}
                  </button>
                ))}
              </div>
            </div>

            {/* Sales Channel */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                SALES CHANNEL
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['B2B', 'B2C'].map((channel) => (
                  <button
                    key={channel}
                    onClick={() => setSalesChannel(channel)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all border-2 ${
                      salesChannel === channel
                        ? 'bg-[#7BC9A6] border-[#7BC9A6] text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-[#7BC9A6]'
                    }`}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>

            {/* บริการที่ใช้ / Services */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                บริการที่ใช้
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Freight', 'Warehouse', 'Cross Border', 'Customs', 'Transportation', 'Trading'].map((service) => (
                  <button
                    key={service}
                    onClick={() => {
                      if (selectedServices.includes(service)) {
                        setSelectedServices(selectedServices.filter(s => s !== service));
                      } else {
                        setSelectedServices([...selectedServices, service]);
                      }
                    }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all border-2 ${
                      selectedServices.includes(service)
                        ? 'bg-[#7BC9A6] border-[#7BC9A6] text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-[#7BC9A6]'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Template-specific content */}
          {templateType === "business-proposal" && (
            <>
              {/* DESCRIPTION Section - All in one box */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 bg-blue-50 border-b border-blue-100">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <FolderKanban className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">
                    DESCRIPTION / รายละเอียด
                  </h3>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* a) PRODUCTS */}
                  <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white">a</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        PRODUCTS / ผลิตภัณฑ์
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Product type */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Product type / ประเภทผลิตภัณฑ์
                        </label>
                        <input
                          type="text"
                          placeholder="Text, Commodity"
                          value={productType}
                          onChange={(e) => setProductType(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                        />
                      </div>

                      {/* Packaging type */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Packaging type / ประเภทบรรจุภัณฑ์
                        </label>
                        <input
                          type="text"
                          placeholder="ระบุประเภทบรรจุภัณฑ์"
                          value={packagingType}
                          onChange={(e) => setPackagingType(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                        />
                      </div>

                      {/* Quantity */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Quantity / ปริมาณผลิตภัณฑ์
                        </label>
                        <input
                          type="text"
                          placeholder="Expected Volume"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* b) PREFERRED WAREHOUSE LOCATION */}
                  <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white">b</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        PREFERRED WAREHOUSE LOCATION / สถานที่ที่ต้องการคลังสินค้า
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Site / สถานที่
                      </label>
                      <input
                        type="text"
                        placeholder="ระบุสถานที่คลังสินค้าที่ต้องการ"
                        value={warehouseLocation}
                        onChange={(e) => setWarehouseLocation(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* c) WAREHOUSING SERVICE */}
                  <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white">c</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        WAREHOUSING SERVICE / บริการคลังสินค้า
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Types of material handling equipment */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Types of material handling equipment / ประเภทของอุปกรณ์การจัดการวัสดุ
                        </label>
                        <input
                          type="text"
                          placeholder="Reach Truck, Forklift and Hand-pallet truck"
                          value={materialHandlingEquipment}
                          onChange={(e) => setMaterialHandlingEquipment(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                        />
                      </div>

                      {/* Storage specification */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Storage specification / สเปคการจัดเก็บ
                        </label>
                        <input
                          type="text"
                          placeholder="Ambient/Floor loading/Selective Racking"
                          value={storageSpecification}
                          onChange={(e) => setStorageSpecification(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                        />
                      </div>

                      {/* Types of reports */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Types of reports / ประเภทรายงาน
                        </label>
                        <textarea
                          placeholder="Reports on receiving/shipping/on-hand stock retrieved from Service Provider's documentation process that will comply with Customer or faxed/emailed as frequently as agreed"
                          rows={3}
                          value={typesOfReports}
                          onChange={(e) => setTypesOfReports(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                        />
                      </div>

                      {/* Communication means */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Communication means / วิธีการสื่อสาร
                        </label>
                        <input
                          type="text"
                          placeholder="Email, fax and telephone"
                          value={communicationMeans}
                          onChange={(e) => setCommunicationMeans(e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* d) DISTRIBUTION SERVICE */}
                  <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white">d</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        DISTRIBUTION SERVICE / บริการการจัดจำหน่าย
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        รายละเอียดบริการ
                      </label>
                      <textarea
                        placeholder="N/A หรือระบุบริการการจัดจำหน่าย"
                        rows={4}
                        value={distributionService}
                        onChange={(e) => setDistributionService(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* e) OTHER SERVICES */}
                  <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white">e</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        OTHER SERVICES / บริการอื่น ๆ
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        รายละเอียดบริการ
                      </label>
                      <textarea
                        placeholder="N/A หรือระบุบริการอื่น ๆ"
                        rows={4}
                        value={otherServices}
                        onChange={(e) => setOtherServices(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SCOPE OF WORK Section - for business-proposal template */}
          {templateType === "business-proposal" && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-4 bg-purple-50 border-b border-purple-100">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                  <FolderKanban className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  SCOPE OF WORK / ขอบเขตการทำงาน
                </h3>
              </div>
              
              <div className="p-6 space-y-6">
                {/* a) OBJECTIVE */}
                <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">a</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      OBJECTIVE / วัตถุประสงค์
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {/* English Text */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        English
                      </label>
                      <textarea
                        value={objectiveEnglish}
                        onChange={(e) => setObjectiveEnglish(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                      />
                    </div>

                    {/* Thai Text */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        ไทย
                      </label>
                      <textarea
                        value={objectiveThai}
                        onChange={(e) => setObjectiveThai(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* b) SCOPE OF WORK */}
                <div className="bg-gray-50 rounded-xl p-5 space-y-4 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">b</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      SCOPE OF WORK / ลักษณะงาน
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    {/* English Header */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        English Header
                      </label>
                      <textarea
                        value={scopeHeaderEnglish}
                        onChange={(e) => setScopeHeaderEnglish(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                      />
                    </div>

                    {/* Thai Header */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Thai Header / หัวข้อไทย
                      </label>
                      <textarea
                        value={scopeHeaderThai}
                        onChange={(e) => setScopeHeaderThai(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Activities and Services / กิจกรรมและบริการ
                      </label>
                      <textarea
                        placeholder="ระบุรายละเอียดกิจกรรมและบริการที่จะให้..."
                        rows={6}
                        value={scopeActivities}
                        onChange={(e) => setScopeActivities(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SERVICE CHARGES Section - for business-proposal template */}
          {templateType === "business-proposal" && (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 px-6 py-4 bg-green-50 border-b border-green-100">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <Handshake className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  3. Service Charges (Price Structure) / ค่าบริการ (โครงสร้างราคา)
                </h3>
              </div>
              
              <div className="p-6 space-y-8">
                {/* A. Warehousing Services */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">A</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      Warehousing Services / ค่าบริการคลังสินค้า
                    </p>
                  </div>

                  {/* Warehousing Services Table */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300">
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">NO.<br/>ลำดับบริการ</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">Service<br/>ชื่อบริการ</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">PRICE<br/>ราคา</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">UNIT<br/>หน่วย</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">REMARKS<br/>หมายเหตุ</th>
                            <th className="px-3 py-2 text-left font-bold bg-gray-50 w-20">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {warehousingRows.map((row, index) => (
                            <tr key={row.id} className="border-t border-gray-200">
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  value={index + 1} 
                                  readOnly
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="ชื่อบริการ" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="0.00" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="หน่วย" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="หมายเหตุ" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2">
                                <button
                                  onClick={() => removeWarehousingRow(row.id)}
                                  disabled={warehousingRows.length === 1}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                  title="ลบแถว"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Add Row Button */}
                  <div className="flex justify-start">
                    <Button
                      type="button"
                      onClick={addWarehousingRow}
                      variant="outline"
                      className="text-sm text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      เพิ่มแถว
                    </Button>
                  </div>
                </div>

                {/* B. Transport Services */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">B</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      Transport Services / ค่าบริการขนส่งสินค้า
                    </p>
                  </div>

                  {/* Transport Services Table */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-300">
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">NO.<br/>ลำดับ</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">Service Type<br/>ประเภทบริการ</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">Origin<br/>ต้นทาง</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">Destination<br/>ปลายทาง</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">Price<br/>ราคา</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">Unit<br/>หน่วย</th>
                            <th className="px-3 py-2 text-left border-r border-gray-300 font-bold bg-gray-50">Remarks<br/>หมายเหตุ</th>
                            <th className="px-3 py-2 text-left font-bold bg-gray-50 w-20">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transportRows.map((row, index) => (
                            <tr key={row.id} className="border-t border-gray-200">
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  value={index + 1} 
                                  readOnly
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="ประเภทรถ/บริการ" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="ต้นทาง" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="ปลายทาง" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="0.00" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="หน่วย" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2 border-r border-gray-300">
                                <input 
                                  type="text" 
                                  placeholder="หมายเหตุ" 
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                                />
                              </td>
                              <td className="px-3 py-2">
                                <button
                                  onClick={() => removeTransportRow(row.id)}
                                  disabled={transportRows.length === 1}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                  title="ลบแถว"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Add Row Button */}
                  <div className="flex justify-start">
                    <Button
                      type="button"
                      onClick={addTransportRow}
                      variant="outline"
                      className="text-sm text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      เพิ่มแถว
                    </Button>
                  </div>

                  {/* Transport Remarks */}
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-900">
                      Remarks / หมายเหตุ
                    </p>
                    <div className="pt-2">
                      <textarea
                        placeholder="กรอกหมายเหตุเพิ่มเติม..."
                        rows={3}
                        value={transportRemarks}
                        onChange={(e) => setTransportRemarks(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customs & License Form - for partnership-proposal template */}
          {templateType === "partnership-proposal" && (
            <div className="space-y-6">
              {/* Page Header for Customs & License */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  📋 Customs & License Proposal Form
                </h2>
                <p className="text-sm text-gray-600">
                  กรอกข้อมูลสำหรับเทมเพลตพิธีการศุลกากร + ใบอนุญาต / Fill in the details for Customs & License template
                </p>
              </div>

              {/* Customs & License Specific Form */}
              <CustomsLicenseForm
                data={customsLicenseData}
                onChange={setCustomsLicenseData}
                language={language}
              />
            </div>
          )}

          {/* Generic form for other templates */}
          {(templateType === "service-proposal" || templateType === "project-proposal") && (
            <>
              {/* Basic Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#7BC9A6]" />
                  ข้อมูลพื้นฐาน
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      บทสรุปผู้บริหาร (Executive Summary)
                    </label>
                    <textarea
                      placeholder="สรุปข้อเสนอโดยย่อ..."
                      rows={3}
                      value={executiveSummary}
                      onChange={(e) => setExecutiveSummary(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      วัตถุประสงค์และเป้าหมาย
                    </label>
                    <textarea
                      placeholder="ระบุวัตถุประสงค์และเป้าหมายของข้อเสนอ..."
                      rows={4}
                      value={objectivesAndGoals}
                      onChange={(e) => setObjectivesAndGoals(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      ขอบเขตงาน/บริการ
                    </label>
                    <textarea
                      placeholder="ระบุขอบเขตงานหรือบริการที่เสนอ..."
                      rows={5}
                      value={scopeOfWork}
                      onChange={(e) => setScopeOfWork(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Terms */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-[#7BC9A6]" />
                  ราคาและเงื่อนไข
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      มูลค่าโครงการ (บาท)
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={projectValue}
                      onChange={(e) => setProjectValue(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      ระยะเวลาดำเนินการ
                    </label>
                    <input
                      type="text"
                      placeholder="เช่น 6 เดือน"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      เงื่อนไขการชำระเงิน
                    </label>
                    <textarea
                      placeholder="ระบุเงื่อนไขการชำระเงิน..."
                      rows={3}
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      เงื่อนไขและข้อตกลงอื่นๆ
                    </label>
                    <textarea
                      placeholder="ระบุเงื่อนไขและข้อตกลงเพิ่มเติม..."
                      rows={4}
                      value={otherTerms}
                      onChange={(e) => setOtherTerms(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Additional Notes */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-gray-900">Terms and Conditions / ข้อตกลงและเงื่อนไข</h3>
            <textarea
              placeholder="ระบุข้อตกลงและเงื่อนไขของข้อเสนอ..."
              rows={3}
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7BC9A6] focus:border-transparent text-sm resize-none"
            />
          </div>
        </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex-shrink-0">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="px-6 h-10 rounded-lg border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับ
          </Button>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="px-6 h-10 rounded-lg border-gray-300 hover:bg-gray-50"
            >
              บันทึกแบบร่าง
            </Button>
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              className="px-6 h-10 rounded-lg border-[#7BC9A6] text-[#7BC9A6] hover:bg-[#7BC9A6]/5"
            >
              {showPreview ? (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  แก้ไข
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  ดูตัวอย่าง
                </>
              )}
            </Button>
            <Button
              onClick={() => {
                // TODO: Implement save logic
                alert("สร้างข้อเสนอสำเร็จ!");
                if (onSave) {
                  onSave({} as ProposalData);
                }
              }}
              className="bg-[#7BC9A6] hover:bg-[#6ab896] text-white px-6 h-10 rounded-lg"
            >
              <Check className="w-4 h-4 mr-2" />
              สร้างข้อเสนอ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}