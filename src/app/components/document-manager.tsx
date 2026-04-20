import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Eye,
  FileSpreadsheet,
  FileImage,
  File,
  Search,
  Filter,
  FolderOpen,
  Calendar,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Combobox } from "./ui/combobox";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "excel" | "image" | "other";
  category: "invoice" | "contract" | "quotation" | "bol" | "certificate" | "other";
  size: string;
  uploadedBy: string;
  uploadDate: string;
  version: number;
}

export function DocumentManager() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "DOC-001",
      name: "Commercial Invoice - Q2024-045.pdf",
      type: "pdf",
      category: "invoice",
      size: "2.4 MB",
      uploadedBy: "Sarah Chen",
      uploadDate: "2024-12-26",
      version: 1,
    },
    {
      id: "DOC-002",
      name: "Service Contract - Pacific Logistics.pdf",
      type: "pdf",
      category: "contract",
      size: "1.8 MB",
      uploadedBy: "Michael Park",
      uploadDate: "2024-12-25",
      version: 2,
    },
    {
      id: "DOC-003",
      name: "Quotation - Air Freight Services.xlsx",
      type: "excel",
      category: "quotation",
      size: "256 KB",
      uploadedBy: "Emily Rodriguez",
      uploadDate: "2024-12-24",
      version: 1,
    },
    {
      id: "DOC-004",
      name: "Bill of Lading - Shipment #12345.pdf",
      type: "pdf",
      category: "bol",
      size: "890 KB",
      uploadedBy: "David Kim",
      uploadDate: "2024-12-23",
      version: 1,
    },
    {
      id: "DOC-005",
      name: "ISO Certificate - 2024.pdf",
      type: "pdf",
      category: "certificate",
      size: "1.2 MB",
      uploadedBy: "Lisa Anderson",
      uploadDate: "2024-12-22",
      version: 1,
    },
    {
      id: "DOC-006",
      name: "Warehouse Layout.png",
      type: "image",
      category: "other",
      size: "3.5 MB",
      uploadedBy: "Sarah Chen",
      uploadDate: "2024-12-21",
      version: 1,
    },
  ]);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Mock upload - in real app, upload to server
      Array.from(files).forEach((file) => {
        const newDoc: Document = {
          id: `DOC-${String(documents.length + 1).padStart(3, "0")}`,
          name: file.name,
          type: file.type.includes("pdf")
            ? "pdf"
            : file.type.includes("sheet") || file.type.includes("excel")
            ? "excel"
            : file.type.includes("image")
            ? "image"
            : "other",
          category: "other",
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          uploadedBy: "Current User",
          uploadDate: new Date().toISOString().split("T")[0],
          version: 1,
        };
        setDocuments((prev) => [newDoc, ...prev]);
      });
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-8 w-8 text-[#dc2626]" />;
      case "excel":
        return <FileSpreadsheet className="h-8 w-8 text-[#059669]" />;
      case "image":
        return <FileImage className="h-8 w-8 text-[#2563eb]" />;
      default:
        return <File className="h-8 w-8 text-[#6b7280]" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      invoice: "bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]",
      contract: "bg-[#ede9fe] text-[#705add] border-[#ddd6fe]",
      quotation: "bg-[#fef3c7] text-[#92400e] border-[#fcd34d]",
      bol: "bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]",
      certificate: "bg-[#dcfce7] text-[#166534] border-[#86efac]",
      other: "bg-[#f3f4f6] text-[#374151] border-[#d1d5db]",
    };

    return (
      <Badge className={`${colors[category] || colors.other} text-xs font-semibold`}>
        {t(`documents.category_${category}`)}
      </Badge>
    );
  };

  return (
    <Card className="border-2 border-[#ede9fe] shadow-md bg-white rounded-2xl">
      <CardHeader className="border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#faf8ff] to-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-[#a78bfa] to-[#705add] rounded-xl flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-[#4c1d95] text-xl">
                {t("documents.title")}
              </CardTitle>
              <p className="text-sm text-[#9333ea] font-medium mt-1">
                {filteredDocuments.length} {t("documents.files")}
              </p>
            </div>
          </div>

          {/* Upload Button */}
          <label htmlFor="file-upload">
            <Button
              className="bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white rounded-xl"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              {t("documents.upload")}
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Search and Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a78bfa]" />
            <Input
              placeholder={t("documents.search")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-11 border-2 border-[#ede9fe] rounded-xl"
            />
          </div>

          <div className="flex items-center gap-2 w-[200px]">
            <Filter className="h-4 w-4 text-[#705add] flex-shrink-0" />
            <Combobox
              options={[
                { value: "all", label: t("documents.all_categories") },
                { value: "invoice", label: t("documents.category_invoice") },
                { value: "contract", label: t("documents.category_contract") },
                { value: "quotation", label: t("documents.category_quotation") },
                { value: "bol", label: t("documents.category_bol") },
                { value: "certificate", label: t("documents.category_certificate") },
                { value: "other", label: t("documents.category_other") },
              ]}
              value={filterCategory}
              onValueChange={setFilterCategory}
              placeholder={t("documents.all_categories")}
              searchPlaceholder="ค้นหา..."
              className="h-11 border-2 border-[#ede9fe] rounded-xl flex-1"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <ScrollArea className="h-[500px]">
          {filteredDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-16 w-16 bg-[#f5f3ff] rounded-full flex items-center justify-center mb-4">
                <FolderOpen className="h-8 w-8 text-[#ddd6fe]" />
              </div>
              <h3 className="font-bold text-[#4c1d95] mb-2">
                {t("documents.no_documents")}
              </h3>
              <p className="text-sm text-[#9333ea]">
                {t("documents.upload_first")}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((doc) => (
                <Card
                  key={doc.id}
                  className="border-2 border-[#ede9fe] hover:border-[#a78bfa] hover:shadow-md transition-all rounded-xl"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* File Icon */}
                      <div className="h-14 w-14 bg-gradient-to-br from-[#faf8ff] to-[#f5f3ff] rounded-xl flex items-center justify-center border-2 border-[#ede9fe]">
                        {getFileIcon(doc.type)}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-[#4c1d95] text-sm truncate">
                            {doc.name}
                          </h4>
                          {getCategoryBadge(doc.category)}
                          {doc.version > 1 && (
                            <Badge className="bg-[#dbeafe] text-[#1e40af] border-0 text-xs">
                              v{doc.version}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-[#9333ea]">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {doc.uploadedBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {doc.uploadDate}
                          </span>
                          <span>{doc.size}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-[#dbeafe] hover:text-[#1e40af] rounded-lg"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-[#dcfce7] hover:text-[#166534] rounded-lg"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:bg-[#fee2e2] hover:text-[#991b1b] rounded-lg"
                          onClick={() => {
                            setDocuments((prev) =>
                              prev.filter((d) => d.id !== doc.id)
                            );
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
