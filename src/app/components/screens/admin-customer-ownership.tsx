import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Search,
  Download,
  Edit2,
  UserPlus,
  Building2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

interface IndustryOwnership {
  industry: string;
  bu: string;
  primaryOwner: string;
  primaryOwnerEmail: string;
  primaryOwnerInitials: string;
  secondaryOwner?: string;
  secondaryOwnerEmail?: string;
  secondaryOwnerInitials?: string;
}

interface CustomerOwnershipData {
  id: string;
  companyName: string;
  companyNameEn: string;
  status: "Active" | "Inactive";
  createdDate: string;
  industries: IndustryOwnership[];
}

interface AdminCustomerOwnershipProps {
  onCustomerClick?: (customerId: string) => void;
  onNavigate?: (path: string) => void;
}

export function AdminCustomerOwnership({ 
  onCustomerClick,
  onNavigate 
}: AdminCustomerOwnershipProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBU, setFilterBU] = useState("all");
  const [filterOwner, setFilterOwner] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Available owners for dropdown
  const availableOwners = [
    { name: "สมชาย วงศ์สกุล", email: "somchai.wong@onelink.co.th", initials: "สว" },
    { name: "อนุชา ศรีสวัสดิ์", email: "anucha.sriswat@onelink.co.th", initials: "อศ" },
    { name: "วิภาวี จันทร์เจริญ", email: "wipa.sriswat@onelink.co.th", initials: "วศ" },
    { name: "ธนพล รัตนพงษ์", email: "thanakrit.wong@onelink.co.th", initials: "ธว" },
    { name: "สมบัติ จินดาพล", email: "sombat.jindapol@onelink.co.th", initials: "สจ" },
    { name: "วีระศักดิ์ โชติ", email: "weerasak.chot@onelink.co.th", initials: "วช" },
    { name: "ปิยนุช สุวรรณ", email: "piyanuch.suwan@onelink.co.th", initials: "ปส" },
    { name: "อภิญญา วงศ์", email: "apinya.wong@onelink.co.th", initials: "อว" },
  ];

  // Mock customer ownership data - ลูกค้า 1 เจ้า มีหลายอุตสาหกรรม
  const customers: CustomerOwnershipData[] = [
    {
      id: "CUST-001",
      companyName: "องค์การเภสัชกรรม",
      companyNameEn: "Government Pharmaceutical Organization",
      status: "Active",
      createdDate: "2024-03-20",
      industries: [
        {
          industry: "Freight Forwarding",
          bu: "Healthcare & Pharmaceutical",
          primaryOwner: "สมชาย วงศ์สกุล",
          primaryOwnerEmail: "somchai.wong@onelink.co.th",
          primaryOwnerInitials: "สว",
          secondaryOwner: "อนุชา ศรีสวัสดิ์",
          secondaryOwnerEmail: "anucha.sriswat@onelink.co.th",
          secondaryOwnerInitials: "อศ",
        },
        {
          industry: "Customs Brokerage",
          bu: "B2B2C",
          primaryOwner: "วิภาวี จันทร์เจริญ",
          primaryOwnerEmail: "wipa.sriswat@onelink.co.th",
          primaryOwnerInitials: "วศ",
        },
      ],
    },
    {
      id: "CUST-002",
      companyName: "สภากาชาดไทย",
      companyNameEn: "Thai Red Cross Society",
      status: "Active",
      createdDate: "2024-03-20",
      industries: [
        {
          industry: "Value Added Services",
          bu: "Healthcare & Pharmaceutical",
          primaryOwner: "สุรศักดิ์ วงศ์ชัย",
          primaryOwnerEmail: "surasak.wong@onelink.co.th",
          primaryOwnerInitials: "สว",
        },
      ],
    },
    {
      id: "CUST-003",
      companyName: "สถาบันวิจัยจุฬาภรณ์",
      companyNameEn: "Chulabhorn Research Institute",
      status: "Active",
      createdDate: "2024-03-20",
      industries: [
        {
          industry: "Warehousing",
          bu: "Healthcare & Pharmaceutical",
          primaryOwner: "สมศักดิ์ เจริญ",
          primaryOwnerEmail: "somsak.charoen@onelink.co.th",
          primaryOwnerInitials: "สจ",
        },
      ],
    },
    {
      id: "CUST-004",
      companyName: "บริษัท ไทยยูเนี่ยน โฟรเซ่น โปรดักส์ จำกัด (มหาชน)",
      companyNameEn: "Thai Union Frozen Products PCL",
      status: "Active",
      createdDate: "2024-03-24",
      industries: [
        {
          industry: "Freight Forwarding",
          bu: "Freight",
          primaryOwner: "สมบัติ จินดาพล",
          primaryOwnerEmail: "sombat.jindapol@onelink.co.th",
          primaryOwnerInitials: "สจ",
        },
        {
          industry: "Warehousing (Cold Chain)",
          bu: "Cold Chain",
          primaryOwner: "วีระศักดิ์ โชติ",
          primaryOwnerEmail: "weerasak.chot@onelink.co.th",
          primaryOwnerInitials: "วช",
          secondaryOwner: "ธนพล รัตนพงษ์",
          secondaryOwnerEmail: "thanakrit.wong@onelink.co.th",
          secondaryOwnerInitials: "ธว",
        },
        {
          industry: "Transportation",
          bu: "Commercial",
          primaryOwner: "ธนพล รัตนพงษ์",
          primaryOwnerEmail: "thanakrit.wong@onelink.co.th",
          primaryOwnerInitials: "ธว",
        },
      ],
    },
    {
      id: "CUST-005",
      companyName: "บริษัท เนสท์เล่ (ไทย) จำกัด",
      companyNameEn: "Nestle (Thai) Ltd.",
      status: "Active",
      createdDate: "2024-03-23",
      industries: [
        {
          industry: "Customs Brokerage",
          bu: "Commercial",
          primaryOwner: "วิภาวี ศรีสวัสดิ์",
          primaryOwnerEmail: "wipa.sriswat@onelink.co.th",
          primaryOwnerInitials: "วศ",
        },
        {
          industry: "Warehousing",
          bu: "Commercial",
          primaryOwner: "ปิยนุช สุวรรณ",
          primaryOwnerEmail: "piyanuch.suwan@onelink.co.th",
          primaryOwnerInitials: "ปส",
          secondaryOwner: "วิภาวี ศรีสวัสดิ์",
          secondaryOwnerEmail: "wipa.sriswat@onelink.co.th",
          secondaryOwnerInitials: "วศ",
        },
      ],
    },
    {
      id: "CUST-006",
      companyName: "บริษัท ซีพี ออลล์ จำกัด (มหาชน)",
      companyNameEn: "CP ALL Public Company Limited",
      status: "Active",
      createdDate: "2024-03-24",
      industries: [
        {
          industry: "Freight Forwarding",
          bu: "Freight",
          primaryOwner: "ธนพล รัตนพงษ์",
          primaryOwnerEmail: "thanakrit.wong@onelink.co.th",
          primaryOwnerInitials: "ธว",
        },
        {
          industry: "Warehousing",
          bu: "Commercial",
          primaryOwner: "อภิญญา วงศ์",
          primaryOwnerEmail: "apinya.wong@onelink.co.th",
          primaryOwnerInitials: "อว",
          secondaryOwner: "สมชาย วงศ์สกุล",
          secondaryOwnerEmail: "somchai.wong@onelink.co.th",
          secondaryOwnerInitials: "สว",
        },
        {
          industry: "Transportation",
          bu: "Commercial",
          primaryOwner: "สมบัติ จินดาพล",
          primaryOwnerEmail: "sombat.jindapol@onelink.co.th",
          primaryOwnerInitials: "สจ",
        },
        {
          industry: "Cross Border",
          bu: "CLMV+China",
          primaryOwner: "วีระศักดิ์ โชติ",
          primaryOwnerEmail: "weerasak.chot@onelink.co.th",
          primaryOwnerInitials: "วช",
          secondaryOwner: "ธนพล รัตนพงษ์",
          secondaryOwnerEmail: "thanakrit.wong@onelink.co.th",
          secondaryOwnerInitials: "ธว",
        },
      ],
    },
    {
      id: "CUST-007",
      companyName: "บริษัท เซ็นทรัล รีเทล คอร์ปอเรชั่น จำกัด (มหาชน)",
      companyNameEn: "Central Retail Corporation PCL",
      status: "Active",
      createdDate: "2024-03-22",
      industries: [
        {
          industry: "Warehousing",
          bu: "Commercial",
          primaryOwner: "ปิยนุช สุวรรณ",
          primaryOwnerEmail: "piyanuch.suwan@onelink.co.th",
          primaryOwnerInitials: "ปส",
        },
        {
          industry: "Transportation",
          bu: "Commercial",
          primaryOwner: "วีระศักดิ์ โชติ",
          primaryOwnerEmail: "weerasak.chot@onelink.co.th",
          primaryOwnerInitials: "วช",
          secondaryOwner: "ปิยนุช สุวรรณ",
          secondaryOwnerEmail: "piyanuch.suwan@onelink.co.th",
          secondaryOwnerInitials: "ปส",
        },
      ],
    },
  ];

  // Get unique BUs for filter
  const uniqueBUs = useMemo(() => {
    const bus = new Set<string>();
    customers.forEach(c => c.industries.forEach(i => bus.add(i.bu)));
    return Array.from(bus);
  }, [customers]);

  const uniqueOwners = useMemo(() => {
    const owners = new Set<string>();
    customers.forEach(c => c.industries.forEach(i => {
      owners.add(i.primaryOwner);
      if (i.secondaryOwner) owners.add(i.secondaryOwner);
    }));
    return Array.from(owners);
  }, [customers]);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        searchTerm === "" ||
        customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.companyNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.industries.some(i => 
          i.primaryOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
          i.industry.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesBU =
        filterBU === "all" || customer.industries.some(i => i.bu === filterBU);
      
      const matchesOwner =
        filterOwner === "all" || customer.industries.some(i => 
          i.primaryOwner === filterOwner || i.secondaryOwner === filterOwner
        );
      
      return matchesSearch && matchesBU && matchesOwner;
    });
  }, [customers, searchTerm, filterBU, filterOwner]);

  const handleExport = () => {
    toast.success("ส่งออกข้อมูลสำเร็จ");
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id: string) => {
    toast.success("บันทึกการเปลี่ยนแปลงสำเร็จ");
    setEditingId(null);
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('th-TH', { month: 'short' });
    const year = date.getFullYear() + 543;
    const time = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    return `${day} ${month} ${year} ${time}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-4">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              เจ้าของลูกค้า
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              จัดการและดูข้อมูลผู้ดูแลลูกค้าทั้งหมด
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="h-10 px-4 border-gray-300 hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              ส่งออก
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อบริษัท, ผู้ดูแล, อุตสาหกรรม..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* BU Filter */}
          <Select value={filterBU} onValueChange={setFilterBU}>
            <SelectTrigger className="w-full sm:w-64 h-11">
              <SelectValue placeholder="Business Unit ทั้งหมด" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Business Unit ทั้งหมด</SelectItem>
              {uniqueBUs.map((bu) => (
                <SelectItem key={bu} value={bu}>{bu}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Owner Filter */}
          <Select value={filterOwner} onValueChange={setFilterOwner}>
            <SelectTrigger className="w-full sm:w-64 h-11">
              <SelectValue placeholder="ผู้ดูแลทั้งหมด" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ผู้ดูแลทั้งหมด</SelectItem>
              {uniqueOwners.map((owner) => (
                <SelectItem key={owner} value={owner}>{owner}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Customers List */}
        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <div 
              key={customer.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              {/* Customer Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleExpand(customer.id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {expandedRows.has(customer.id) ? (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                    <div>
                      <div className="text-base font-semibold text-gray-900">
                        {customer.companyName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {customer.companyNameEn}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500">
                      {customer.industries.length} อุตสาหกรรม
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      ✓ ใช้งาน
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(customer.createdDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Industries Table */}
              <div className={`${expandedRows.has(customer.id) ? 'block' : 'hidden'}`}>
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase w-1/5">
                        อุตสาหกรรม
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase w-1/5">
                        Business Unit
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase w-1/4">
                        ผู้ดูแลหลัก
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase w-1/4">
                        ผู้ดูแลรอง
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600 uppercase w-[10%]">
                        แก้ไข
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.industries.map((industry, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {industry.industry}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                            {industry.bu}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {editingId === `${customer.id}-${idx}` ? (
                            <Select defaultValue={industry.primaryOwnerEmail}>
                              <SelectTrigger className="w-full h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {availableOwners.map((owner) => (
                                  <SelectItem key={owner.email} value={owner.email}>
                                    {owner.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback className="bg-gradient-to-br from-green-400 to-green-600 text-white text-xs">
                                  {industry.primaryOwnerInitials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {industry.primaryOwner}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {industry.primaryOwnerEmail}
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {industry.secondaryOwner ? (
                            editingId === `${customer.id}-${idx}` ? (
                              <Select defaultValue={industry.secondaryOwnerEmail}>
                                <SelectTrigger className="w-full h-9">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">ไม่มี</SelectItem>
                                  {availableOwners.map((owner) => (
                                    <SelectItem key={owner.email} value={owner.email}>
                                      {owner.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-600 text-white text-xs">
                                    {industry.secondaryOwnerInitials}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {industry.secondaryOwner}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {industry.secondaryOwnerEmail}
                                  </div>
                                </div>
                              </div>
                            )
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {editingId === `${customer.id}-${idx}` ? (
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(`${customer.id}-${idx}`)}
                              className="h-7 px-3 bg-green-600 hover:bg-green-700 text-white text-xs"
                            >
                              บันทึก
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(`${customer.id}-${idx}`)}
                              className="h-7 w-7 p-0 hover:bg-gray-100"
                            >
                              <Edit2 className="h-3.5 w-3.5 text-gray-600" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500">ไม่พบข้อมูลลูกค้า</p>
          </div>
        )}

      </div>
    </div>
  );
}