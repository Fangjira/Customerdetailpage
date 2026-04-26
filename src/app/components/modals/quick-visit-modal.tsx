import { useState, useEffect } from "react";
import { 
  X, 
  MapPin, 
  Navigation, 
  CheckCircle, 
  CalendarClock,
  Camera,
  Search,
  CalendarDays
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "../ui/utils";

// --- Mock Data สำหรับ Dropdown (ดึงจากกิจกรรมที่วางแผนไว้ในวันนี้) ---
const mockPlannedActivities = [
  { id: "a1", title: "นำเสนอระบบ WMS", customer: "SCG Logistics", type: "product_presentation", location: "ห้องประชุม 1", branch: "สำนักงานใหญ่ บางซื่อ" },
  { id: "a2", title: "ประชุมติดตามงาน Phase 2", customer: "WHA Corporation", type: "follow_up", location: "ตึก B", branch: "Mega Logistics" },
  { id: "a3", title: "สำรวจหน้างานติดตั้ง", customer: "Kerry Express", type: "site_survey", location: "คลังสินค้าที่ 3", branch: "Sorting Center ปทุมธานี" },
];
// -----------------------------------------------------------

interface QuickVisitModalProps {
  open?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  prefilledData?: {
    customer?: string;
    contactPerson?: string;
    purpose?: string;
    topic?: string;
  };
  activity?: {
    id?: string;
    customer?: string;
    customerAddress?: string;
    title?: string;
    notes?: string;
    type?: string;        
    location?: string;    
    siteBranch?: string;  
  };
  task?: {
    customer?: string;
    customerAddress?: string;
    title?: string;
    notes?: string;
    purpose?: string;
    visitType?: string;
    type?: string;
    location?: string;
    siteBranch?: string;
  };
}

export function QuickVisitModal({
  open,
  isOpen,
  onClose,
  onSave,
  prefilledData,
  activity,
  task,
}: QuickVisitModalProps) {
  const { t } = useTranslation();
  
  const source = task || activity;
  const isStandAloneMode = !source; // ถ้าไม่มี source แสดงว่าเปิดมาจากปุ่มลอยในหน้า Calendar

  const [formData, setFormData] = useState({
    linkedActivityId: "",
    customer: source?.customer || prefilledData?.customer || "",
    topic: source?.title || prefilledData?.topic || "",
    checkInTime: new Date().toISOString().slice(0, 16),
    location: source?.customerAddress || source?.location || "",
    siteBranch: source?.siteBranch || "",
    gpsLatitude: "",
    gpsLongitude: "",
    photo: null as File | null,
    photoPreview: "" as string,
    visitType: task?.visitType || source?.type || "", 
  });

  const [capturingGPS, setCapturingGPS] = useState(false);
  const [openActivitySelector, setOpenActivitySelector] = useState(false);

  // Update form when activity changes or modal opens
  useEffect(() => {
    if (activity || prefilledData) {
      setFormData(prev => ({
        ...prev,
        customer: activity?.customer || prefilledData?.customer || prev.customer,
        topic: activity?.title || prefilledData?.topic || prev.topic,
        location: activity?.customerAddress || activity?.location || prev.location,
        siteBranch: activity?.siteBranch || prev.siteBranch,
        visitType: activity?.type || prev.visitType,
      }));
    } else if (open || isOpen) {
       // Reset form when opened in standalone mode
       setFormData(prev => ({
        ...prev,
        linkedActivityId: "",
        customer: "",
        topic: "",
        location: "",
        siteBranch: "",
        visitType: "",
        photo: null,
        photoPreview: "",
        gpsLatitude: "",
        gpsLongitude: "",
       }));
    }
  }, [activity, prefilledData, open, isOpen]);

  // Auto-capture GPS when modal opens
  useEffect(() => {
    if (open || isOpen) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFormData(prev => ({
              ...prev,
              gpsLatitude: position.coords.latitude.toFixed(6),
              gpsLongitude: position.coords.longitude.toFixed(6),
            }));
          },
          (error) => {
            console.log("GPS error:", error);
            setFormData(prev => ({
              ...prev,
              gpsLatitude: "13.7563",
              gpsLongitude: "100.5018",
            }));
          }
        );
      }
    }
  }, [open, isOpen]);

  // Handle selecting an activity from the dropdown to auto-fill
  const handleSelectActivity = (selectedActivity: typeof mockPlannedActivities[0]) => {
    setFormData(prev => ({
      ...prev,
      linkedActivityId: selectedActivity.id,
      topic: selectedActivity.title,
      customer: selectedActivity.customer,
      visitType: selectedActivity.type,
      location: selectedActivity.location,
      siteBranch: selectedActivity.branch,
    }));
    setOpenActivitySelector(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleCaptureGPS = () => {
    setCapturingGPS(true);
    setTimeout(() => {
      setFormData({
        ...formData,
        gpsLatitude: "13.7563",
        gpsLongitude: "100.5018",
      });
      setCapturingGPS(false);
    }, 1500);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo: file,
          photoPreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData({
      ...formData,
      photo: null,
      photoPreview: "",
    });
  };

  return (
    <Dialog open={open || isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[100vh] sm:h-auto sm:max-h-[90vh] flex flex-col bg-white p-0 gap-0 rounded-none sm:rounded-3xl shadow-2xl">
        {/* Header - Green */}
        <DialogHeader className="bg-gradient-to-r from-[#00BC7D] to-[#16a34a] px-4 py-4 flex-shrink-0 relative rounded-t-none sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-[#00BC7D]" />
              </div>
              <div>
                <DialogTitle className="text-lg text-white font-bold">
                  เช็คอินเข้าพบลูกค้า
                </DialogTitle>
                <DialogDescription className="text-xs text-white/90">
                  บันทึกการเข้าพบลูกค้าและระบุตำแหน่ง
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-white hover:bg-white/20 rounded-lg"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-[#f5f5f5] px-4 py-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* ----------------- STANDALONE MODE: Activity Linker ----------------- */}
            {isStandAloneMode && (
               <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 shadow-sm">
                  <label className="text-xs font-bold text-blue-800 mb-1.5 flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" /> ดึงข้อมูลจากกิจกรรมที่วางแผนไว้ <span className="text-red-500">*</span>
                  </label>
                  <Popover open={openActivitySelector} onOpenChange={setOpenActivitySelector}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openActivitySelector}
                        className={cn(
                          "w-full justify-between h-11 bg-white border-blue-200 text-sm font-normal truncate rounded-xl",
                          !formData.linkedActivityId && "text-gray-500"
                        )}
                      >
                        <span className="truncate">
                          {formData.linkedActivityId 
                            ? formData.topic 
                            : "ค้นหาและเลือกกิจกรรมของวันนี้..."}
                        </span>
                        <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-[99999]" align="start">
                      <Command>
                        <CommandInput placeholder="ค้นหากิจกรรม..." />
                        <CommandList>
                          <CommandEmpty>ไม่มีกิจกรรมที่วางแผนไว้</CommandEmpty>
                          <CommandGroup>
                            {mockPlannedActivities.map((act) => (
                              <CommandItem
                                key={act.id}
                                value={act.title}
                                onSelect={() => handleSelectActivity(act)}
                                className="flex flex-col items-start py-2 px-3 cursor-pointer"
                              >
                                <div className="font-medium text-sm text-gray-900">{act.title}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{act.customer} • {act.location}</div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
               </div>
            )}
            {/* -------------------------------------------------------------------- */}

            {/* CHECK-IN LOCATION Card */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200 space-y-3">
              <div className="flex items-center gap-2 text-[#16a34a] text-sm font-medium">
                <CalendarClock className="h-4 w-4" />
                <span>
                  {new Date(formData.checkInTime).toLocaleString('th-TH', { 
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#16a34a] font-bold text-sm">
                <MapPin className="h-4 w-4" />
                ข้อมูลการเข้าพบ
              </div>

              {/* Info Cards (READ ONLY ALWAYS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 1. ประเภทกิจกรรม */}
                <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 flex flex-col justify-center">
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">ประเภทกิจกรรม</div>
                  <div className={cn("text-xs font-bold truncate", formData.visitType ? "text-[#16a34a]" : "text-gray-400 font-normal")}>
                    {formData.visitType ? t(`activity_types.${formData.visitType}`) : 'รอการเลือกกิจกรรม...'}
                  </div>
                </div>

                {/* 2. ลูกค้า */}
                <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 flex flex-col justify-center">
                  <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">ลูกค้า</div>
                  <div className={cn("text-xs font-bold truncate", formData.customer ? "text-gray-900" : "text-gray-400 font-normal")}>
                    {formData.customer || 'รอการเลือกกิจกรรม...'}
                  </div>
                </div>
                
                {/* 3. สถานที่และสาขา */}
                <div className="sm:col-span-2">
                  <div className="bg-gray-50 rounded-xl p-2.5 border border-gray-100 flex flex-col justify-center">
                    <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide mb-0.5">สถานที่/ไซด์งาน</div>
                    <div className={cn("text-xs font-bold truncate", (formData.location || formData.siteBranch) ? "text-gray-900" : "text-gray-400 font-normal")}>
                      {[formData.location, formData.siteBranch].filter(Boolean).join(" - ") || 'รอการเลือกกิจกรรม...'}
                    </div>
                  </div>
                </div>

              </div>

              <div className="border-t border-gray-100 my-2"></div>

              {/* Location Input with GPS Button (สำหรับพิกัด) */}
              <div className="space-y-1.5">
                 <label className="text-xs font-bold text-gray-700">พิกัดเช็คอิน (GPS) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="กำลังค้นหาพิกัดปัจจุบัน..."
                    value={formData.gpsLatitude ? `${formData.gpsLatitude}, ${formData.gpsLongitude}` : ''}
                    readOnly
                    className="border-2 border-gray-200 focus:border-[#16a34a] h-12 text-sm pl-3 pr-14 rounded-xl bg-gray-50 text-gray-600"
                    required
                  />
                  <Button
                    type="button"
                    onClick={handleCaptureGPS}
                    disabled={capturingGPS}
                    className="absolute right-1 top-1 h-10 w-10 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-lg shadow-md flex-shrink-0 p-0"
                  >
                    <Navigation className={cn("h-4 w-4", capturingGPS && "animate-spin")} />
                  </Button>
                </div>
              </div>

              {/* Time Display */}
              <div className="flex items-center gap-2 text-[#16a34a] text-sm font-medium">
                <CalendarClock className="h-4 w-4" />
                <span>
                  {new Date(formData.checkInTime).toLocaleString('th-TH', { 
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {/* Photo Upload */}
              <div>
                <div className="flex items-center gap-2 text-[#16a34a] text-sm font-medium mb-2">
                  <Camera className="h-4 w-4" />
                  รูปภาพประกอบ (สถานที่หรือนามบัตร)
                </div>
                
                {!formData.photoPreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-white cursor-pointer hover:border-[#16a34a] hover:bg-[#f0fdf4] transition-colors">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label htmlFor="photo" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center border-2 border-[#16a34a]">
                        <Camera className="h-5 w-5 text-[#16a34a]" />
                      </div>
                      <p className="text-xs font-bold text-[#16a34a]">อัพโหลดรูปภาพ</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                    <img src={formData.photoPreview} alt="Preview" className="w-full h-32 object-cover" />
                    <button 
                      type="button" 
                      onClick={handleRemovePhoto} 
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white h-8 w-8 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="relative bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-sm h-48 sm:h-64">
              <div className="absolute inset-0 bg-[#e5e3df]">
                <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                  {/* Parks/Green Areas */}
                  <rect x="20" y="30" width="80" height="60" fill="#c8e6c9" opacity="0.8" />
                  <rect x="280" y="180" width="100" height="90" fill="#c8e6c9" opacity="0.8" />
                  
                  {/* Buildings */}
                  <rect x="30" y="120" width="40" height="50" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="1" />
                  <rect x="80" y="130" width="35" height="40" fill="#eeeeee" stroke="#bdbdbd" strokeWidth="1" />
                  
                  {/* Main Roads - Yellow */}
                  <rect x="0" y="145" width="400" height="12" fill="#fef7e0" stroke="#f9d71c" strokeWidth="1" />
                  <rect x="195" y="0" width="10" height="300" fill="#fef7e0" stroke="#f9d71c" strokeWidth="1" />
                  
                  {/* Road Lines */}
                  <line x1="0" y1="151" x2="400" y2="151" stroke="#ffffff" strokeWidth="1" strokeDasharray="8,6" opacity="0.8" />
                  
                  {/* Water/River */}
                  <path d="M 0 250 Q 100 245 200 250 T 400 250 L 400 270 Q 300 265 200 270 T 0 270 Z" fill="#b3e5fc" opacity="0.6" />
                </svg>
              </div>

              {/* Pin - Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <div className="h-10 w-10 bg-gradient-to-br from-[#16a34a] to-[#15803d] rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-gray-200 px-4 py-4 bg-white flex-shrink-0 flex gap-3 rounded-b-none sm:rounded-b-3xl pb-8 sm:pb-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full h-12 sm:h-14 text-sm sm:text-base font-bold"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isStandAloneMode && !formData.linkedActivityId} // บังคับให้ต้องเลือกกิจกรรมก่อนถึงจะกดเซฟได้
            className="flex-1 bg-gradient-to-r from-[#16a34a] to-[#15803d] hover:from-[#15803d] hover:to-[#14532d] text-white rounded-full h-12 sm:h-14 text-sm sm:text-base font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            เช็คอินทันที
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}