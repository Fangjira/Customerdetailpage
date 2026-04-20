import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { 
  Pen, 
  Trash2, 
  CheckCircle2, 
  FileText, 
  Calendar, 
  Building2,
  User,
  AlertCircle,
  Download
} from "lucide-react";
import SignatureCanvas from "react-signature-canvas";
import { toast } from "sonner";

interface QuotationSignatureDialogProps {
  open: boolean;
  quotation: {
    id: string;
    name: string;
    customer: string;
    amount: string;
    validUntil: string;
  } | null;
  onClose: () => void;
  onSign: (signatureData: string) => void;
}

export function QuotationSignatureDialog({
  open,
  quotation,
  onClose,
  onSign,
}: QuotationSignatureDialogProps) {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
  };

  const handleSign = () => {
    if (sigCanvas.current?.isEmpty()) {
      toast.error("กรุณาลงนามก่อนบันทึก");
      return;
    }

    const signatureData = sigCanvas.current?.toDataURL();
    if (signatureData) {
      onSign(signatureData);
      toast.success("ลงนามเอกสารสำเร็จ");
      handleClear();
      onClose();
    }
  };

  const handleBegin = () => {
    setIsEmpty(false);
  };

  if (!quotation) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <Pen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                ลงนามเอกสารใบเสนอราคา
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                กรุณาลงนามในพื้นที่ด้านล่างเพื่อยืนยันการอนุมัติ
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Quotation Info */}
        <Card className="border-2 border-green-200 bg-green-50/30">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">{quotation.name}</h3>
              <Badge className="bg-green-600 text-white border-0 ml-auto">
                อนุมัติแล้ว
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">รหัส:</span>
                <span className="font-medium text-gray-900">{quotation.id}</span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">ลูกค้า:</span>
                <span className="font-medium text-gray-900 truncate">{quotation.customer}</span>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">มูลค่า:</span>
                <span className="font-medium text-gray-900">{quotation.amount}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">หมดอายุ:</span>
                <span className="font-medium text-gray-900">{quotation.validUntil}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Signature Area */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-900">
              ลายเซ็น <span className="text-red-500">*</span>
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              disabled={isEmpty}
              className="h-8 text-xs"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              ล้างลายเซ็น
            </Button>
          </div>

          <Card className="border-2 border-dashed border-gray-300 bg-white overflow-hidden">
            <div className="relative">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  className: "w-full h-64 cursor-crosshair",
                  style: { touchAction: "none" }
                }}
                onBegin={handleBegin}
              />
              {isEmpty && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <Pen className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">ลงนามที่นี่</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">📝 หมายเหตุ:</p>
                <ul className="list-disc list-inside space-y-0.5 text-blue-700">
                  <li>ลายเซ็นจะถูกบันทึกและแนบกับเอกสารใบเสนอราคา</li>
                  <li>การลงนามจะถือเป็นการยืนยันข้อมูลและเงื่อนไขทั้งหมด</li>
                  <li>สามารถดาวน์โหลดเอกสารที่ลงนามแล้วได้ทันที</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center w-full">
            <p className="text-xs text-gray-500">
              วันที่: {new Date().toLocaleDateString('th-TH', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-gray-300 hover:bg-gray-100"
              >
                ยกเลิก
              </Button>
              <Button
                onClick={handleSign}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                ยืนยันลงนาม
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}