import { Plus, X } from "lucide-react";

interface FloatingAddContactModalProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  newContactName: string;
  setNewContactName: (value: string) => void;
  newContactPosition: string;
  setNewContactPosition: (value: string) => void;
  newContactEmail: string;
  setNewContactEmail: (value: string) => void;
  newContactPhone: string;
  setNewContactPhone: (value: string) => void;
  newContactAddresses: string[];
  setNewContactAddresses: (value: string[]) => void;
  currentAddress: string;
  setCurrentAddress: (value: string) => void;
}

export function FloatingAddContactModal({
  show,
  onClose,
  onSave,
  newContactName,
  setNewContactName,
  newContactPosition,
  setNewContactPosition,
  newContactEmail,
  setNewContactEmail,
  newContactPhone,
  setNewContactPhone,
  newContactAddresses,
  setNewContactAddresses,
  currentAddress,
  setCurrentAddress,
}: FloatingAddContactModalProps) {
  if (!show) return null;

  return (
    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-base font-semibold text-purple-600 flex items-center gap-2">
            <span>👤</span>
            Add Contact
          </h2>
          <div className="w-5"></div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs text-gray-500 mb-4">
            เพิ่มผู้ติดต่อใหม่ให้กับลูกค้า
          </p>

          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1.5">
                <span className="text-purple-600">👤</span>
                ชื่อ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                autoFocus
                className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="ระบุชื่อผู้ติดต่อ"
              />
            </div>

            {/* Position Input */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1.5">
                <span className="text-purple-600">💼</span>
                ตำแหน่ง
              </label>
              <input
                type="text"
                value={newContactPosition}
                onChange={(e) => setNewContactPosition(e.target.value)}
                className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="ระบุตำแหน่ง"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1.5">
                <span className="text-purple-600">📧</span>
                อีเมล
              </label>
              <input
                type="email"
                value={newContactEmail}
                onChange={(e) => setNewContactEmail(e.target.value)}
                className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="example@email.com"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1.5">
                <span className="text-purple-600">📞</span>
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                value={newContactPhone}
                onChange={(e) => setNewContactPhone(e.target.value)}
                className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="+66 XX XXX XXXX"
              />
            </div>

            {/* Address Input - Multiple */}
            <div>
              <label className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1.5">
                <span className="text-purple-600">📍</span>
                ที่อยู่
              </label>
              
              {/* Existing Addresses */}
              {newContactAddresses.length > 0 && (
                <div className="space-y-2 mb-2">
                  {newContactAddresses.map((address, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="flex-1 text-xs text-gray-700">{address}</p>
                      <button
                        onClick={() => setNewContactAddresses(newContactAddresses.filter((_, i) => i !== index))}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* New Address Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentAddress}
                  onChange={(e) => setCurrentAddress(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && currentAddress.trim()) {
                      setNewContactAddresses([...newContactAddresses, currentAddress]);
                      setCurrentAddress("");
                    }
                  }}
                  className="flex-1 px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="ระบุที่อยู่"
                />
                <button
                  onClick={() => {
                    if (currentAddress.trim()) {
                      setNewContactAddresses([...newContactAddresses, currentAddress]);
                      setCurrentAddress("");
                    }
                  }}
                  disabled={!currentAddress.trim()}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 active:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                >
                  <Plus className="h-3 w-3" />
                  เพิ่ม
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-3">
            <button
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm"
              onClick={onClose}
            >
              ยกเลิก
            </button>
            <button
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 active:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              onClick={onSave}
              disabled={newContactName.trim() === ""}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
