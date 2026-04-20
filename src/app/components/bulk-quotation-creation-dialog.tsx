import { useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  Upload,
  Download,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
  X,
  FileText,
  Eye,
  Trash2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { useRoleTheme } from "../hooks/use-role-theme";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription } from "./ui/alert";

interface BulkQuotationRow {
  rowNumber: number;
  customerName: string;
  dealName: string;
  serviceType: string;
  amount: string;
  validityDays: string;
  businessUnit: string;
  notes?: string;
  errors: string[];
  warnings: string[];
}

interface BulkQuotationCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkQuotationCreationDialog({
  open,
  onOpenChange,
}: BulkQuotationCreationDialogProps) {
  const { t } = useTranslation();
  const roleTheme = useRoleTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"upload" | "template">("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<BulkQuotationRow[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Template columns definition
  const templateColumns = [
    { key: "customerName", label_en: "Customer Name", label_th: "ชื่อลูกค้า", required: true },
    { key: "dealName", label_en: "Deal Name", label_th: "ชื่อดีล", required: true },
    { key: "serviceType", label_en: "Service Type", label_th: "ประเภทบริการ", required: true },
    { key: "amount", label_en: "Amount (THB)", label_th: "จำนวนเงิน (บาท)", required: true },
    { key: "validityDays", label_en: "Validity (Days)", label_th: "ระยะเวลาที่ใช้ได้ (วัน)", required: true },
    { key: "businessUnit", label_en: "Business Unit", label_th: "หน่วยธุรกิจ", required: true },
    { key: "notes", label_en: "Notes", label_th: "หมายเหตุ", required: false },
  ];

  // Generate template Excel
  const downloadTemplate = useCallback(() => {
    const ws = XLSX.utils.aoa_to_sheet([
      // Headers (English + Thai)
      templateColumns.map((col) => `${col.label_en} / ${col.label_th}`),
      // Example row 1
      [
        "Acme Corporation",
        "Q1 2026 Import Deal",
        "Air Freight",
        "250000",
        "30",
        "International Logistics",
        "Urgent shipment required",
      ],
      // Example row 2
      [
        "Global Traders Ltd",
        "Container Shipment Q1",
        "Ocean Freight",
        "450000",
        "45",
        "Sea Logistics",
        "Standard terms apply",
      ],
      // Example row 3
      [
        "TechStart Co.",
        "Warehouse Storage Deal",
        "Warehousing",
        "180000",
        "60",
        "Warehouse Services",
        "",
      ],
    ]);

    // Set column widths
    ws["!cols"] = [
      { wch: 25 }, // Customer Name
      { wch: 25 }, // Deal Name
      { wch: 20 }, // Service Type
      { wch: 15 }, // Amount
      { wch: 15 }, // Validity Days
      { wch: 25 }, // Business Unit
      { wch: 30 }, // Notes
    ];

    // Style the header row
    const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + "1";
      if (!ws[address]) continue;
      ws[address].s = {
        fill: { fgColor: { rgb: roleTheme.color.replace("#", "") } },
        font: { bold: true, color: { rgb: "FFFFFF" } },
      };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Quotations Template");

    // Add instructions sheet
    const instructionsData = [
      ["Bulk Quotation Creation Template - Instructions"],
      [""],
      ["How to use this template:"],
      ["1. Fill in the quotation details starting from row 2"],
      ["2. Required fields are marked with * in the column name"],
      ["3. Save the file and upload it in the Bulk Creation dialog"],
      [""],
      ["Field Descriptions:"],
      ["Customer Name: Name of the customer (required)"],
      ["Deal Name: Name of the deal (required)"],
      ["Service Type: Type of service (required)"],
      ["  Examples: Air Freight, Ocean Freight, Warehousing, Custom Clearance"],
      ["Amount (THB): Total quotation amount in Thai Baht (required, numbers only)"],
      ["Validity (Days): Number of days the quotation is valid (required, numbers only)"],
      ["Business Unit: Business unit handling this quotation (required)"],
      ["  Examples: International Logistics, Sea Logistics, Warehouse Services"],
      ["Notes: Additional notes or remarks (optional)"],
      [""],
      ["Tips:"],
      ["- Do not modify the header row"],
      ["- Ensure all required fields are filled"],
      ["- Use numbers only for Amount and Validity Days"],
      ["- You can add multiple rows for bulk creation"],
      [""],
      ["Support: For questions, contact your system administrator"],
    ];

    const wsInstructions = XLSX.utils.aoa_to_sheet(instructionsData);
    wsInstructions["!cols"] = [{ wch: 80 }];
    XLSX.utils.book_append_sheet(wb, wsInstructions, "Instructions");

    XLSX.writeFile(wb, `Bulk_Quotation_Template_${new Date().toISOString().split("T")[0]}.xlsx`);
    toast.success(t("bulk_quotation.template_downloaded", "Template downloaded successfully"));
  }, [roleTheme.color, t]);

  // Generate CSV template
  const downloadCSVTemplate = useCallback(() => {
    const headers = templateColumns.map((col) => `${col.label_en} / ${col.label_th}`).join(",");
    const exampleRows = [
      "Acme Corporation,Q1 2026 Import Deal,Air Freight,250000,30,International Logistics,Urgent shipment required",
      "Global Traders Ltd,Container Shipment Q1,Ocean Freight,450000,45,Sea Logistics,Standard terms apply",
      "TechStart Co.,Warehouse Storage Deal,Warehousing,180000,60,Warehouse Services,",
    ];

    const csvContent = [headers, ...exampleRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `Bulk_Quotation_Template_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(t("bulk_quotation.template_downloaded", "CSV Template downloaded successfully"));
  }, [t]);

  // Validate row data
  const validateRow = (row: any, rowNumber: number): { errors: string[]; warnings: string[] } => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Required field validation
    if (!row.customerName || row.customerName.trim() === "") {
      errors.push(t("bulk_quotation.error_customer_required", "Customer name is required"));
    }
    if (!row.dealName || row.dealName.trim() === "") {
      errors.push(t("bulk_quotation.error_deal_required", "Deal name is required"));
    }
    if (!row.serviceType || row.serviceType.trim() === "") {
      errors.push(t("bulk_quotation.error_service_required", "Service type is required"));
    }
    if (!row.businessUnit || row.businessUnit.trim() === "") {
      errors.push(t("bulk_quotation.error_bu_required", "Business unit is required"));
    }

    // Amount validation
    if (!row.amount || row.amount.toString().trim() === "") {
      errors.push(t("bulk_quotation.error_amount_required", "Amount is required"));
    } else {
      const amount = parseFloat(row.amount.toString().replace(/,/g, ""));
      if (isNaN(amount) || amount <= 0) {
        errors.push(t("bulk_quotation.error_amount_invalid", "Amount must be a positive number"));
      }
      if (amount < 10000) {
        warnings.push(t("bulk_quotation.warning_amount_low", "Amount is unusually low (< 10,000 THB)"));
      }
      if (amount > 10000000) {
        warnings.push(t("bulk_quotation.warning_amount_high", "Amount is unusually high (> 10M THB)"));
      }
    }

    // Validity days validation
    if (!row.validityDays || row.validityDays.toString().trim() === "") {
      errors.push(t("bulk_quotation.error_validity_required", "Validity days is required"));
    } else {
      const validity = parseInt(row.validityDays.toString());
      if (isNaN(validity) || validity <= 0) {
        errors.push(t("bulk_quotation.error_validity_invalid", "Validity must be a positive number"));
      }
      if (validity < 7) {
        warnings.push(t("bulk_quotation.warning_validity_short", "Validity period is very short (< 7 days)"));
      }
      if (validity > 365) {
        warnings.push(t("bulk_quotation.warning_validity_long", "Validity period is very long (> 365 days)"));
      }
    }

    return { errors, warnings };
  };

  // Parse uploaded file
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setUploadedFile(file);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      if (jsonData.length < 2) {
        toast.error(t("bulk_quotation.error_empty_file", "File is empty or has no data rows"));
        setIsProcessing(false);
        return;
      }

      // Parse data rows (skip header)
      const parsedRows: BulkQuotationRow[] = [];
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        if (!row || row.length === 0 || row.every((cell) => !cell)) continue; // Skip empty rows

        const rowData = {
          rowNumber: i + 1,
          customerName: row[0]?.toString() || "",
          dealName: row[1]?.toString() || "",
          serviceType: row[2]?.toString() || "",
          amount: row[3]?.toString() || "",
          validityDays: row[4]?.toString() || "",
          businessUnit: row[5]?.toString() || "",
          notes: row[6]?.toString() || "",
          errors: [] as string[],
          warnings: [] as string[],
        };

        const validation = validateRow(rowData, rowData.rowNumber);
        rowData.errors = validation.errors;
        rowData.warnings = validation.warnings;

        parsedRows.push(rowData);
      }

      setParsedData(parsedRows);
      setShowPreview(true);
      setSelectedRows(
        parsedRows.filter((r) => r.errors.length === 0).map((_, idx) => idx)
      );

      const errorCount = parsedRows.filter((r) => r.errors.length > 0).length;
      const warningCount = parsedRows.filter((r) => r.warnings.length > 0).length;

      if (errorCount === 0) {
        toast.success(
          t(
            "bulk_quotation.parse_success",
            `Successfully parsed ${parsedRows.length} quotations`
          )
        );
      } else {
        toast.warning(
          t(
            "bulk_quotation.parse_with_errors",
            `Parsed ${parsedRows.length} rows with ${errorCount} errors and ${warningCount} warnings`
          )
        );
      }
    } catch (error) {
      console.error("Error parsing file:", error);
      toast.error(t("bulk_quotation.error_parse", "Error parsing file. Please check the format."));
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];
      if (!validTypes.includes(file.type) && !file.name.endsWith(".csv")) {
        toast.error(t("bulk_quotation.error_file_type", "Please upload an Excel or CSV file"));
        return;
      }
      handleFileUpload(file);
    }
  };

  // Toggle row selection
  const toggleRowSelection = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Select all valid rows
  const selectAllValid = () => {
    const validIndices = parsedData
      .map((row, idx) => (row.errors.length === 0 ? idx : -1))
      .filter((idx) => idx !== -1);
    setSelectedRows(validIndices);
  };

  // Deselect all
  const deselectAll = () => {
    setSelectedRows([]);
  };

  // Handle bulk creation
  const handleBulkCreate = async () => {
    const selectedQuotations = selectedRows.map((idx) => parsedData[idx]);

    if (selectedQuotations.length === 0) {
      toast.error(t("bulk_quotation.error_no_selection", "Please select at least one quotation to create"));
      return;
    }

    const hasErrors = selectedQuotations.some((q) => q.errors.length > 0);
    if (hasErrors) {
      toast.error(t("bulk_quotation.error_has_errors", "Cannot create quotations with errors"));
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        t(
          "bulk_quotation.success",
          `Successfully created ${selectedQuotations.length} quotations`
        )
      );

      // Reset and close
      handleClose();
    } catch (error) {
      console.error("Error creating quotations:", error);
      toast.error(t("bulk_quotation.error_create", "Error creating quotations"));
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle close
  const handleClose = () => {
    setUploadedFile(null);
    setParsedData([]);
    setShowPreview(false);
    setSelectedRows([]);
    setActiveTab("upload");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onOpenChange(false);
  };

  // Remove uploaded file
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setParsedData([]);
    setShowPreview(false);
    setSelectedRows([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validCount = parsedData.filter((r) => r.errors.length === 0).length;
  const errorCount = parsedData.filter((r) => r.errors.length > 0).length;
  const warningCount = parsedData.filter((r) => r.warnings.length > 0).length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" style={{ color: roleTheme.color }} />
            {t("bulk_quotation.title", "Bulk Quotation Creation")}
          </DialogTitle>
          <DialogDescription>
            {t(
              "bulk_quotation.description",
              "Create multiple quotations at once by uploading a CSV or Excel file"
            )}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">
              <Upload className="h-4 w-4 mr-2" />
              {t("bulk_quotation.tab_upload", "Upload File")}
            </TabsTrigger>
            <TabsTrigger value="template">
              <Download className="h-4 w-4 mr-2" />
              {t("bulk_quotation.tab_template", "Download Template")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            {!showPreview ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    {t("bulk_quotation.upload_title", "Upload Your File")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(
                      "bulk_quotation.upload_description",
                      "Drag and drop or click to select an Excel (.xlsx, .xls) or CSV file"
                    )}
                  </p>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    disabled={isProcessing}
                    className="max-w-xs mx-auto"
                  />
                  {uploadedFile && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{uploadedFile.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {t(
                      "bulk_quotation.upload_tip",
                      "Make sure your file follows the template format. Download the template from the Template tab if you haven't already."
                    )}
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="text-2xl font-bold">{parsedData.length}</div>
                    <div className="text-sm text-muted-foreground">
                      {t("bulk_quotation.total_rows", "Total Rows")}
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-green-600">{validCount}</div>
                    <div className="text-sm text-muted-foreground">
                      {t("bulk_quotation.valid_rows", "Valid")}
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                    <div className="text-sm text-muted-foreground">
                      {t("bulk_quotation.error_rows", "Errors")}
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
                    <div className="text-sm text-muted-foreground">
                      {t("bulk_quotation.warning_rows", "Warnings")}
                    </div>
                  </Card>
                </div>

                {/* Selection Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={selectAllValid}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {t("bulk_quotation.select_all_valid", "Select All Valid")}
                    </Button>
                    <Button variant="outline" size="sm" onClick={deselectAll}>
                      <X className="h-4 w-4 mr-2" />
                      {t("bulk_quotation.deselect_all", "Deselect All")}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleRemoveFile}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t("bulk_quotation.remove_file", "Remove File")}
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("bulk_quotation.selected_count", `${selectedRows.length} selected`)}
                  </div>
                </div>

                {/* Data Preview Table */}
                <ScrollArea className="h-[400px] border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>{t("bulk_quotation.col_customer", "Customer")}</TableHead>
                        <TableHead>{t("bulk_quotation.col_deal", "Deal")}</TableHead>
                        <TableHead>{t("bulk_quotation.col_service", "Service")}</TableHead>
                        <TableHead>{t("bulk_quotation.col_amount", "Amount")}</TableHead>
                        <TableHead>{t("bulk_quotation.col_validity", "Validity")}</TableHead>
                        <TableHead>{t("bulk_quotation.col_bu", "BU")}</TableHead>
                        <TableHead>{t("bulk_quotation.col_status", "Status")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedData.map((row, index) => (
                        <TableRow
                          key={index}
                          className={
                            row.errors.length > 0
                              ? "bg-red-50 dark:bg-red-950/20"
                              : row.warnings.length > 0
                              ? "bg-yellow-50 dark:bg-yellow-950/20"
                              : ""
                          }
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedRows.includes(index)}
                              onCheckedChange={() => toggleRowSelection(index)}
                              disabled={row.errors.length > 0}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{row.rowNumber}</TableCell>
                          <TableCell>{row.customerName}</TableCell>
                          <TableCell>{row.dealName}</TableCell>
                          <TableCell>{row.serviceType}</TableCell>
                          <TableCell>{row.amount}</TableCell>
                          <TableCell>{row.validityDays} days</TableCell>
                          <TableCell>{row.businessUnit}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {row.errors.length > 0 && (
                                <div className="flex items-start gap-1">
                                  <Badge variant="destructive" className="text-xs">
                                    {row.errors.length} Error{row.errors.length > 1 ? "s" : ""}
                                  </Badge>
                                </div>
                              )}
                              {row.warnings.length > 0 && (
                                <div className="flex items-start gap-1">
                                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                    {row.warnings.length} Warning{row.warnings.length > 1 ? "s" : ""}
                                  </Badge>
                                </div>
                              )}
                              {row.errors.length === 0 && row.warnings.length === 0 && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Valid
                                </Badge>
                              )}
                              {row.errors.map((error, i) => (
                                <div key={`error-${i}`} className="text-xs text-red-600">
                                  • {error}
                                </div>
                              ))}
                              {row.warnings.map((warning, i) => (
                                <div key={`warning-${i}`} className="text-xs text-yellow-600">
                                  ⚠ {warning}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            )}
          </TabsContent>

          <TabsContent value="template" className="space-y-4">
            <Alert>
              <FileSpreadsheet className="h-4 w-4" />
              <AlertDescription>
                {t(
                  "bulk_quotation.template_info",
                  "Download a pre-formatted template with example data to get started quickly"
                )}
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={downloadTemplate}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <FileSpreadsheet className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">
                      {t("bulk_quotation.excel_template", "Excel Template")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t(
                        "bulk_quotation.excel_description",
                        "Download Excel template with formatting and validation rules"
                      )}
                    </p>
                    <Button onClick={downloadTemplate} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      {t("bulk_quotation.download_excel", "Download Excel (.xlsx)")}
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={downloadCSVTemplate}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">
                      {t("bulk_quotation.csv_template", "CSV Template")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {t(
                        "bulk_quotation.csv_description",
                        "Download CSV template for basic editing in any spreadsheet software"
                      )}
                    </p>
                    <Button onClick={downloadCSVTemplate} variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      {t("bulk_quotation.download_csv", "Download CSV (.csv)")}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">
                {t("bulk_quotation.template_fields", "Template Fields")}
              </h3>
              <div className="space-y-2">
                {templateColumns.map((col) => (
                  <div key={col.key} className="flex items-start gap-3 p-2 rounded hover:bg-muted/50">
                    <div className="mt-1">
                      {col.required ? (
                        <Badge variant="destructive" className="text-xs">
                          {t("bulk_quotation.required", "Required")}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          {t("bulk_quotation.optional", "Optional")}
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {col.label_en} / {col.label_th}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {showPreview ? (
            <>
              <Button variant="outline" onClick={handleClose} disabled={isProcessing}>
                {t("bulk_quotation.cancel", "Cancel")}
              </Button>
              <Button
                onClick={handleBulkCreate}
                disabled={isProcessing || selectedRows.length === 0}
                style={{
                  backgroundColor: selectedRows.length > 0 ? roleTheme.color : undefined,
                }}
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {t("bulk_quotation.creating", "Creating...")}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t("bulk_quotation.create_button", `Create ${selectedRows.length} Quotations`)}
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleClose}>
              {t("bulk_quotation.close", "Close")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
