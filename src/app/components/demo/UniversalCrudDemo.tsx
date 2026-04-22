import React, { useState } from 'react';
import { useModuleManager } from '../../hooks/use-module-manager';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Plus, Trash2, User, CheckCircle, AlertTriangle, Calendar, Tag, Mail, Building2 } from 'lucide-react';
import { toast } from 'sonner';

/**
 * EXAMPLE 1: Component using the hook for 'tasks' with multiple required fields
 */
export function CreateTaskDialog() {
  const { createRecord } = useModuleManager('tasks');
  const [formData, setFormData] = useState({
    title: '',
    priority: '',
    dueDate: ''
  });

  const handleAddTask = () => {
    const { title, priority, dueDate } = formData;
    
    // Validation for all required fields
    const missingFields = [];
    if (!title.trim()) missingFields.push('หัวข้อคำสั่งงาน');
    if (!priority) missingFields.push('ความสำคัญ');
    if (!dueDate) missingFields.push('วันกำหนดส่ง');

    if (missingFields.length > 0) {
      toast.error('กรุณาระบุข้อมูลให้ครบถ้วน', {
        description: `ขาดข้อมูล: ${missingFields.join(', ')}`,
        icon: <AlertTriangle className="h-4 w-4 text-red-500" />
      });
      return;
    }
    
    createRecord({ ...formData, status: 'pending' });
    setFormData({ title: '', priority: '', dueDate: '' });
    
    toast.success('สร้างคำสั่งงานสำเร็จ', {
      description: `Task "${title}" ถูกเพิ่มเข้าสู่ระบบแล้ว`,
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked')
      }
    });
  };

  return (
    <Card className="w-full border-2 border-slate-200 shadow-lg shadow-blue-900/5">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          Create New Task
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">หัวข้อคำสั่งงาน *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Next major milestone..."
            className="w-full p-2.5 border-2 border-slate-200 rounded-lg text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">ความสำคัญ *</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full p-2.5 border-2 border-slate-200 rounded-lg text-sm bg-white focus:border-blue-500"
            >
              <option value="">เลือกความสำคัญ</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">กำหนดส่ง *</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full pl-10 pr-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleAddTask} className="w-full bg-blue-600 hover:bg-blue-700 h-11">
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * EXAMPLE 2: Component for creating a Customer with validation
 */
export function CreateCustomerDialog() {
  const { createRecord } = useModuleManager('customers');
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    email: ''
  });

  const handleAddCustomer = () => {
    const { name, industry, email } = formData;
    
    // Multiple Required Fields Validation
    const errors = [];
    if (!name.trim()) errors.push('ชื่อบริษัท');
    if (!industry) errors.push('อุตสาหกรรม');
    if (!email.trim() || !email.includes('@')) errors.push('อีเมลที่ถูกต้อง');

    if (errors.length > 0) {
      toast.error('ข้อมูลลูกค้าไม่สมบูรณ์', {
        description: `กรุณากรอก: ${errors.join(', ')}`,
        className: 'bg-red-50 border-red-200'
      });
      return;
    }
    
    createRecord(formData);
    setFormData({ name: '', industry: '', email: '' });
    
    toast.success('ข้อมูุลลูกค้าถูกบันทึกแล้ว', {
      description: `บริษัท "${name}" ได้รับการเพิ่มเข้าระบบ`,
      duration: 3000
    });
  };

  return (
    <Card className="w-full border-2 border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="w-5 h-5 text-purple-600" />
          Quick Customer Entry
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">ชื่อบริษัท *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Company Name"
            className="w-full p-2.5 border-2 border-slate-200 rounded-lg text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">อุตสาหกรรม *</label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              className="w-full p-2.5 border-2 border-slate-200 rounded-lg text-sm bg-white"
            >
              <option value="">เลือกกลุ่ม...</option>
              <option value="Tech">Technology</option>
              <option value="Logistics">Logistics</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">อีเมลติดต่อ *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="contact@company.com"
                className="w-full pl-10 pr-3 py-2.5 border-2 border-slate-200 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>
        <Button onClick={handleAddCustomer} className="w-full bg-purple-600 hover:bg-purple-700 h-11">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * LIST COMPONENT: Dashboard View
 */
export function ModuleList({ moduleName, title, icon: Icon, colorClass }: any) {
  const { records, deleteRecord, count } = useModuleManager(moduleName);

  const handleDelete = (id: string, name: string) => {
    deleteRecord(id);
    toast.message('ลบสำเร็จ', {
      description: `ข้อมูลจาก ${title} ถูกลบแล้ว`,
    });
  };

  return (
    <Card className="border-2 border-slate-200 shadow-sm flex flex-col h-full">
      <CardHeader className="bg-slate-50 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Icon className={`w-5 h-5 ${colorClass}`} />
            {title} List
          </CardTitle>
          <span className="text-[10px] font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
            {count} Items
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto max-h-[400px]">
        {records.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {records.map((record) => (
              <div key={record.id} className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate text-sm">
                    {record.title || record.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    {record.priority && (
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        record.priority === 'high' ? 'bg-red-100 text-red-700' :
                        record.priority === 'medium' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {record.priority}
                      </span>
                    )}
                    {record.industry && <span className="text-[10px] text-slate-500 flex items-center gap-1"><Tag className="w-3 h-3" /> {record.industry}</span>}
                    {record.dueDate && <span className="text-[10px] text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {record.dueDate}</span>}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-slate-300 hover:text-red-500"
                  onClick={() => handleDelete(record.id, record.title || record.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-slate-400">
            <Tag className="w-8 h-8 opacity-20 mb-2" />
            <p className="text-xs italic">No data records available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * MAIN DEMO PAGE
 */
export default function UniversalCrudDemo() {
  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Universal Prototype System v2
          </h1>
          <p className="text-slate-500 font-medium">
            Strict Validation & Dynamic Module Store with In-Memory State.
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section: Forms */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold border-l-4 border-blue-600 pl-4 text-slate-900 group">
              Data Entry Forms 
              <span className="text-xs font-normal text-slate-400 ml-2">(Validation Required)</span>
            </h2>
            <div className="space-y-6">
              <CreateTaskDialog />
              <CreateCustomerDialog />
            </div>
          </div>

          {/* Section: Real-time Lists */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold border-l-4 border-purple-600 pl-4 text-slate-900">
              Live Data Reflection
              <span className="text-xs font-normal text-slate-400 ml-2">(Optimistic Sync)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <ModuleList title="Tasks" moduleName="tasks" icon={CheckCircle} colorClass="text-blue-600" />
              <ModuleList title="Customer" moduleName="customers" icon={Building2} colorClass="text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
