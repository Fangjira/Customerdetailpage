import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTranslation } from "react-i18next";
import { Plus, X, Building2, Users, MapPin, DollarSign, Lock, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface Contact {
  id: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

interface Address {
  id: number;
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

interface ServiceRevenue {
  id: string;
  name: string;
  value: string | null;
  type: string | null;
}

interface EditCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: any;
  serviceRevenue?: ServiceRevenue[];
  onSaveServices?: (services: ServiceRevenue[]) => void;
}

export function EditCustomerDialog({
  isOpen,
  onClose,
  customer,
  serviceRevenue = [],
  onSaveServices,
}: EditCustomerDialogProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("company");

  // Check if customer is from DBD
  const isFromDBD = customer?.createdFrom === "dbd";

  // Company Information
  const [companyName, setCompanyName] = useState(customer?.companyName || "");
  const [taxId, setTaxId] = useState(customer?.taxId || "");
  const [industry, setIndustry] = useState(customer?.industry || "");
  const [registrationNumber, setRegistrationNumber] = useState(customer?.registrationNumber || "");
  const [businessType, setBusinessType] = useState(customer?.businessType || "");
  const [registeredCapital, setRegisteredCapital] = useState(customer?.registeredCapital || "");
  const [foundedDate, setFoundedDate] = useState(customer?.foundedDate || "");
  const [address, setAddress] = useState(customer?.address || "");
  const [province, setProvince] = useState(customer?.province || "");
  const [district, setDistrict] = useState(customer?.district || "");
  const [postalCode, setPostalCode] = useState(customer?.postalCode || "");
  const [parentCompany, setParentCompany] = useState(customer?.parentCompany || "");
  const [serviceModel, setServiceModel] = useState(customer?.serviceModel || "");
  const [salesChannel, setSalesChannel] = useState(customer?.salesChannel || "");

  // Contacts
  const [contacts, setContacts] = useState<Contact[]>(customer?.contacts || []);

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(customer?.addresses || []);

  // Service Revenue
  const [services, setServices] = useState<ServiceRevenue[]>(serviceRevenue);

  const handleSave = () => {
    console.log("Saving customer data:", {
      companyName,
      taxId,
      industry,
      parentCompany,
      serviceModel,
      salesChannel,
      contacts,
      addresses,
      services,
    });
    
    if (onSaveServices) {
      onSaveServices(services);
    }
    
    onClose();
  };

  const addContact = () => {
    const newContact: Contact = {
      id: contacts.length + 1,
      name: "",
      title: "",
      email: "",
      phone: "",
      isPrimary: contacts.length === 0,
    };
    setContacts([...contacts, newContact]);
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const updateContact = (id: number, field: keyof Contact, value: any) => {
    setContacts(
      contacts.map((c) =>
        c.id === id ? { ...c, [field]: value } : c
      )
    );
  };

  const setPrimaryContact = (id: number) => {
    setContacts(
      contacts.map((c) => ({ ...c, isPrimary: c.id === id }))
    );
  };

  const addAddress = () => {
    const newAddress: Address = {
      id: addresses.length + 1,
      type: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isPrimary: addresses.length === 0,
    };
    setAddresses([...addresses, newAddress]);
  };

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const updateAddress = (id: number, field: keyof Address, value: any) => {
    setAddresses(
      addresses.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      )
    );
  };

  const setPrimaryAddress = (id: number) => {
    setAddresses(
      addresses.map((a) => ({ ...a, isPrimary: a.id === id }))
    );
  };

  const updateService = (id: string, field: 'value' | 'type', value: string | null) => {
    setServices(
      services.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      )
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1000px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">
            แก้ไขข้อมูลลูกค้า
          </DialogTitle>
          <DialogDescription className="text-[10px] text-muted-foreground">
            {customer?.companyName || "Global Freight Solutions Inc"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="company" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-9 text-[11px]"
            >
              <Building2 className="h-3.5 w-3.5 mr-1.5" />
              ข้อมูลบริษัท
            </TabsTrigger>
            <TabsTrigger 
              value="contacts" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-9 text-[11px]"
            >
              <Users className="h-3.5 w-3.5 mr-1.5" />
              ผู้ติดต่อ ({contacts.length})
            </TabsTrigger>
            <TabsTrigger 
              value="addresses" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-9 text-[11px]"
            >
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              ที่อยู่ ({addresses.length})
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-9 text-[11px]"
            >
              <DollarSign className="h-3.5 w-3.5 mr-1.5" />
              ยอดขาย Service
            </TabsTrigger>
          </TabsList>

          {/* Company Information Tab */}
          <TabsContent value="company" className="flex-1 overflow-y-auto mt-4 px-1">
            <div className="max-w-3xl space-y-4">
              {isFromDBD && (
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-xs text-blue-800">
                    ข้อมูลบางส่วนมาจาก DBD (กรมพัฒนาธุรกิจการค้า) และไม่สามารถแก้ไขได้
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    ชื่อบริษัท *
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกชื่อบริษัท"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    เลขประจำตัวผู้เสียภาษี *
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกเลขประจำตัวผู้เสียภาษี"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    เลขทะเบียนนิติบุคคล
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกเลขทะเบียนนิติบุคคล"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    ประเภทธุรกิจ
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกประเภทธุรกิจ"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    อุตสาหกรรม
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกอุตสาหกรรม"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    ทุนจดทะเบียน
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={registeredCapital}
                    onChange={(e) => setRegisteredCapital(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกทุนจดทะเบียน"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    วันที่ก่อตั้ง
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={foundedDate}
                    onChange={(e) => setFoundedDate(e.target.value)}
                    disabled={isFromDBD}
                    type="date"
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="col-span-2 space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    ที่อยู่
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกที่อยู่"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    จังหวัด
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกจังหวัด"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    เขต/อำเภอ
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกเขต/อำเภอ"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[10px] text-muted-foreground flex items-center gap-1">
                    รหัสไปรษณีย์
                    {isFromDBD && <Lock className="h-3 w-3 text-gray-400" />}
                  </Label>
                  <Input
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    disabled={isFromDBD}
                    className="h-8 text-[11px] disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="กรอกรหัสไปรษณีย์"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="flex-1 overflow-y-auto mt-4 px-1">
            <div className="max-w-4xl">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs text-gray-700">จัดการผู้ติดต่อกับผู้แทนของลูกค้า</p>
                <Button
                  size="sm"
                  onClick={addContact}
                  className="h-8 text-xs px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  เพิ่มผู้ติดต่อ
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border border-gray-200 rounded-lg p-2.5 bg-white relative shadow-sm">
                    <button
                      onClick={() => removeContact(contact.id)}
                      className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                    >
                      <X className="h-3.5 w-3.5 text-red-600" />
                    </button>
                    
                    <div className="space-y-2 pr-7">
                      {/* Name */}
                      <div className="space-y-0.5">
                        <Label className="text-[10px] text-gray-500">ชื่อ-นามสกุล</Label>
                        <Input
                          value={contact.name}
                          onChange={(e) => updateContact(contact.id, 'name', e.target.value)}
                          className="h-7 text-xs border-gray-300"
                          placeholder="มท.สมชาย วงศ์ไกษร"
                        />
                      </div>

                      {/* Title */}
                      <div className="space-y-0.5">
                        <Label className="text-[10px] text-gray-500">ตำแหน่ง</Label>
                        <Input
                          value={contact.title}
                          onChange={(e) => updateContact(contact.id, 'title', e.target.value)}
                          className="h-7 text-xs border-gray-300"
                          placeholder="CEO"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-0.5">
                        <Label className="text-[10px] text-gray-500">อีเมล</Label>
                        <Input
                          type="email"
                          value={contact.email}
                          onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                          className="h-7 text-xs border-gray-300"
                          placeholder="somchai.w@g.or.th"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-0.5">
                        <Label className="text-[10px] text-gray-500">โทรศัพท์</Label>
                        <Input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                          className="h-7 text-xs border-gray-300"
                          placeholder="02-590-1234"
                        />
                      </div>

                      {/* Primary Button */}
                      <div className="pt-0.5">
                        <Button
                          size="sm"
                          onClick={() => setPrimaryContact(contact.id)}
                          className={`h-6 text-[10px] px-2 w-full rounded-md ${
                            contact.isPrimary
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          {contact.isPrimary ? 'Primary' : 'Secondary'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {contacts.length === 0 && (
                  <div className="col-span-2 text-center py-8 text-xs text-gray-500">
                    ยังไม่มีผู้ติดต่อ คลิก "เพิ่มผู้ติดต่อ" เพื่อเริ่มต้น
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="flex-1 overflow-y-auto mt-4 px-1">
            <div className="max-w-4xl">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs text-gray-700">จัดการที่อยู่ที่พักแอดของลูกค้า</p>
                <Button
                  size="sm"
                  onClick={addAddress}
                  className="h-8 text-xs px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  เพิ่มที่อยู่
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {addresses.map((address) => (
                  <div key={address.id} className="border border-gray-200 rounded-lg p-2.5 bg-white relative shadow-sm">
                    <button
                      onClick={() => removeAddress(address.id)}
                      className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                    >
                      <X className="h-3.5 w-3.5 text-red-600" />
                    </button>
                    
                    <div className="space-y-2 pr-7">
                      {/* Type & Street */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-0.5">
                          <Label className="text-[10px] text-gray-500">ประเภทที่อยู่</Label>
                          <Input
                            value={address.type}
                            onChange={(e) => updateAddress(address.id, 'type', e.target.value)}
                            className="h-7 text-xs border-gray-300"
                            placeholder="ที่อยู่"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <Label className="text-[10px] text-gray-500">ที่อยู่</Label>
                          <Input
                            value={address.street}
                            onChange={(e) => updateAddress(address.id, 'street', e.target.value)}
                            className="h-7 text-xs border-gray-300"
                            placeholder="123 Main Street"
                          />
                        </div>
                      </div>

                      {/* City & State */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-0.5">
                          <Label className="text-[10px] text-gray-500">เมือง/เมืองหลวง</Label>
                          <Input
                            value={address.city}
                            onChange={(e) => updateAddress(address.id, 'city', e.target.value)}
                            className="h-7 text-xs border-gray-300"
                            placeholder="บางอื่น"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <Label className="text-[10px] text-gray-500">รัฐ/จังหวัด</Label>
                          <Input
                            value={address.state}
                            onChange={(e) => updateAddress(address.id, 'state', e.target.value)}
                            className="h-7 text-xs border-gray-300"
                            placeholder="บางอื่น"
                          />
                        </div>
                      </div>

                      {/* Zip Code & Country */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-0.5">
                          <Label className="text-[10px] text-gray-500">รหัสไปรษณีย์</Label>
                          <Input
                            value={address.zipCode}
                            onChange={(e) => updateAddress(address.id, 'zipCode', e.target.value)}
                            className="h-7 text-xs border-gray-300"
                            placeholder="10240"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <Label className="text-[10px] text-gray-500">ประเทศ</Label>
                          <Input
                            value={address.country}
                            onChange={(e) => updateAddress(address.id, 'country', e.target.value)}
                            className="h-7 text-xs border-gray-300"
                            placeholder="Thailand"
                          />
                        </div>
                      </div>

                      {/* Primary Button */}
                      <div className="pt-0.5">
                        <Button
                          size="sm"
                          onClick={() => setPrimaryAddress(address.id)}
                          className={`h-6 text-[10px] px-2 w-full rounded-md ${
                            address.isPrimary
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                          }`}
                        >
                          {address.isPrimary ? 'Primary' : 'Secondary'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {addresses.length === 0 && (
                  <div className="col-span-2 text-center py-8 text-xs text-gray-500">
                    ยังไม่มีที่อยู่ คลิก "เพิ่มที่อยู่" เพื่อเริ่มต้น
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Service Revenue Tab */}
          <TabsContent value="services" className="flex-1 overflow-y-auto mt-4 px-1">
            <div className="max-w-4xl">
              <p className="text-[11px] text-muted-foreground mb-3">แก้ไขยอดขายและประเภทของแต่ละ Service</p>
              
              <div className="grid grid-cols-3 gap-3">
                {services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center gap-1 mb-2">
                      <Badge className="bg-gray-700 text-white text-[9px] px-1.5 py-0.5 h-4">
                        {service.id}
                      </Badge>
                      <span className="text-[10px] font-medium truncate">{service.name}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <Label className="text-[9px] text-muted-foreground">ประเภท</Label>
                        <Input
                          value={service.type || ""}
                          onChange={(e) => updateService(service.id, 'type', e.target.value || null)}
                          placeholder="ยอดขาย, Opportunity"
                          className="h-7 text-[10px]"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label className="text-[9px] text-muted-foreground">มูลค่า</Label>
                        <Input
                          value={service.value || ""}
                          onChange={(e) => updateService(service.id, 'value', e.target.value || null)}
                          placeholder="1,800,000.00"
                          className="h-7 text-[10px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t">
          <Button
            variant="outline"
            onClick={onClose}
            className="h-7 text-[10px] px-4"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-7 text-[10px] px-4"
          >
            บันทึกการเปลี่ยนแปลง
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}