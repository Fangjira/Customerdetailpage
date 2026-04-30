import React, { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { 
  ChevronLeft, 
  XCircle, 
  AlertTriangle,
  Clock,
  MapPin,
  Building2,
  Users,
  FileText,
  MessageSquare,
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from "../ui/badge";
import "../../../i18n/config";

interface VisitDetailScreenProps {
  visitId?: string;
  onBack?: () => void;
}

export function VisitDetailScreen({ visitId = 'V001', onBack = () => {} }: VisitDetailScreenProps) {
  const { t } = useTranslation();

  // Mock data
  const visitDataMap: Record<string, any> = {
    'V001': {
      id: 'V001',
      topic: 'นำเสนอระบบจัดการคลังสินค้ายาและเวชภัณฑ์',
      serviceNames: 'Warehouse',
      date: '2026-02-10',
      startTime: '14:30',
      endTime: '16:30',
      salesPerson: 'จิราพัขร',
      attendees: ['คุณวิชัย', 'คุณ สมพร'],
      customer: 'องค์การเภสัชกรรม',
      customerCode: 'CUST-001',
      location: 'กระทรวงสาธารณสุข ถนนติวานนท์',
      siteBranch: 'สาขาติวานนท์ (สำนักงานใหญ่)',
      gps: { latitude: '13.7563', longitude: '100.5018' },
      contactPerson: 'นพ.สมชาย วงศ์ใหญ่, ภญ.สุภาพร ศรีสวัสดิ์',
      contactPhone: '02-590-1234',
      Type: 'นำเสนอผลิตภัณฑ์',
      notes: 'นำเสนอ Warehouse Management System สำหรับจัดการยาและเวชภัณฑ์ พร้อมระบบ Temperature Control และ Track & Trace แบบ Real-time สำหรับยาที่ต้องควบคุมอุณหภูมิ ลูกค้าสนใจและขอดูรายละเอียดเพิ่มเติม',
      images: [
        'https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBwaGFybWFjZXV0aWNhbCUyMHN0b3JhZ2V8ZW58MXx8fHwxNzcwODA2OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1758518730083-4c12527b6742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBvZmZpY2UlMjBkaXNjdXNzaW9ufGVufDF8fHx8MTc3MDgwNjkxMHww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      nextAction: 'ส่งใบเสนอราคา WMS พร้อม ROI Analysis ภายในวันที่ 15 ก.พ. 2569',
      result: 'Positive',
      checkInTime: '14:28',
      checkOutTime: '16:45',
      duration: '2 ชม. 17 นาที'
    }
  };

  const visitData = visitDataMap[visitId] || visitDataMap['V001'];

  const [editingNotes, setEditingNotes] = useState(false);
  const [newNotes, setNewNotes] = useState(visitData.notes);

  const [shortNotes, setShortNotes] = useState<Array<{
    id: string;
    text: string;
    timestamp: Date;
    author: string;
    attachments?: { name: string; url: string; size: string }[];
  }>>([
    {
      id: "note_mock_01",
      text: "ลูกค้ารีเควสขอให้เราปรับ Proposal โดยเพิ่ม Option การรับประกันสินค้าระหว่างขนส่งเข้าไปด้วยครับ รบกวนทีม Sales Support ช่วยประเมินราคาให้ใหม่ตามไฟล์ Requirement ที่แนบมานี้ครับ",
      timestamp: new Date("2026-02-10T17:15:00"),
      author: "จิราพัขร",
      attachments: [
        { name: "Customer_Requirement_U", url: "#", size: "1.2 MB" },
        { name: "Warehouse_Layout_Plan.p", url: "#", size: "850 KB" }
      ]
    }
  ]);

  const [editingShortNoteId, setEditingShortNoteId] = useState<string | null>(null);
  const [editShortNoteText, setEditShortNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newShortNoteText, setNewShortNoteText] = useState("");
  
  // File Attachment States
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveNotes = () => {
    visitData.notes = newNotes;
    setEditingNotes(false);
  };

  const handleStartEditShortNote = (id: string, text: string) => {
    setEditingShortNoteId(id);
    setEditShortNoteText(text);
  };

  const handleSaveShortNote = (id: string) => {
    setShortNotes(prev => prev.map(note => 
      note.id === id ? { ...note, text: editShortNoteText } : note
    ));
    setEditingShortNoteId(null);
  };

  const handleAddShortNote = () => {
    if (!newShortNoteText.trim() && selectedFiles.length === 0) return;
    const newNote = {
      id: Date.now().toString(),
      text: newShortNoteText,
      timestamp: new Date(),
      author: "จิราพัขร",
      attachments: selectedFiles.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        size: (file.size / 1024).toFixed(1) + " KB"
      }))
    };
    setShortNotes([newNote, ...shortNotes]);
    setNewShortNoteText("");
    setSelectedFiles([]);
    setIsAddingNote(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-20 px-4 py-3 flex items-center gap-4">
        <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">รายละเอียดการเข้าพบ</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-5xl w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-gray">
        
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-3 flex-1">
          
          {/* Main Info Card */}
          <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded uppercase border border-gray-100 block w-fit mb-2">
                  {visitData.id}
                </span>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">ลูกค้า</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-xs font-semi text-gray-900">{visitData.customer}</h2>
                  <span className="text-xs text-gray-400">{visitData.customerCode}</span>
                </div>
              </div>
              <Badge className="bg-green-50 text-green-600 border-green-100 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                สำเร็จ
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">หัวข้อกิจกรรม</p>
              <p className="text-xs font-semi text-gray-900 leading-tight">{visitData.topic}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">ประเภทกิจกรรม</p>
                <Badge variant="outline" className="text-blue-600 border-blue-100 bg-blue-50/50 rounded-full px-4 py-1 font-medium">
                  {visitData.Type}
                </Badge>
              </div>
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">หัวข้อบริการ</p>
                <Badge variant="outline" className="text-blue-600 border-blue-100 bg-blue-50/50 rounded-full px-4 py-1 font-medium">
                  {visitData.serviceNames}
                </Badge>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-gray-900">
                <Building2 className="w-5 h-5" />
                <h3 className="font-semi text-xs">ผู้ติดต่อฝั่งลูกค้า</h3>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">ชื่อผู้ติดต่อ</p>
                <p className="text-xs font-semi text-gray-900">{visitData.contactPerson}</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-gray-900">
                <Users className="w-5 h-5" />
                <h3 className="font-semi text-xs">ผู้รับผิดชอบและผู้เข้าร่วม</h3>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">ผู้รับผิดชอบ</p>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-semi text-gray-900">{visitData.salesPerson}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">ผู้เข้าร่วมที่จำเป็น</p>
                  <div className="flex flex-wrap gap-2">
                    {visitData.attendees.map((a: string, i: number) => (
                      <Badge key={i} className="bg-[#f0edff] text-gray-900 border-none rounded-lg px-3 py-1.5 text-xs font-medium">
                        {a}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Location & Time Card */}
          <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-2">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-900">
                <Clock className="w-5 h-5" />
                <h3 className="font-semi text-xs">วันเวลาและการเข้าพื้นที่</h3>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">วันที่</p>
                  <p className="text-xs font-semi text-gray-900">10 ก.พ. 2569</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">เวลาเริ่มต้น</p>
                  <p className="text-xs font-semi text-gray-900">{visitData.startTime} น.</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">เวลาสิ้นสุด</p>
                  <p className="text-xs font-semi text-gray-900">{visitData.endTime} น.</p>
                </div>
                <div className="space-y-1">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">CHECK-IN</p>
                <p className="text-xs font-semi text-green-500">{visitData.checkInTime}</p>
              </div>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-2 text-gray-900">
                <MapPin className="w-5 h-5" />
                <h3 className="font-semi text-xs">สถานที่และสาขา</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">สถานที่</p>
                  <p className="text-xs font-medium text-gray-700">{visitData.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">สาขา/ไซด์งาน</p>
                  <p className="text-xs font-semi text-gray-900">{visitData.siteBranch}</p>
                </div>
               </div>
             </div> 
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 space-y-3">
          
          {/* Visit Details Card */}
          <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-gray-900">
                <FileText className="w-5 h-5" />
                <h3 className="font-semi text-xs">รายละเอียด</h3>
              </div>
              <button onClick={() => setEditingNotes(true)} className="text-blue-500 text-xs font-semi hover:underline">แก้ไข</button>
            </div>
            
            {editingNotes ? (
              <div className="space-y-4">
                <Textarea 
                  value={newNotes} 
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="min-h-[120px] rounded-xl border-gray-200 focus:ring-gray-900"
                />
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setEditingNotes(false)} className="rounded-full px-6">ยกเลิก</Button>
                  <Button onClick={handleSaveNotes} className="bg-gray-900 hover:bg-[#5b46c2] text-white rounded-full px-6">บันทึก</Button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {visitData.notes}
              </p>
            )}
          </section>

          {/* Short Notes Card */}
          <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-3">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-gray-900">
                <MessageSquare className="w-5 h-5" />
                <h3 className="font-semi text-xs">บันทึกย่อ (Short Notes)</h3>
              </div>
              <button 
                onClick={() => setIsAddingNote(true)} 
                className="text-blue-500 text-xs font-semi hover:underline"
              >
                เพิ่มบันทึก
              </button>
            </div>

            <div className="space-y-6">
              {isAddingNote && (
                <div className="space-y-4 border-b border-gray-50 pb-6">
                  <Textarea 
                    value={newShortNoteText} 
                    onChange={(e) => setNewShortNoteText(e.target.value)}
                    placeholder="พิมพ์บันทึกย่อที่นี่..."
                    className="min-h-[100px] rounded-xl border-gray-200 focus:ring-gray-900"
                  />
                  
                  {/* Selected Files Preview */}
                  {selectedFiles.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedFiles.map((file, i) => (
                        <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 text-[11px] text-gray-600">
                          <Paperclip className="w-3 h-3 text-blue-500" />
                          <span className="truncate max-w-[120px]">{file.name}</span>
                          <button onClick={() => removeFile(i)} className="text-red-400 hover:text-red-600 ml-1">
                            <XCircle className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 text-blue-500 text-xs font-semi hover:underline"
                    >
                      <Paperclip className="w-4 h-4" />
                      แนบไฟล์
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileSelect} 
                      className="hidden" 
                      multiple 
                    />
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" onClick={() => { setIsAddingNote(false); setSelectedFiles([]); }} className="rounded-full px-4">ยกเลิก</Button>
                      <Button size="sm" onClick={handleAddShortNote} className="bg-gray-900 hover:bg-[#5b46c2] text-white rounded-full px-4">บันทึก</Button>
                    </div>
                  </div>
                </div>
              )}

              {shortNotes.map((note) => (
                <div key={note.id} className="space-y-4 border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                  {editingShortNoteId === note.id ? (
                    <div className="space-y-4">
                      <Textarea 
                        value={editShortNoteText} 
                        onChange={(e) => setEditShortNoteText(e.target.value)}
                        className="min-h-[100px] rounded-xl border-gray-200 focus:ring-gray-900"
                      />
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" size="sm" onClick={() => setEditingShortNoteId(null)} className="rounded-full px-4">ยกเลิก</Button>
                        <Button size="sm" onClick={() => handleSaveShortNote(note.id)} className="bg-gray-900 hover:bg-[#5b46c2] text-white rounded-full px-4">บันทึก</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start gap-4">
                        <p className="text-xs text-gray-700 leading-relaxed font-medium flex-1">
                          {note.text}
                        </p>
                        <button 
                          onClick={() => handleStartEditShortNote(note.id, note.text)}
                          className="text-blue-500 text-xs font-semi hover:underline shrink-0"
                        >
                          แก้ไข
                        </button>
                      </div>
                      {note.attachments && (
                        <div className="flex flex-wrap gap-3">
                          {note.attachments.map((file, i) => (
                            <div key={i} className="flex items-center gap-2 bg-blue-50/50 border border-blue-100 rounded-full px-4 py-1.5 text-xs text-gray-600 font-medium">
                              <Paperclip className="w-3.5 h-3.5 text-blue-500" />
                              <span>{file.name}</span>
                              <span className="text-gray-400 font-normal">({file.size})</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-[11px] text-gray-400 font-semi uppercase tracking-wider">
                        {note.author} • {note.timestamp.toLocaleString('th-TH', { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Photos Card */}
          <section className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
            <p className="text-xs font-semi text-gray-500 mb-6">รูปภาพแนบ ({visitData.images.length})</p>
            <div className="grid grid-cols-2 gap-4">
              {visitData.images.map((img: string, i: number) => (
                <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden border border-gray-100">
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
