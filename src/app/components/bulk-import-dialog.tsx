import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Upload, Download, CheckCircle2, AlertCircle, X } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

interface BulkImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImport?: (data: any[]) => void;
  mode: "customer" | "lead";
}

export function BulkImportDialog({
  open,
  onClose,
  onImport,
  mode,
}: BulkImportDialogProps) {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[] | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  const processFile = (file: File) => {
    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Validate and preview first 5 rows
        setPreview(jsonData.slice(0, 5));
        setIsProcessing(false);
      } catch (error) {
        toast.error(t("error_reading_file"));
        setIsProcessing(false);
        setFile(null);
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleImport = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        onImport?.(jsonData);
        toast.success(
          t("import_success", { count: jsonData.length })
        );
        handleClose();
      } catch (error) {
        toast.error(t("error_importing"));
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleDownloadTemplate = () => {
    let templateData: any[] = [];
    let filename = "";

    if (mode === "customer") {
      filename = "customer_import_template.xlsx";
      templateData = [
        {
          "ชื่อบริษัท": "บริษัท ตัวอย่าง จำกัด",
          "ผู้ติดต่อ": "คุณสมชาย ใจดี",
          "อีเมล": "somchai@example.com",
          "เบอร์โทร": "02-123-4567",
          "อุตสาหกรรม": "electronics",
          "กลุ่มธุรกิจ": "b2b2c",
          "ประเภทลูกค้า": "enterprise",
          "ช่องทางการขาย": "directSales",
          "ประเภทธุรกิจ": "manufacturer",
          "ที่อยู่": "123 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ 10110",
        },
      ];
    } else {
      filename = "lead_import_template.xlsx";
      templateData = [
        {
          "ชื่อบริษัท": "Digital Commerce Solutions",
          "ประเภทลีด": "coldCall",
          "อุตสาหกรรม": "electronics",
          "บทบาทห่วงโซ่อุปทาน": "distributor",
          "กลุ่มธุรกิจ": "b2b2c",
          "อีเมล": "contact@example.com",
          "เบอร์โทร": "+66 2 123 4567",
          "มูลค่าประเมิน": "850000",
          "ขั้นตอน": "contact",
          "ความสำคัญ": "High",
        },
      ];
    }

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    // Auto-size columns
    const maxWidth = templateData.reduce((w: any, r: any) => {
      return Object.keys(r).map((k, i) => {
        const cellLength = String(r[k]).length;
        return Math.max(w[i] || 10, cellLength);
      });
    }, []);

    worksheet["!cols"] = maxWidth.map((w: number) => ({ wch: w + 5 }));

    XLSX.writeFile(workbook, filename);
    toast.success(t("template_downloaded"));
  };

  const handleClose = () => {
    setFile(null);
    setPreview(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
            {t(
              mode === "customer"
                ? "import_customers"
                : "import_leads"
            )}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-3 sm:py-4">
          {/* Download Template Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                {t("step1_download_template")}
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                {t("template_description")}
              </p>
            </div>
            <Button
              onClick={handleDownloadTemplate}
              variant="outline"
              className="sm:ml-4 border-gray-300 text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              {t("download_template")}
            </Button>
          </div>

          {/* Upload File */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">
              {t("step2_upload_file")}
            </h3>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-sm text-gray-700 font-medium">
                {t("click_to_upload")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("supported_formats")}
              </p>
            </div>

            {file && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setPreview(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Preview */}
          {preview && preview.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">
                {t("preview")}
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {Object.keys(preview[0]).map((key) => (
                          <th
                            key={key}
                            className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {preview.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          {Object.values(row).map((value: any, i) => (
                            <td
                              key={i}
                              className="px-3 sm:px-4 py-2 sm:py-3 text-sm text-gray-900 whitespace-nowrap"
                            >
                              {String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {preview.length >= 5 && (
                  <div className="bg-gray-50 px-3 sm:px-4 py-2 text-xs text-gray-600 border-t border-gray-200">
                    {t("showing_preview")}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Validation Messages */}
          {preview && (
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">
                  {t("validation_notice")}
                </p>
                <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                  <li>{t("validation_1")}</li>
                  <li>{t("validation_2")}</li>
                  <li>{t("validation_3")}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 w-full sm:w-auto"
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleImport}
            disabled={!file || isProcessing}
            className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                {t("processing")}
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {t("import")}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}