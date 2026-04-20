import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { AlertTriangle, User, Package, Calendar, DollarSign, Eye } from "lucide-react";

interface DuplicateDeal {
  id: string;
  dealName: string;
  customerName: string;
  services: string[];
  dealValue: string;
  currency: string;
  createdBy: string;
  createdAt: string;
  status: string;
  matchPercentage: number;
}

interface DuplicateDealWarningDialogProps {
  open: boolean;
  duplicateDeals: DuplicateDeal[];
  newDealData: {
    customerName: string;
    services: string[];
  };
  onCancel: () => void;
  onContinue: () => void;
}

export function DuplicateDealWarningDialog({
  open,
  duplicateDeals,
  newDealData,
  onCancel,
  onContinue,
}: DuplicateDealWarningDialogProps) {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-100 text-red-700 border-red-300";
    if (percentage >= 60) return "bg-orange-100 text-orange-700 border-orange-300";
    return "bg-yellow-100 text-yellow-700 border-yellow-300";
  };

  const getMatchLabel = (percentage: number) => {
    if (percentage >= 80) return "ตรงกันมาก";
    if (percentage >= 60) return "ตรงกันปานกลาง";
    return "คล้ายกัน";
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                พบดีลที่คล้ายกันในระบบ
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                มีผู้ใช้งานคนอื่นได้สร้างดีลที่มีลูกค้าหรือบริการคล้ายกันแล้ว
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* New Deal Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">ดีลที่คุณกำลังจะสร้าง:</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-600 text-white border-0">
              {newDealData.customerName}
            </Badge>
            {newDealData.services.map((service, idx) => (
              <Badge key={idx} variant="outline" className="border-blue-300 text-blue-700">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* Duplicate Deals List */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            ดีลที่คล้ายกัน ({duplicateDeals.length} รายการ):
          </h3>
          
          {duplicateDeals.map((deal) => (
            <Card key={deal.id} className="border-2 border-orange-200 bg-orange-50/30">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{deal.dealName}</h4>
                      <Badge className={`${getMatchColor(deal.matchPercentage)} text-xs px-2 py-0.5`}>
                        {getMatchLabel(deal.matchPercentage)} {deal.matchPercentage}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">#{deal.id}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {deal.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">ลูกค้า:</span>
                    <span className="font-medium text-gray-900">{deal.customerName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">สร้างโดย:</span>
                    <span className="font-medium text-gray-900">{deal.createdBy}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">วันที่สร้าง:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(deal.createdAt).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Package className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-sm text-gray-600">บริการ: </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {deal.services.map((service, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className={`text-xs ${
                            newDealData.services.includes(service)
                              ? 'bg-orange-100 border-orange-400 text-orange-800'
                              : 'bg-gray-100 border-gray-300 text-gray-700'
                          }`}
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Warning Message */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <div className="flex gap-3">
            <Eye className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">⚠️ สิ่งที่ควรทราบ:</p>
              <ul className="list-disc list-inside space-y-1 text-yellow-700">
                <li>หากคุณสร้างดีลนี้ต่อ ผู้สร้างดีลข้างต้นจะได้รับการแจ้งเตือน</li>
                <li>อาจจำเป็นต้องประสานงานกับทีมเพื่อหลีกเลี่ยงการทำงานซ้ำซ้อน</li>
                <li>คุณสามารถตรวจสอบรายละเอียดดีลเหล่านี้ก่อนตัดสินใจสร้างดีลใหม่</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center w-full">
            <p className="text-xs text-gray-500">
              💡 แนะนำให้ตรวจสอบกับทีมก่อนสร้างดีลที่คล้ายกัน
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onCancel}
                className="border-gray-300 hover:bg-gray-100"
              >
                ยกเลิก
              </Button>
              <Button
                onClick={onContinue}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                สร้างดีลต่อไป
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}