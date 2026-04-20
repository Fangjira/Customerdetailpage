import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Service {
  id: string;
  name: string;
  value: string | null;
  type?: string | null;
}

interface EditServiceRevenueDialogProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  onSave: (services: Service[]) => void;
}

export function EditServiceRevenueDialog({
  isOpen,
  onClose,
  services,
  onSave,
}: EditServiceRevenueDialogProps) {
  const [editedServices, setEditedServices] = useState<Service[]>(services);

  const updateService = (id: string, value: string | null, type?: string | null) => {
    setEditedServices(
      editedServices.map((service) =>
        service.id === id ? { ...service, value, type } : service
      )
    );
  };

  const updateServiceType = (id: string, type: string | null) => {
    setEditedServices(
      editedServices.map((service) =>
        service.id === id ? { ...service, type } : service
      )
    );
  };

  const handleSave = () => {
    onSave(editedServices);
    onClose();
  };

  const handleCancel = () => {
    setEditedServices(services);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            แก้ไขยอดขายแต่ละ Service
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            ระบุยอดขายและประเภทของแต่ละบริการ
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {editedServices.map((service) => (
            <div
              key={service.id}
              className="grid grid-cols-12 gap-4 items-end p-4 bg-secondary/30 rounded-lg border border-border"
            >
              <div className="col-span-4">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  บริการ
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {service.id}
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    {service.name}
                  </p>
                </div>
              </div>

              <div className="col-span-3">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  ประเภท
                </Label>
                <Input
                  type="text"
                  value={service.type || ""}
                  onChange={(e) => updateServiceType(service.id, e.target.value)}
                  placeholder="เช่น Opportunity, ยอดขาย"
                  className="h-9"
                  list={`type-suggestions-${service.id}`}
                />
                <datalist id={`type-suggestions-${service.id}`}>
                  <option value="ยอดขาย" />
                  <option value="Opportunity" />
                  <option value="Pending" />
                  <option value="Proposal" />
                  <option value="Contract" />
                </datalist>
              </div>

              <div className="col-span-5">
                <Label className="text-xs text-muted-foreground mb-1.5 block">
                  ยอดขาย (บาท)
                </Label>
                <Input
                  type="text"
                  value={service.value || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.,]/g, "");
                    updateService(service.id, value);
                  }}
                  placeholder="0.00 หรือระบุข้อความ"
                  className="h-9"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-border mt-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="rounded-lg"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 rounded-lg"
          >
            บันทึก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}