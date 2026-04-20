import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Download,
  Plus,
  Trash2,
  Save,
  Info,
  Lock,
  Edit3,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Send,
  Printer,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { getMockProposalEditorData } from "../../utils/mock-proposals-data";

interface ProposalEditorScreenV2Props {
  proposalId?: string;
  onNavigate: (path: string, id?: string) => void;
}

export function ProposalEditorScreenV2({
  proposalId,
  onNavigate,
}: ProposalEditorScreenV2Props) {
  const { t } = useTranslation();
  
  // 🎯 Edit Mode Toggle
  const [isEditMode, setIsEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // 🔷 Get data from utility function
  const initialData = getMockProposalEditorData(proposalId);
  const [proposal, setProposal] = useState(initialData);

  const [focusedField, setFocusedField] = useState<string | null>(null);

  // 🎯 Update functions for all fields
  const updateField = (field: string, value: any) => {
    setProposal({
      ...proposal,
      [field]: value,
    });
    setHasUnsavedChanges(true);
  };

  const updateArrayItem = (arrayName: string, index: number, value: string) => {
    const newArray = [...(proposal as any)[arrayName]];
    newArray[index] = value;
    setProposal({
      ...proposal,
      [arrayName]: newArray,
    });
    setHasUnsavedChanges(true);
  };

  const addArrayItem = (arrayName: string) => {
    const newArray = [...(proposal as any)[arrayName], ""];
    setProposal({
      ...proposal,
      [arrayName]: newArray,
    });
    setHasUnsavedChanges(true);
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    const currentArray = (proposal as any)[arrayName];
    if (currentArray.length <= 1) {
      toast.error(t('messages.min_one_item'));
      return;
    }
    const newArray = currentArray.filter((_: any, i: number) => i !== index);
    setProposal({
      ...proposal,
      [arrayName]: newArray,
    });
    setHasUnsavedChanges(true);
  };

  const calculateLineTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
    if (!proposal.items || proposal.items.length === 0) return 0;
    return proposal.items.reduce(
      (sum, item) => sum + calculateLineTotal(item),
      0
    );
  };

  const calculateGlobalDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    if (proposal.globalDiscountType === "percent") {
      return subtotal * (proposal.globalDiscount / 100);
    }
    return proposal.globalDiscount;
  };

  const calculateNetTotal = () => {
    const subtotal = calculateSubtotal();
    const globalDiscountAmount = calculateGlobalDiscountAmount();
    return subtotal - globalDiscountAmount;
  };

  const calculateVat = () => {
    if (!proposal.includeVat) return 0;
    return calculateNetTotal() * 0.07;
  };

  const calculateGrandTotal = () => {
    return calculateNetTotal() + calculateVat();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBack = () => {
    onNavigate("/proposals-contracts");
  };

  const handleGenerateWord = () => {
    console.log("Generating Word document with data:", proposal);
    toast.success("กำลังสร้างเอกสาร Word...");
    
    setTimeout(() => {
      toast.success("สร้างเอกสารเรียบร้อย! กำลังดาวน์โหลด...");
    }, 2000);
  };

  const handleSave = () => {
    console.log("Saving proposal:", proposal);
    toast.success(t('messages.success_save'));
    setHasUnsavedChanges(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSend = () => {
    toast.success(t('messages.success_send'));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...proposal.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };
    setProposal({
      ...proposal,
      items: newItems,
    });
    setHasUnsavedChanges(true);
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      no: ((proposal.items?.length || 0) + 1).toString(),
      descriptionTH: "",
      descriptionEN: "",
      unit: t('common.unit'),
      quantity: 1,
      unitPrice: 0,
      discount: 0,
    };
    setProposal({
      ...proposal,
      items: [...(proposal.items || []), newItem],
    });
    setHasUnsavedChanges(true);
  };

  const removeItem = (index: number) => {
    if (!proposal.items || proposal.items.length === 1) {
      toast.error(t('messages.min_one_item'));
      return;
    }
    const newItems = proposal.items.filter((_, i) => i !== index);
    setProposal({
      ...proposal,
      items: newItems,
    });
    setHasUnsavedChanges(true);
  };

  // Add loading state check
  if (!proposal || !proposal.items || proposal.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">{t('common.loading')}</p>
          <p className="text-sm text-gray-500">Proposal ID: {proposalId || 'N/A'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Action Bar - Hidden on Print */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm print:hidden">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="h-9 w-9 p-0"
                disabled={isEditMode}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-sm font-semibold text-gray-900">
                  {isEditMode ? t('proposals.edit_proposal') : t('proposals.proposal_preview')}
                </h1>
                <p className="text-xs text-gray-500">
                  {proposal.proposalNumber}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isEditMode ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditMode(false)}
                    className="h-9 px-3 text-xs"
                  >
                    <Lock className="h-3.5 w-3.5 mr-1.5" />
                    {t('common.cancel')}
                  </Button>
                  {hasUnsavedChanges && (
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="h-9 px-3 text-xs bg-purple-600 hover:bg-purple-700"
                    >
                      <Save className="h-3.5 w-3.5 mr-1.5" />
                      {t('common.save')}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditMode(true)}
                    className="h-9 px-3 text-xs"
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1.5" />
                    {t('common.edit')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    className="h-9 px-3 text-xs"
                  >
                    <Printer className="h-3.5 w-3.5 mr-1.5" />
                    {t('common.print')}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleGenerateWord}
                    className="h-9 px-3 text-xs"
                  >
                    <Download className="h-3.5 w-3.5 mr-1.5" />
                    {t('proposals.download_word')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 print:p-0">
        
        {/* ============================================
            PAGE 1: COVER PAGE - No Border
            ============================================ */}
        <div className={`bg-white mb-8 print:mb-0 print:page-break-after-always ${isEditMode ? 'ring-2 ring-purple-600 rounded-lg print:ring-0' : ''}`}>
          <div className="p-8 sm:p-12 min-h-[297mm] flex flex-col">
            
            {/* Logo - Centered at Top */}
            <div className="flex justify-center mb-12 mt-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-5xl font-bold text-blue-600">mini CRM</span>
                </div>
                <p className="text-xs text-blue-600 tracking-wider">LOGISTICS</p>
              </div>
            </div>

            {/* Document Title - Centered */}
            <div className="text-center mb-8">
              {isEditMode ? (
                <>
                  <input
                    type="text"
                    value={proposal.documentTitleTH}
                    onChange={(e) => updateField("documentTitleTH", e.target.value)}
                    className="w-full mb-2 px-3 py-2 text-xl font-bold text-gray-900 text-center border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder={t('proposals.document_title_th')}
                  />
                  <input
                    type="text"
                    value={proposal.documentTitleEN}
                    onChange={(e) => updateField("documentTitleEN", e.target.value)}
                    className="w-full mb-1 px-3 py-2 text-base font-bold text-gray-900 text-center border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder={t('proposals.document_title_en')}
                  />
                  <input
                    type="text"
                    defaultValue="For Logistics Services"
                    className="w-full px-3 py-2 text-sm text-gray-900 text-center border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Subtitle (EN)"
                  />
                </>
              ) : (
                <>
                  <h1 className="text-xl font-bold text-gray-900 mb-2">
                    {proposal.documentTitleTH}
                  </h1>
                  <p className="text-base font-bold text-gray-900 mb-1">
                    {proposal.documentTitleEN}
                  </p>
                  <p className="text-sm text-gray-900">
                    For Logistics Services
                  </p>
                </>
              )}
            </div>

            {/* Site & Service - Simple Text */}
            <div className="text-center text-sm text-gray-900 mb-16">
              {isEditMode ? (
                <>
                  <div className="mb-2">
                    <span className="font-medium">สถานที่ตั้ง / Site : </span>
                    <input
                      type="text"
                      value={proposal.siteTH}
                      onChange={(e) => updateField("siteTH", e.target.value)}
                      className="px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="สถานที่"
                    />
                  </div>
                  <div>
                    <span className="font-medium">บริการ / Service : </span>
                    <input
                      type="text"
                      value={proposal.serviceTH}
                      onChange={(e) => updateField("serviceTH", e.target.value)}
                      className="px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="บริการ"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="mb-2">
                    <span className="font-medium">สถานที่ตั้ง / Site : </span>
                    {proposal.siteTH}
                  </p>
                  <p>
                    <span className="font-medium">บริการ / Service : </span>
                    {proposal.serviceTH}
                  </p>
                </>
              )}
            </div>

            {/* Customer Info Box - With Border */}
            <div className="max-w-2xl mx-auto w-full mb-16">
              <div className="border-4 border-gray-900 p-8 text-center min-h-[180px] flex flex-col justify-center">
                {isEditMode ? (
                  <>
                    <input
                      type="text"
                      value={proposal.customerCompanyTH}
                      onChange={(e) => updateField("customerCompanyTH", e.target.value)}
                      className="w-full mb-3 px-3 py-2 text-base font-bold text-red-600 text-center border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="{TH/EN : Customer Company Name}"
                    />
                    <input
                      type="text"
                      value={proposal.customerContactName}
                      onChange={(e) => updateField("customerContactName", e.target.value)}
                      className="w-full mb-3 px-3 py-2 text-base font-bold text-red-600 text-center border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="{TH/EN : Customer Name}"
                    />
                    <input
                      type="text"
                      value={proposal.customerPosition || ""}
                      onChange={(e) => updateField("customerPosition", e.target.value)}
                      className="w-full px-3 py-2 text-sm text-blue-600 text-center border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="{(Optional) TH/EN : Position}"
                    />
                  </>
                ) : (
                  <>
                    <p className="text-base font-bold text-red-600 mb-3">
                      {proposal.customerCompanyTH || "{TH/EN : Customer Company Name}"}
                    </p>
                    <p className="text-base font-bold text-red-600 mb-3">
                      {proposal.customerContactName || "{TH/EN : Customer Name}"}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Issued Information - Left Aligned */}
            <div className="text-xs text-gray-900 space-y-1.5 mb-8">
              <div className="flex items-start">
                <span className="font-medium min-w-[200px]">ออกโดย / ISSUED BY</span>
                <span className="mr-2">:</span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={proposal.issuedBy}
                    onChange={(e) => updateField("issuedBy", e.target.value)}
                    className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="ชื่อผู้ออกเอกสาร"
                  />
                ) : (
                  <span className="text-red-600">{proposal.issuedBy}</span>
                )}
              </div>
              <div className="flex items-start">
                <span className="font-medium min-w-[200px]">อีเมล / EMAIL</span>
                <span className="mr-2">:</span>
                {isEditMode ? (
                  <input
                    type="email"
                    value={proposal.issuedEmail}
                    onChange={(e) => updateField("issuedEmail", e.target.value)}
                    className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="อีเมล"
                  />
                ) : (
                  <span className="text-red-600">{proposal.issuedEmail}</span>
                )}
              </div>
              <div className="flex items-start">
                <span className="font-medium min-w-[200px]">หมายเลขข้อเสนอ / PROPOSAL NO.</span>
                <span className="mr-2">:</span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={proposal.proposalNumber}
                    onChange={(e) => updateField("proposalNumber", e.target.value)}
                    className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="เลขที่เอกสาร"
                  />
                ) : (
                  <span className="text-red-600">{proposal.proposalNumber}</span>
                )}
              </div>
              <div className="flex items-start">
                <span className="font-medium min-w-[200px]">วันที่ออกข้อเสนอ / ISSUE DATE</span>
                <span className="mr-2">:</span>
                {isEditMode ? (
                  <input
                    type="date"
                    value={proposal.issueDate}
                    onChange={(e) => updateField("issueDate", e.target.value)}
                    className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                ) : (
                  <span className="text-red-600">{formatDate(proposal.issueDate)}</span>
                )}
              </div>
              <div className="flex items-start">
                <span className="font-medium min-w-[200px]">สถานะของข้อเสนอ / ISSUE STATUS:</span>
                <span className="mr-2"></span>
                {isEditMode ? (
                  <input
                    type="text"
                    value={proposal.issueStatus}
                    onChange={(e) => updateField("issueStatus", e.target.value)}
                    className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="สถานะ"
                  />
                ) : (
                  <span className="text-red-600 font-bold">{proposal.issueStatus}</span>
                )}
              </div>
            </div>

            {/* Footer - Company Address */}
            <div className="mt-auto pt-8 border-t border-gray-300">
              <p className="text-[9px] text-gray-600 leading-relaxed text-center">
                {isEditMode ? (
                  <textarea
                    value={proposal.companyAddress}
                    onChange={(e) => updateField("companyAddress", e.target.value)}
                    rows={2}
                    className="w-full px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 text-center"
                    placeholder="ที่อยู่บริษัท"
                  />
                ) : (
                  proposal.companyAddress
                )}
              </p>
            </div>

          </div>
        </div>

        {/* ============================================
            PAGE 2: CONTENT PAGE
            ============================================ */}
        <div className={`bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none ${isEditMode ? 'ring-2 ring-purple-600' : ''}`}>
          <div className="p-8 sm:p-12">

            {/* Proposal Title */}
            <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300">
              {isEditMode ? (
                <>
                  <input
                    type="text"
                    value={proposal.documentTitleTH}
                    onChange={(e) => updateField("documentTitleTH", e.target.value)}
                    className="w-full mb-2 px-3 py-2 text-xl font-bold text-gray-900 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="ชื่อเอกสาร (TH)"
                  />
                  <input
                    type="text"
                    value={proposal.documentTitleEN}
                    onChange={(e) => updateField("documentTitleEN", e.target.value)}
                    className="w-full px-3 py-2 text-sm text-gray-600 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Document Title (EN)"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {proposal.documentTitleTH}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {proposal.documentTitleEN}
                  </p>
                </>
              )}
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                คำนำ / Introduction
              </h2>
              {isEditMode ? (
                <>
                  <textarea
                    value={proposal.introParagraphTH}
                    onChange={(e) => updateField("introParagraphTH", e.target.value)}
                    rows={3}
                    className="w-full mb-3 px-3 py-2 text-xs text-gray-700 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="คำนำ (TH)"
                  />
                  <textarea
                    value={proposal.introParagraphEN}
                    onChange={(e) => updateField("introParagraphEN", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-xs text-gray-700 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Introduction (EN)"
                  />
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-700 mb-3">
                    {proposal.introParagraphTH}
                  </p>
                  <p className="text-xs text-gray-700">
                    {proposal.introParagraphEN}
                  </p>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                รายละเอียด / Description
              </h2>
              {isEditMode ? (
                <>
                  <textarea
                    value={proposal.descriptionTH}
                    onChange={(e) => updateField("descriptionTH", e.target.value)}
                    rows={3}
                    className="w-full mb-3 px-3 py-2 text-xs text-gray-700 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="รายละเอียด (TH)"
                  />
                  <textarea
                    value={proposal.descriptionEN}
                    onChange={(e) => updateField("descriptionEN", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-xs text-gray-700 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Description (EN)"
                  />
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-700 mb-3">
                    {proposal.descriptionTH}
                  </p>
                  <p className="text-xs text-gray-700">
                    {proposal.descriptionEN}
                  </p>
                </>
              )}
            </div>

            {/* Scope of Works */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900">
                  ขอบเขตการดำเนินงาน / Scope of Works
                </h2>
                {isEditMode && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => addArrayItem("scopeOfWorksTH")}
                      variant="outline"
                      className="h-7 px-2 text-xs border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      เพิ่ม (TH)
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => addArrayItem("scopeOfWorksEN")}
                      variant="outline"
                      className="h-7 px-2 text-xs border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add (EN)
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                {proposal.scopeOfWorksTH.map((item, index) => (
                  <div key={index} className="text-xs text-gray-700 mb-1 flex items-start gap-2">
                    <span className="text-gray-500">{index + 1}.</span>
                    {isEditMode ? (
                      <>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateArrayItem("scopeOfWorksTH", index, e.target.value)}
                          className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder={`Scope ${index + 1} (TH)`}
                        />
                        {proposal.scopeOfWorksTH.length > 1 && (
                          <button
                            onClick={() => removeArrayItem("scopeOfWorksTH", index)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </>
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>
                ))}
              </div>

              <div>
                {proposal.scopeOfWorksEN.map((item, index) => (
                  <div key={index} className="text-xs text-gray-700 mb-1 flex items-start gap-2">
                    <span className="text-gray-500">{index + 1}.</span>
                    {isEditMode ? (
                      <>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateArrayItem("scopeOfWorksEN", index, e.target.value)}
                          className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder={`Scope ${index + 1} (EN)`}
                        />
                        {proposal.scopeOfWorksEN.length > 1 && (
                          <button
                            onClick={() => removeArrayItem("scopeOfWorksEN", index)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </>
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Line Items Table */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900">
                  รายการค่าบริการ / Service Charges
                </h2>
                {isEditMode && (
                  <Button
                    size="sm"
                    onClick={addItem}
                    variant="outline"
                    className="h-7 px-2 text-xs border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    เพิ่มรายการ
                  </Button>
                )}
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700 w-12">
                        ลำดับ
                      </th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700">
                        รายการ / Description
                      </th>
                      <th className="text-center px-3 py-2.5 font-semibold text-gray-700 w-16">
                        หน่วย
                      </th>
                      <th className="text-center px-3 py-2.5 font-semibold text-gray-700 w-20">
                        จำนวน
                      </th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700 w-28">
                        ราคา/หน่วย
                      </th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700 w-20">
                        ส่วนลด
                      </th>
                      <th className="text-right px-3 py-2.5 font-semibold text-gray-700 w-32">
                        จำนวนเงิน
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {proposal.items.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-3 py-3 text-gray-600">
                          {index + 1}
                        </td>
                        <td className="px-3 py-3">
                          {isEditMode ? (
                            <div className="space-y-1">
                              <input
                                type="text"
                                value={item.descriptionTH}
                                onChange={(e) => updateItem(index, "descriptionTH", e.target.value)}
                                className="w-full px-2 py-1 text-xs font-medium border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                                placeholder="รายการ (TH)"
                              />
                              <input
                                type="text"
                                value={item.descriptionEN}
                                onChange={(e) => updateItem(index, "descriptionEN", e.target.value)}
                                className="w-full px-2 py-1 text-[10px] border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                                placeholder="Description (EN)"
                              />
                            </div>
                          ) : (
                            <>
                              <p className="font-medium text-gray-900">
                                {item.descriptionTH}
                              </p>
                              {item.descriptionEN && (
                                <p className="text-[10px] text-gray-500 mt-0.5">
                                  {item.descriptionEN}
                                </p>
                              )}
                            </>
                          )}
                        </td>
                        <td className="px-3 py-3 text-center text-gray-600">
                          {isEditMode ? (
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) => updateItem(index, "unit", e.target.value)}
                              className="w-full px-2 py-1 text-xs text-center border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                          ) : (
                            item.unit
                          )}
                        </td>
                        <td className="px-3 py-3 text-center text-gray-900">
                          {isEditMode ? (
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value))}
                              className="w-full px-2 py-1 text-xs text-center border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                          ) : (
                            formatCurrency(item.quantity)
                          )}
                        </td>
                        <td className="px-3 py-3 text-right text-gray-900">
                          {isEditMode ? (
                            <input
                              type="number"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(index, "unitPrice", parseFloat(e.target.value))}
                              className="w-full px-2 py-1 text-xs text-right border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                          ) : (
                            formatCurrency(item.unitPrice)
                          )}
                        </td>
                        <td className="px-3 py-3 text-right text-gray-600">
                          {isEditMode ? (
                            <input
                              type="number"
                              value={item.discount}
                              onChange={(e) => updateItem(index, "discount", parseFloat(e.target.value))}
                              className="w-full px-2 py-1 text-xs text-right border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                          ) : (
                            `${item.discount}%`
                          )}
                        </td>
                        <td className="px-3 py-3 text-right font-medium text-gray-900">
                          <div className="flex items-center justify-between">
                            <span>{formatCurrency(calculateLineTotal(item))}</span>
                            {isEditMode && proposal.items.length > 1 && (
                              <button
                                onClick={() => removeItem(index)}
                                className="text-red-600 hover:bg-red-50 p-1 rounded ml-2"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-full sm:w-96">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">ยอดรวมก่อนหักส่วนลด:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(calculateSubtotal())} บาท
                    </span>
                  </div>
                  {proposal.globalDiscount > 0 && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">
                        ส่วนลดรวม ({proposal.globalDiscount}
                        {proposal.globalDiscountType === "percent" ? "%" : " บาท"}):
                      </span>
                      <span className="font-medium text-red-600">
                        -{formatCurrency(calculateGlobalDiscountAmount())} บาท
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">ยอดรวมหลังหักส่วนลด:</span>
                    <span className="font-medium text-gray-900">
                      {formatCurrency(calculateNetTotal())} บาท
                    </span>
                  </div>
                  {proposal.includeVat && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">ภาษีมูลค่าเพิ่ม 7%:</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateVat())} บาท
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 bg-gray-50 px-3 rounded-lg">
                    <span className="font-semibold text-gray-900">
                      ยอดรวมทั้งสิ้น / Grand Total:
                    </span>
                    <span className="font-bold text-gray-900 text-base">
                      {formatCurrency(calculateGrandTotal())} บาท
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900">
                  หมายเหตุ / Remarks
                </h2>
                {isEditMode && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => addArrayItem("remarksTH")}
                      variant="outline"
                      className="h-7 px-2 text-xs border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      เพิ่ม (TH)
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => addArrayItem("remarksEN")}
                      variant="outline"
                      className="h-7 px-2 text-xs border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add (EN)
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                {proposal.remarksTH.map((item, index) => (
                  <div key={index} className="text-xs text-gray-700 mb-1 flex items-start gap-2">
                    <span className="text-gray-500">{index + 1}.</span>
                    {isEditMode ? (
                      <>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateArrayItem("remarksTH", index, e.target.value)}
                          className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder={`หมายเหตุ ${index + 1} (TH)`}
                        />
                        {proposal.remarksTH.length > 1 && (
                          <button
                            onClick={() => removeArrayItem("remarksTH", index)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </>
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>
                ))}
              </div>

              <div>
                {proposal.remarksEN.map((item, index) => (
                  <div key={index} className="text-xs text-gray-700 mb-1 flex items-start gap-2">
                    <span className="text-gray-500">{index + 1}.</span>
                    {isEditMode ? (
                      <>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateArrayItem("remarksEN", index, e.target.value)}
                          className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder={`Remark ${index + 1} (EN)`}
                        />
                        {proposal.remarksEN.length > 1 && (
                          <button
                            onClick={() => removeArrayItem("remarksEN", index)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </>
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-900">
                  ข้อกำหนดและเงื่อนไข / Terms and Conditions
                </h2>
                {isEditMode && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => addArrayItem("termsAndConditionsTH")}
                      variant="outline"
                      className="h-7 px-2 text-xs border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      เพิ่ม (TH)
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => addArrayItem("termsAndConditionsEN")}
                      variant="outline"
                      className="h-7 px-2 text-xs border-purple-600 text-purple-600 hover:bg-purple-50"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add (EN)
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="mb-3">
                {proposal.termsAndConditionsTH.map((item, index) => (
                  <div key={index} className="text-xs text-gray-700 mb-2 flex items-start gap-2">
                    {isEditMode ? (
                      <>
                        <textarea
                          value={item}
                          onChange={(e) => updateArrayItem("termsAndConditionsTH", index, e.target.value)}
                          rows={2}
                          className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder={`ข้อกำหนด ${index + 1} (TH)`}
                        />
                        {proposal.termsAndConditionsTH.length > 1 && (
                          <button
                            onClick={() => removeArrayItem("termsAndConditionsTH", index)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </>
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>
                ))}
              </div>

              <div>
                {proposal.termsAndConditionsEN.map((item, index) => (
                  <div key={index} className="text-xs text-gray-700 mb-2 flex items-start gap-2">
                    {isEditMode ? (
                      <>
                        <textarea
                          value={item}
                          onChange={(e) => updateArrayItem("termsAndConditionsEN", index, e.target.value)}
                          rows={2}
                          className="flex-1 px-2 py-1 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                          placeholder={`Term ${index + 1} (EN)`}
                        />
                        {proposal.termsAndConditionsEN.length > 1 && (
                          <button
                            onClick={() => removeArrayItem("termsAndConditionsEN", index)}
                            className="text-red-600 hover:bg-red-50 p-1 rounded"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </>
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Signature Block */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-16">
                <div className="text-center">
                  <div className="border-b-2 border-gray-400 mb-3 pb-16"></div>
                  <p className="text-xs font-semibold text-gray-900">
                    ผู้เสนอ / Proposed by
                  </p>
                  <p className="text-[10px] text-gray-600 mt-2">
                    วันที่ / Date: ........................
                  </p>
                </div>
                <div className="text-center">
                  <div className="border-b-2 border-gray-400 mb-3 pb-16"></div>
                  <p className="text-xs font-semibold text-gray-900">
                    ผู้รับข้อเสนอ / Accepted by
                  </p>
                  <p className="text-[10px] text-gray-600 mt-2">
                    วันที่ / Date: ........................
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}