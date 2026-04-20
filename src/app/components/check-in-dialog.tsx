import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  MapPin,
  Clock,
  User,
  Image,
  FileText,
  CheckCircle,
  Camera,
  Navigation,
  Phone,
  Mail,
  X,
  CalendarClock,
  MapPinned,
  Building2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface CheckInDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobCard?: {
    id: string;
    service: string;
    customer: string;
    location?: string;
    contactPerson?: string;
    contactPhone?: string;
    contactEmail?: string;
    activityType?: string;
  };
  task?: {
    id: string;
    service: string;
    customer: string;
    location?: string;
    contactPerson?: string;
    contactPhone?: string;
    contactEmail?: string;
    activityType?: string;
  };
}

export function CheckInDialog({ isOpen, onClose, jobCard, task }: CheckInDialogProps) {
  const { t } = useTranslation();
  const item = jobCard || task;
  
  const [formData, setFormData] = useState({
    checkInTime: new Date().toISOString().slice(0, 16),
    location: "",
    gpsLatitude: "",
    gpsLongitude: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    activityStatus: "in_progress",
    notes: "",
    followUpRequired: false,
    followUpDate: "",
    photo: null as File | null,
    photoPreview: "" as string,
  });

  const [capturingGPS, setCapturingGPS] = useState(false);

  // Auto-fill form data when dialog opens or item changes
  useEffect(() => {
    if (isOpen && item) {
      setFormData(prev => ({
        ...prev,
        location: item.location || "",
        contactPerson: item.contactPerson || "",
        contactPhone: item.contactPhone || "",
        contactEmail: item.contactEmail || "",
      }));

      // Auto-capture GPS when dialog opens
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
            // Fall back to simulated GPS if real GPS fails
            setFormData(prev => ({
              ...prev,
              gpsLatitude: "13.7563",
              gpsLongitude: "100.5018",
            }));
          }
        );
      }
    }
  }, [isOpen, item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle check-in submission
    console.log("Check-in data:", formData);
    onClose();
    // Reset form
    setFormData({
      checkInTime: new Date().toISOString().slice(0, 16),
      location: "",
      gpsLatitude: "",
      gpsLongitude: "",
      contactPerson: "",
      contactPhone: "",
      contactEmail: "",
      activityStatus: "in_progress",
      notes: "",
      followUpRequired: false,
      followUpDate: "",
      photo: null,
      photoPreview: "",
    });
  };

  const handleCaptureGPS = () => {
    setCapturingGPS(true);
    // Simulate GPS capture
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

  const activityStatuses = [
    { value: "in_progress", label: t('checkin.status_in_progress') },
    { value: "completed", label: t('checkin.status_completed') },
    { value: "pending", label: t('checkin.status_pending') },
    { value: "follow_up_required", label: t('checkin.status_follow_up_required') },
  ];

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[100vh] flex flex-col bg-white p-0 gap-0 rounded-none sm:rounded-3xl">
        {/* Header - Purple */}
        <DialogHeader className="bg-gradient-to-r from-[#00BC7D] to-[#16a34a] px-4 py-4 flex-shrink-0 relative rounded-t-3xl sm:rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="h-6 w-6 text-[#00BC7D]" />
              </div>
              <div>
                <DialogTitle className="text-lg text-white font-bold">
                  {t('checkin.title')}
                </DialogTitle>
                <DialogDescription className="text-xs text-white/90">
                  {t('checkin.subtitle')}
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
            {/* 3 Info Cards - Horizontal */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#ede9fe] rounded-xl p-2.5 text-center">
                <div className="text-[10px] text-[#7c3aed] font-semibold uppercase tracking-wide mb-1">
                  {t('checkin.task_id')}
                </div>
                <div className="text-xs font-bold text-[#5b21b6]">{item.id}</div>
              </div>
              <div className="bg-[#ede9fe] rounded-xl p-2.5 text-center">
                <div className="text-[10px] text-[#7c3aed] font-semibold uppercase tracking-wide mb-1">
                  {t('checkin.customer')}
                </div>
                <div className="text-xs font-bold text-[#5b21b6] truncate">{item.customer}</div>
              </div>
              <div className="bg-[#ede9fe] rounded-xl p-2.5 text-center">
                <div className="text-[10px] text-[#7c3aed] font-semibold uppercase tracking-wide mb-1">
                  {t('checkin.service')}
                </div>
                <div className="text-xs font-bold text-[#5b21b6] truncate">{item.service}</div>
              </div>
            </div>

            {/* CHECK-IN LOCATION Card */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200 space-y-3">
              {/* Header */}
              <div className="flex items-center gap-2 text-[#16a34a] font-bold text-sm">
                <MapPin className="h-4 w-4" />
                {t('checkin.location_header')}
              </div>

              {/* Location Input with GPS Button */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t('checkin.location_placeholder')}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="border-2 border-gray-200 focus:border-[#16a34a] h-12 text-sm pl-3 pr-14 rounded-xl bg-white"
                  required
                />
                <Button
                  type="button"
                  onClick={handleCaptureGPS}
                  disabled={capturingGPS}
                  className="absolute right-1 top-1 h-10 w-10 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-lg shadow-md flex-shrink-0 p-0"
                >
                  <Navigation className="h-4 w-4" />
                </Button>
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

              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 text-[#16a34a] text-sm font-medium mb-2">
                  <FileText className="h-4 w-4" />
                  {t('checkin.additional_notes')}
                </div>
                <Textarea
                  placeholder={t('checkin.notes_placeholder')}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="border-2 border-gray-200 focus:border-[#16a34a] resize-none text-sm rounded-xl p-3 bg-white"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <div className="flex items-center gap-2 text-[#16a34a] text-sm font-medium mb-2">
                  <Camera className="h-4 w-4" />
                  {t('checkin.photos')}
                </div>
                
                {!formData.photoPreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white cursor-pointer hover:border-[#7c3aed] hover:bg-[#faf5ff] transition-colors">
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <label htmlFor="photo" className="cursor-pointer flex flex-col items-center gap-2">
                      <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center border-2 border-[#7c3aed]">
                        <Camera className="h-6 w-6 text-[#7c3aed]" />
                      </div>
                      <p className="text-sm font-bold text-[#7c3aed]">{t('checkin.upload_photo')}</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
                    <img src={formData.photoPreview} alt="Preview" className="w-full h-40 object-cover" />
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
            <div className="relative bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 shadow-sm h-80">
              <div className="absolute inset-0 bg-[#e5e3df]">
                <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                  {/* Parks/Green Areas */}
                  <rect x="20" y="30" width="80" height="60" fill="#c8e6c9" opacity="0.8" />
                  <rect x="280" y="180" width="100" height="90" fill="#c8e6c9" opacity="0.8" />
                  <rect x="150" y="220" width="60" height="70" fill="#c8e6c9" opacity="0.7" />
                  
                  {/* Buildings */}
                  <rect x="30" y="120" width="40" height="50" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="1" />
                  <rect x="80" y="130" width="35" height="40" fill="#eeeeee" stroke="#bdbdbd" strokeWidth="1" />
                  <rect x="250" y="40" width="50" height="60" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="1" />
                  <rect x="310" y="50" width="40" height="45" fill="#eeeeee" stroke="#bdbdbd" strokeWidth="1" />
                  <rect x="180" y="80" width="45" height="55" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="1" />
                  <rect x="320" y="120" width="50" height="50" fill="#eeeeee" stroke="#bdbdbd" strokeWidth="1" />
                  
                  {/* Main Roads - Yellow */}
                  <rect x="0" y="145" width="400" height="12" fill="#fef7e0" stroke="#f9d71c" strokeWidth="1" />
                  <rect x="195" y="0" width="10" height="300" fill="#fef7e0" stroke="#f9d71c" strokeWidth="1" />
                  
                  {/* Secondary Roads - White */}
                  <rect x="120" y="0" width="6" height="300" fill="#ffffff" />
                  <rect x="0" y="90" width="400" height="6" fill="#ffffff" />
                  <rect x="0" y="210" width="400" height="6" fill="#ffffff" />
                  <rect x="290" y="0" width="6" height="300" fill="#ffffff" />
                  
                  {/* Road Lines */}
                  <line x1="0" y1="151" x2="400" y2="151" stroke="#ffffff" strokeWidth="1" strokeDasharray="8,6" opacity="0.8" />
                  <line x1="200" y1="0" x2="200" y2="300" stroke="#ffffff" strokeWidth="1" strokeDasharray="8,6" opacity="0.8" />
                  
                  {/* Small Details */}
                  <circle cx="80" cy="60" r="8" fill="#81c784" opacity="0.6" />
                  <circle cx="60" cy="50" r="6" fill="#81c784" opacity="0.6" />
                  <circle cx="50" cy="70" r="7" fill="#81c784" opacity="0.6" />
                  <circle cx="320" cy="220" r="10" fill="#81c784" opacity="0.6" />
                  <circle cx="300" cy="240" r="8" fill="#81c784" opacity="0.6" />
                  
                  {/* Water/River */}
                  <path d="M 0 250 Q 100 245 200 250 T 400 250 L 400 270 Q 300 265 200 270 T 0 270 Z" fill="#b3e5fc" opacity="0.6" />
                </svg>
              </div>

              {/* Radius Circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-[#16a34a]/10"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-[#16a34a]/15"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-[#16a34a]/20"></div>
              </div>

              {/* Pin - Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="relative">
                  <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <div className="h-14 w-14 bg-gradient-to-br from-[#16a34a] to-[#15803d] rounded-full flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 50m Badge - Top Right */}
              <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1.5 shadow-lg border-2 border-gray-200">
                <p className="text-xs font-bold text-[#16a34a]">50m</p>
              </div>

              {/* Zoom Out Button - Bottom Right */}
              <button 
                type="button" 
                className="absolute bottom-4 right-4 h-11 w-11 bg-white hover:bg-gray-50 rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 transition-all hover:scale-110"
              >
                <span className="text-xl font-bold text-gray-700">−</span>
              </button>

              {/* Google Badge - Bottom Left */}
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-lg shadow-sm text-[11px] font-semibold text-gray-600">
                Google
              </div>
            </div>
          </form>
        </div>

        {/* Footer Buttons */}
        <div className="border-t border-gray-200 px-4 py-4 bg-white flex-shrink-0 flex gap-3 rounded-b-3xl sm:rounded-b-3xl">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full h-14 text-base font-bold"
          >
            {t('checkin.cancel')}
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-[#16a34a] to-[#15803d] hover:from-[#15803d] hover:to-[#14532d] text-white rounded-full h-14 text-base font-bold shadow-lg"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            {t('checkin.checkin_now')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}