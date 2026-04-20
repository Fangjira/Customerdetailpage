import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  FileText,
  FolderOpen,
  Upload,
  Download,
  Share2,
  Trash2,
  Star,
  Clock,
  File,
  Image as ImageIcon,
  FileSpreadsheet,
  Search,
  Grid3x3,
  List,
  Plus,
  Filter,
  MoreVertical,
  X,
  Eye,
  Edit,
  Calendar,
  User,
  HardDrive,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface DocumentType {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  owner: string;
  folder: string;
  starred: boolean;
  version: string;
  iconType: string;
}

export function DocumentsScreen() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [selectedDocument, setSelectedDocument] = useState<DocumentType | null>(
    null
  );

  const folders = [
    { id: "all", name: "All Documents", count: 156, iconType: "FileText" },
    { id: "contracts", name: "Contracts", count: 45, iconType: "FileText" },
    { id: "quotations", name: "Quotations", count: 68, iconType: "FileText" },
    { id: "invoices", name: "Invoices", count: 32, iconType: "FileSpreadsheet" },
    { id: "proposals", name: "Proposals", count: 11, iconType: "FolderOpen" },
  ];

  const documents: DocumentType[] = [
    {
      id: "1",
      name: "Annual Freight Agreement - GFS.pdf",
      type: "Contract",
      size: "2.4 MB",
      modified: "2024-12-25",
      owner: "Sarah Chen",
      folder: "contracts",
      starred: true,
      version: "v3.2",
      iconType: "FileText",
    },
    {
      id: "2",
      name: "Warehousing Services Quote - PTC.pdf",
      type: "Quotation",
      size: "1.8 MB",
      modified: "2024-12-24",
      owner: "Michael Park",
      folder: "quotations",
      starred: false,
      version: "v2.1",
      iconType: "FileText",
    },
    {
      id: "3",
      name: "Sea Freight Proposal - ALN.docx",
      type: "Proposal",
      size: "3.2 MB",
      modified: "2024-12-23",
      owner: "Emily Rodriguez",
      folder: "proposals",
      starred: true,
      version: "v1.5",
      iconType: "FileText",
    },
    {
      id: "4",
      name: "Invoice DEC-2024-089.xlsx",
      type: "Invoice",
      size: "156 KB",
      modified: "2024-12-22",
      owner: "David Kim",
      folder: "invoices",
      starred: false,
      version: "v1.0",
      iconType: "FileSpreadsheet",
    },
    {
      id: "5",
      name: "Contract Terms Amendment.pdf",
      type: "Contract",
      size: "890 KB",
      modified: "2024-12-21",
      owner: "Sarah Chen",
      folder: "contracts",
      starred: false,
      version: "v2.0",
      iconType: "FileText",
    },
    {
      id: "6",
      name: "Air Freight Services Quote.pdf",
      type: "Quotation",
      size: "2.1 MB",
      modified: "2024-12-20",
      owner: "Michael Park",
      folder: "quotations",
      starred: true,
      version: "v1.3",
      iconType: "FileText",
    },
  ];

  const filteredDocuments = documents.filter(
    (doc) => selectedFolder === "all" || doc.folder === selectedFolder
  );

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "Contract":
        return "bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]";
      case "Quotation":
        return "bg-[#fef3c7] text-[#92400e] border-[#fcd34d]";
      case "Invoice":
        return "bg-[#dcfce7] text-[#166534] border-[#86efac]";
      case "Proposal":
        return "bg-[#f5f3ff] text-[#705add] border-[#c4b5fd]";
      default:
        return "bg-[#f3f4f6] text-[#4b5563] border-[#d1d5db]";
    }
  };

  const renderFolderIcon = (iconType: string, className: string) => {
    switch (iconType) {
      case "FileText":
        return <FileText className={className} />;
      case "FileSpreadsheet":
        return <FileSpreadsheet className={className} />;
      case "FolderOpen":
        return <FolderOpen className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  const renderDocIcon = (iconType: string, className: string) => {
    switch (iconType) {
      case "FileText":
        return <FileText className={className} />;
      case "FileSpreadsheet":
        return <FileSpreadsheet className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-[#4c1d95] font-semibold">
              {t("documents.title")}
            </h1>
            <p className="text-[#9333ea] mt-1">{t("documents.subtitle")}</p>
          </div>
          <Button className="bg-[#705add] text-white hover:bg-[#5b21b6] rounded-xl gap-2">
            <Upload className="h-4 w-4" />
            {t("documents.upload")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea] mb-1">
                    {t("documents.total_documents")}
                  </p>
                  <p className="text-2xl font-bold text-[#4c1d95]">156</p>
                </div>
                <div className="h-12 w-12 bg-[#f5f3ff] rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#705add]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea] mb-1">
                    {t("documents.total_size")}
                  </p>
                  <p className="text-2xl font-bold text-[#4c1d95]">24.8 GB</p>
                </div>
                <div className="h-12 w-12 bg-[#dbeafe] rounded-xl flex items-center justify-center">
                  <FolderOpen className="h-6 w-6 text-[#1e40af]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea] mb-1">
                    {t("documents.shared")}
                  </p>
                  <p className="text-2xl font-bold text-[#4c1d95]">42</p>
                </div>
                <div className="h-12 w-12 bg-[#fef3c7] rounded-xl flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-[#92400e]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#ede9fe] shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9333ea] mb-1">
                    {t("documents.starred")}
                  </p>
                  <p className="text-2xl font-bold text-[#4c1d95]">18</p>
                </div>
                <div className="h-12 w-12 bg-[#dcfce7] rounded-xl flex items-center justify-center">
                  <Star className="h-6 w-6 text-[#166534]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-2 border-[#ede9fe] shadow-sm">
              <CardHeader>
                <CardTitle className="text-[#4c1d95] text-base">
                  {t("documents.folders")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                      selectedFolder === folder.id
                        ? "bg-[#705add] text-white"
                        : "hover:bg-[#f5f3ff] text-[#4c1d95]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {renderFolderIcon(folder.iconType, "h-4 w-4")}
                      <span className="text-sm font-medium">{folder.name}</span>
                    </div>
                    <Badge
                      className={
                        selectedFolder === folder.id
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-[#f5f3ff] text-[#705add] border-[#ede9fe]"
                      }
                    >
                      {folder.count}
                    </Badge>
                  </button>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-4 border-2 border-dashed border-[#ede9fe] text-[#705add] hover:bg-[#f5f3ff] rounded-xl gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {t("documents.new_folder")}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Toolbar */}
            <Card className="border-2 border-[#ede9fe] shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a78bfa]" />
                    <Input
                      placeholder={t("documents.search_placeholder")}
                      className="pl-10 border-2 border-[#ede9fe] rounded-xl"
                    />
                  </div>
                  <Select defaultValue="modified">
                    <SelectTrigger className="w-40 border-2 border-[#ede9fe] rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modified">{t("documents.sort_modified")}</SelectItem>
                      <SelectItem value="name">{t("documents.sort_name")}</SelectItem>
                      <SelectItem value="size">{t("documents.sort_size")}</SelectItem>
                      <SelectItem value="type">{t("documents.sort_type")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 border-2 border-[#ede9fe] rounded-xl p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={
                        viewMode === "grid"
                          ? "bg-[#705add] text-white hover:bg-[#5b21b6]"
                          : "hover:bg-[#f5f3ff]"
                      }
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={
                        viewMode === "list"
                          ? "bg-[#705add] text-white hover:bg-[#5b21b6]"
                          : "hover:bg-[#f5f3ff]"
                      }
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Grid */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <Card
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc)}
                    className="border-2 border-[#ede9fe] shadow-sm hover:shadow-md hover:border-[#705add] transition-all cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="h-12 w-12 bg-[#f5f3ff] border-2 border-[#ede9fe] rounded-xl flex items-center justify-center group-hover:bg-[#705add] group-hover:border-[#705add] transition-colors">
                          {renderDocIcon(doc.iconType, "h-6 w-6 text-[#705add] group-hover:text-white transition-colors")}
                        </div>
                        <div className="flex items-center gap-1">
                          {doc.starred && (
                            <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b]" />
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-medium text-[#4c1d95] text-sm mb-2 line-clamp-2">
                        {doc.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <Badge className={getFileTypeColor(doc.type)}>
                          {doc.type}
                        </Badge>
                        <span className="text-xs text-[#a78bfa]">{doc.size}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#ede9fe] flex items-center justify-between text-xs text-[#9333ea]">
                        <span>{doc.owner}</span>
                        <span>{doc.modified}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-2 border-[#ede9fe] shadow-sm">
                <CardContent className="p-0">
                  <div className="divide-y divide-[#ede9fe]">
                    {filteredDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDocument(doc)}
                        className="flex items-center gap-4 p-4 hover:bg-[#faf8ff] cursor-pointer group"
                      >
                        <div className="h-10 w-10 bg-[#f5f3ff] border-2 border-[#ede9fe] rounded-xl flex items-center justify-center group-hover:bg-[#705add] group-hover:border-[#705add] transition-colors flex-shrink-0">
                          {renderDocIcon(doc.iconType, "h-5 w-5 text-[#705add] group-hover:text-white transition-colors")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#4c1d95] text-sm truncate">
                            {doc.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`${getFileTypeColor(doc.type)} text-xs`}>
                              {doc.type}
                            </Badge>
                            <span className="text-xs text-[#a78bfa]">
                              {doc.version}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-[#9333ea]">
                          <span className="w-24">{doc.owner}</span>
                          <span className="w-20">{doc.size}</span>
                          <span className="w-24">{doc.modified}</span>
                          <div className="flex items-center gap-1">
                            {doc.starred && (
                              <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b]" />
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="h-8 w-8"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogTitle className="sr-only">
            {t("documents.document_preview")} - {selectedDocument?.name}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t("documents.document_preview")} - {selectedDocument?.name}
          </DialogDescription>
          <DialogHeader className="border-b-2 border-[#ede9fe] bg-gradient-to-r from-[#f5f3ff] to-white px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-[#705add] rounded-xl flex items-center justify-center">
                  {selectedDocument && renderDocIcon(selectedDocument.iconType, "h-6 w-6 text-white")}
                </div>
                <div>
                  <DialogTitle className="text-[#4c1d95]">
                    {selectedDocument?.name}
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={selectedDocument ? getFileTypeColor(selectedDocument.type) : ""}>
                      {selectedDocument?.type}
                    </Badge>
                    <span className="text-xs text-[#8b5cf6]">{selectedDocument?.version}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {t("documents.download")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  {t("documents.share")}
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
            <div className="grid grid-cols-3 gap-6 p-6">
              {/* Preview Area */}
              <div className="col-span-2">
                <div className="border-2 border-[#ede9fe] rounded-xl p-8 bg-gradient-to-br from-[#faf8ff] to-white min-h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    {selectedDocument && renderDocIcon(selectedDocument.iconType, "h-24 w-24 text-[#705add] mx-auto mb-4")}
                    <p className="text-[#4c1d95] font-medium mb-2">
                      {t("documents.preview_not_available")}
                    </p>
                    <p className="text-sm text-[#8b5cf6] mb-4">
                      {t("documents.download_to_view")}
                    </p>
                    <Button className="bg-gradient-to-r from-[#a78bfa] to-[#705add] hover:from-[#8b5cf6] hover:to-[#6d28d9] text-white rounded-xl">
                      <Eye className="h-4 w-4 mr-2" />
                      {t("documents.open_document")}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Document Details */}
              <div className="col-span-1 space-y-4">
                <Card className="border-2 border-[#ede9fe]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-[#4c1d95]">
                      {t("documents.details")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8b5cf6] mb-1">
                        <User className="h-3 w-3" />
                        <span>{t("documents.owner")}</span>
                      </div>
                      <p className="text-sm text-[#4c1d95] font-medium">
                        {selectedDocument?.owner}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8b5cf6] mb-1">
                        <Calendar className="h-3 w-3" />
                        <span>{t("documents.modified")}</span>
                      </div>
                      <p className="text-sm text-[#4c1d95] font-medium">
                        {selectedDocument?.modified}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8b5cf6] mb-1">
                        <HardDrive className="h-3 w-3" />
                        <span>{t("documents.size")}</span>
                      </div>
                      <p className="text-sm text-[#4c1d95] font-medium">
                        {selectedDocument?.size}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8b5cf6] mb-1">
                        <FileText className="h-3 w-3" />
                        <span>{t("documents.version")}</span>
                      </div>
                      <p className="text-sm text-[#4c1d95] font-medium">
                        {selectedDocument?.version}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#8b5cf6] mb-1">
                        <FolderOpen className="h-3 w-3" />
                        <span>{t("documents.folder")}</span>
                      </div>
                      <p className="text-sm text-[#4c1d95] font-medium capitalize">
                        {selectedDocument?.folder}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ede9fe]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-[#4c1d95]">
                      {t("documents.actions")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {t("documents.download")}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      {t("documents.share")}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {t("documents.edit")}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-2 border-[#ede9fe] text-[#4c1d95] hover:bg-[#f5f3ff] rounded-xl"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      {t("documents.star")}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t("documents.delete")}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#ede9fe]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-[#4c1d95]">
                      {t("documents.activity")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 bg-[#f5f3ff] rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="h-4 w-4 text-[#705add]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-[#4c1d95] font-medium">
                            {t("documents.last_modified")}
                          </p>
                          <p className="text-xs text-[#8b5cf6] mt-0.5">
                            {selectedDocument?.modified}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 bg-[#dbeafe] rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-[#1e40af]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-[#4c1d95] font-medium">
                            {t("documents.uploaded_by")}
                          </p>
                          <p className="text-xs text-[#8b5cf6] mt-0.5">
                            {selectedDocument?.owner}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}