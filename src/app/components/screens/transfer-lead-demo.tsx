import { useState } from "react";
import { TransferLeadModal } from "../transfer-lead-modal";
import { Button } from "../ui/button";
import { ArrowRightLeft } from "lucide-react";

export function TransferLeadDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-8" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="text-center space-y-8 max-w-2xl">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full mb-2">
            Enterprise SaaS CRM
          </div>
          <h1 className="text-5xl font-bold text-slate-800 tracking-tight">
            Transfer Lead Modal
          </h1>
          <p className="text-xl text-slate-600 max-w-lg mx-auto">
            Modern, professional modal dialog for lead transfer with clean enterprise design
          </p>
        </div>

        {/* Demo Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl border border-slate-200 max-w-lg mx-auto">
          <div className="space-y-4 mb-8">
            <div className="text-left">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Current Lead Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Lead Name</div>
                <div className="text-sm font-bold text-slate-900">Global Traders Ltd.</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Lead ID</div>
                <div className="text-sm font-mono font-bold text-slate-900">LEAD-001</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="text-xs font-semibold text-blue-600 uppercase mb-1">Owner</div>
                <div className="text-sm font-bold text-blue-900">Sarah Chen</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="text-xs font-semibold text-green-600 uppercase mb-1">Business Unit</div>
                <div className="text-sm font-bold text-green-900">การขนส่งสินค้า</div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-base"
          >
            <ArrowRightLeft className="h-5 w-5" />
            เปิด Transfer Lead Modal
          </Button>
        </div>

        {/* Design Specs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
          <h4 className="text-sm font-bold text-slate-700 mb-3">Design System</h4>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow"></div>
              <span className="font-medium text-slate-700">Primary: Blue-600</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-white shadow"></div>
              <span className="font-medium text-slate-700">Text: Slate-800</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow"></div>
              <span className="font-medium text-slate-700">Success: Green-500</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-slate-500 border-2 border-white shadow"></div>
              <span className="font-medium text-slate-700">Secondary: Slate-500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer Lead Modal */}
      <TransferLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leadName="Global Traders Ltd."
        leadId="LEAD-001"
        currentOwner="Sarah Chen"
        currentBU="การขนส่งสินค้า"
      />
    </div>
  );
}
