import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Edit,
  Download,
  Send,
  Printer,
  CheckCircle2,
  Clock,
  FileText,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner";
import { getMockProposalData } from "../../utils/mock-proposals-data";

interface ProposalScreenProps {
  proposalId?: string;
  onNavigate: (path: string, id?: string) => void;
}

export function ProposalScreen({ proposalId, onNavigate }: ProposalScreenProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data based on proposalId - ในระบบจริงจะดึงจาก API
  const [proposal, setProposal] = useState(getMockProposalData(proposalId));
  
  // Debug: log proposalId
  console.log("ProposalScreen - proposalId:", proposalId);
  console.log("ProposalScreen - proposal data:", proposal);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "Draft":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="h-4 w-4" />;
      case "Pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatCurrency = (amount: number) => {
    if (proposal.currency === "THB") {
      return `฿${amount.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const calculateLineTotal = (item: any) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
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

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      toast.success("บันทึกการแก้ไขเรียบร้อย");
    }
  };

  const handleBack = () => {
    onNavigate("/proposals-contracts");
  };

  const handleGenerateWord = () => {
    onNavigate("/proposal-editor-v2", proposal.id);
  };
  
  const handleShowPreview = () => {
    onNavigate("/proposal-editor-v2", proposal.id);
  };

  const updateCustomer = (field: string, value: string) => {
    setProposal({
      ...proposal,
      customer: {
        ...proposal.customer,
        [field]: value,
      },
    });
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
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      itemName: "",
      description: "",
      quantity: 1,
      unit: "ชุด",
      unitPrice: 0,
      discount: 0,
    };
    setProposal({
      ...proposal,
      items: [...proposal.items, newItem],
    });
    toast.success("เพิ่มรายการเรียบร้อย");
  };

  const removeItem = (index: number) => {
    const newItems = proposal.items.filter((_, i) => i !== index);
    setProposal({
      ...proposal,
      items: newItems,
    });
    toast.success("ลบรายการเรียบร้อย");
  };

  const updateScopeOfWork = (index: number, field: "TH" | "EN", value: string) => {
    if (field === "TH") {
      const newScope = [...proposal.scopeOfWorksTH];
      newScope[index] = value;
      setProposal({ ...proposal, scopeOfWorksTH: newScope });
    } else {
      const newScope = [...proposal.scopeOfWorksEN];
      newScope[index] = value;
      setProposal({ ...proposal, scopeOfWorksEN: newScope });
    }
  };

  const addScopeOfWork = () => {
    setProposal({
      ...proposal,
      scopeOfWorksTH: [...proposal.scopeOfWorksTH, ""],
      scopeOfWorksEN: [...proposal.scopeOfWorksEN, ""],
    });
  };

  const removeScopeOfWork = (index: number) => {
    setProposal({
      ...proposal,
      scopeOfWorksTH: proposal.scopeOfWorksTH.filter((_, i) => i !== index),
      scopeOfWorksEN: proposal.scopeOfWorksEN.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="p-2 sm:p-3 lg:p-4 bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="h-9 w-9 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                {proposal.name}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {proposal.proposalNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`h-9 px-3 text-xs ${
                isEditing
                  ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                  : ""
              }`}
              onClick={handleEdit}
            >
              <Edit className="h-3.5 w-3.5 mr-1.5" />
              {isEditing ? "บันทึก" : "แก้ไข"}
            </Button>
            <Button
              size="sm"
              className="h-9 px-3 text-xs bg-purple-600 hover:bg-purple-700"
              onClick={handleShowPreview}
            >
              <Printer className="h-3.5 w-3.5 mr-1.5" />
              แสดงตัวอย่าง
            </Button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={`${getStatusColor(proposal.status)} text-xs px-3 py-1 font-medium border`}
          >
            <span className="flex items-center gap-1.5">
              {getStatusIcon(proposal.status)}
              {proposal.status}
            </span>
          </Badge>
          <span className="text-xs text-gray-500">
            สร้างโดย {proposal.createdBy.name} • {proposal.createdDate}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-3">
            {/* Proposal Info */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    ข้อมูลข้อเสนอ
                  </h2>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">เลขที่ข้อเสนอ</Label>
                      <Input
                        value={proposal.proposalNumber}
                        onChange={(e) =>
                          setProposal({
                            ...proposal,
                            proposalNumber: e.target.value,
                          })
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">วันที่ออกเอกสาร</Label>
                        <Input
                          type="date"
                          value={proposal.issueDate}
                          onChange={(e) =>
                            setProposal({
                              ...proposal,
                              issueDate: e.target.value,
                            })
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">ใช้ได้ถึงวันที่</Label>
                        <Input
                          type="date"
                          value={proposal.validUntil}
                          onChange={(e) =>
                            setProposal({
                              ...proposal,
                              validUntil: e.target.value,
                            })
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">เงื่อนไขชำระเงิน</Label>
                      <Select
                        value={proposal.paymentTerm}
                        onValueChange={(value) =>
                          setProposal({ ...proposal, paymentTerm: value })
                        }
                      >
                        <SelectTrigger className="mt-1 text-xs h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">เงินสด</SelectItem>
                          <SelectItem value="7">เครดิต 7 วัน</SelectItem>
                          <SelectItem value="15">เครดิต 15 วัน</SelectItem>
                          <SelectItem value="30">เครดิต 30 วัน</SelectItem>
                          <SelectItem value="45">เครดิต 45 วัน</SelectItem>
                          <SelectItem value="60">เครดิต 60 วัน</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        เลขที่ข้อเสนอ
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {proposal.proposalNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        วันที่ออกเอกสาร
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {new Date(proposal.issueDate).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        ใช้ได้ถึงวันที่
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {new Date(proposal.validUntil).toLocaleDateString(
                          "th-TH",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        ชำระเงิน
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {proposal.paymentTerm === "0"
                          ? "เงินสด"
                          : `เครดิต ${proposal.paymentTerm} วัน`}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    ข้อมูลลูกค้า
                  </h2>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">ชื่อบริษัท (EN)</Label>
                      <Input
                        value={proposal.customer.company}
                        onChange={(e) =>
                          updateCustomer("company", e.target.value)
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">ชื่อบริษัท (TH)</Label>
                      <Input
                        value={proposal.customer.companyTH}
                        onChange={(e) =>
                          updateCustomer("companyTH", e.target.value)
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">ผู้ติดต่อ</Label>
                        <Input
                          value={proposal.customer.contact}
                          onChange={(e) =>
                            updateCustomer("contact", e.target.value)
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">เบอร์โทร</Label>
                        <Input
                          value={proposal.customer.phone}
                          onChange={(e) =>
                            updateCustomer("phone", e.target.value)
                          }
                          className="mt-1 text-xs h-8"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">อีเมล</Label>
                      <Input
                        type="email"
                        value={proposal.customer.email}
                        onChange={(e) =>
                          updateCustomer("email", e.target.value)
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">ที่อยู่ (TH)</Label>
                      <Textarea
                        value={proposal.customer.addressTH}
                        onChange={(e) =>
                          updateCustomer("addressTH", e.target.value)
                        }
                        rows={2}
                        className="mt-1 text-xs"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">
                          {proposal.customer.company}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {proposal.customer.companyTH}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {proposal.customer.contact}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {proposal.customer.email}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {proposal.customer.phone}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <p className="text-xs text-gray-600">
                        {proposal.customer.addressTH}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <h2 className="text-sm font-semibold text-gray-900">
                    รายละเอียดข้อเสนอ
                  </h2>
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">สถานที่/โครงการ (TH)</Label>
                      <Input
                        value={proposal.siteTH}
                        onChange={(e) =>
                          setProposal({ ...proposal, siteTH: e.target.value })
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Site/Project (EN)</Label>
                      <Input
                        value={proposal.siteEN}
                        onChange={(e) =>
                          setProposal({ ...proposal, siteEN: e.target.value })
                        }
                        className="mt-1 text-xs h-8"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">รายละเอียด (TH)</Label>
                      <Textarea
                        value={proposal.descriptionTH}
                        onChange={(e) =>
                          setProposal({
                            ...proposal,
                            descriptionTH: e.target.value,
                          })
                        }
                        rows={3}
                        className="mt-1 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Description (EN)</Label>
                      <Textarea
                        value={proposal.descriptionEN}
                        onChange={(e) =>
                          setProposal({
                            ...proposal,
                            descriptionEN: e.target.value,
                          })
                        }
                        rows={3}
                        className="mt-1 text-xs"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        สถานที่/โครงการ
                      </p>
                      <p className="text-xs text-gray-900">
                        {proposal.siteTH} / {proposal.siteEN}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        รายละเอียด (TH)
                      </p>
                      <p className="text-xs text-gray-700">
                        {proposal.descriptionTH}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 mb-1">
                        Description (EN)
                      </p>
                      <p className="text-xs text-gray-700">
                        {proposal.descriptionEN}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Scope of Works */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      ขอบเขตการดำเนินงาน / Scope of Works
                    </h2>
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      onClick={addScopeOfWork}
                      variant="outline"
                      className="h-7 px-2 text-xs"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      เพิ่ม
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  {proposal.scopeOfWorksTH.map((item, index) => (
                    <div key={index}>
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0" />
                            <Input
                              value={item}
                              onChange={(e) =>
                                updateScopeOfWork(index, "TH", e.target.value)
                              }
                              placeholder="ภาษาไทย"
                              className="flex-1 text-xs h-8"
                            />
                            {proposal.scopeOfWorksTH.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeScopeOfWork(index)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <Input
                            value={proposal.scopeOfWorksEN[index]}
                            onChange={(e) =>
                              updateScopeOfWork(index, "EN", e.target.value)
                            }
                            placeholder="English"
                            className="ml-6 text-xs h-8"
                          />
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-900">{item}</p>
                            <p className="text-[10px] text-gray-500">
                              {proposal.scopeOfWorksEN[index]}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      ค่าบริการ / Service Charges
                    </h2>
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      onClick={addItem}
                      className="h-7 px-2 text-xs bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      เพิ่ม
                    </Button>
                  )}
                </div>

                <div className="space-y-3">
                  {proposal.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      {isEditing ? (
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 space-y-2">
                              <Input
                                placeholder="ชื่อบริการ"
                                value={item.itemName}
                                onChange={(e) =>
                                  updateItem(index, "itemName", e.target.value)
                                }
                                className="text-xs h-8"
                              />
                              <Input
                                placeholder="คำอธิบาย"
                                value={item.description}
                                onChange={(e) =>
                                  updateItem(
                                    index,
                                    "description",
                                    e.target.value
                                  )
                                }
                                className="text-xs h-8"
                              />
                            </div>
                            {proposal.items.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(index)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-5 gap-2">
                            <Input
                              type="number"
                              placeholder="จำนวน"
                              value={item.quantity}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "quantity",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="text-xs h-8"
                            />
                            <Input
                              placeholder="หน่วย"
                              value={item.unit}
                              onChange={(e) =>
                                updateItem(index, "unit", e.target.value)
                              }
                              className="text-xs h-8"
                            />
                            <Input
                              type="number"
                              placeholder="ราคา/หน่วย"
                              value={item.unitPrice}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "unitPrice",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="text-xs h-8"
                            />
                            <Input
                              type="number"
                              placeholder="ส่วนลด %"
                              value={item.discount}
                              onChange={(e) =>
                                updateItem(
                                  index,
                                  "discount",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="text-xs h-8"
                            />
                            <Input
                              value={formatCurrency(calculateLineTotal(item))}
                              disabled
                              className="text-xs h-8 bg-gray-50"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-xs font-medium text-gray-900">
                                {index + 1}. {item.itemName}
                              </p>
                              {item.description && (
                                <p className="text-[10px] text-gray-500 mt-0.5">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-2 text-[10px] text-gray-600 mt-2">
                            <div>
                              <span className="text-gray-500">จำนวน:</span>{" "}
                              <span className="font-medium text-gray-900">
                                {item.quantity} {item.unit}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">ราคา/หน่วย:</span>{" "}
                              <span className="font-medium text-gray-900">
                                {formatCurrency(item.unitPrice)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">ส่วนลด:</span>{" "}
                              <span className="font-medium text-gray-900">
                                {item.discount}%
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-gray-500">รวม:</span>{" "}
                              <span className="font-semibold text-gray-900">
                                {formatCurrency(calculateLineTotal(item))}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  หมายเหตุ / Remarks
                </h2>
                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">ภาษาไทย</p>
                    {proposal.remarksTH.map((remark, index) => (
                      <p key={index} className="text-xs text-gray-700 mb-1">
                        {index + 1}. {remark}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1 mt-3">
                      English
                    </p>
                    {proposal.remarksEN.map((remark, index) => (
                      <p key={index} className="text-xs text-gray-700 mb-1">
                        {index + 1}. {remark}
                      </p>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                <h2 className="text-sm font-semibold text-gray-900 mb-3">
                  ข้อกำหนดและเงื่อนไข / Terms and Conditions
                </h2>
                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">ภาษาไทย</p>
                    {proposal.termsAndConditionsTH.map((term, index) => (
                      <p key={index} className="text-xs text-gray-700 mb-1">
                        {term}
                      </p>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1 mt-3">
                      English
                    </p>
                    {proposal.termsAndConditionsEN.map((term, index) => (
                      <p key={index} className="text-xs text-gray-700 mb-1">
                        {term}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-3">
              {/* Summary Card */}
              <Card className="border-purple-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                    <h2 className="text-sm font-semibold text-gray-900">
                      สรุปยอด
                    </h2>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ยอดรวมก่อนหักส่วนลด
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateSubtotal())}
                      </span>
                    </div>

                    {proposal.globalDiscount > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>
                          ส่วนลดรวม (
                          {proposal.globalDiscountType === "percent"
                            ? `${proposal.globalDiscount}%`
                            : formatCurrency(proposal.globalDiscount)}
                          )
                        </span>
                        <span>
                          -{formatCurrency(calculateGlobalDiscountAmount())}
                        </span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ยอดรวมหลังหักส่วนลด
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculateNetTotal())}
                      </span>
                    </div>

                    {proposal.includeVat && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          ภาษีมูลค่าเพิ่ม 7%
                        </span>
                        <span className="font-medium text-gray-900">
                          {formatCurrency(calculateVat())}
                        </span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex justify-between text-base pt-2">
                      <span className="font-semibold text-gray-900">
                        ยอดรวมทั้งสิ้น
                      </span>
                      <span className="font-bold text-purple-600">
                        {formatCurrency(calculateGrandTotal())}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="text-xs font-semibold text-gray-900 mb-3">
                    ข้อมูลสำคัญ
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-[10px] text-gray-500">
                          วันที่ออกเอกสาร
                        </p>
                        <p className="text-gray-900">
                          {new Date(proposal.issueDate).toLocaleDateString(
                            "th-TH"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-[10px] text-gray-500">
                          ใช้ได้ถึงวันที่
                        </p>
                        <p className="text-gray-900">
                          {new Date(proposal.validUntil).toLocaleDateString(
                            "th-TH"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="text-[10px] text-gray-500">
                          เงื่อนไขชำระเงิน
                        </p>
                        <p className="text-gray-900">
                          {proposal.paymentTerm === "0"
                            ? "เงินสด"
                            : `เครดิต ${proposal.paymentTerm} วัน`}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}