import { AdminMasterScreen } from "./admin-master-screen";
import { Badge } from "../ui/badge";
import { Package } from "lucide-react";

export function AdminProductsScreen() {
  const mockProducts = [
    { id: "1", name: "Air Freight", description: "International air cargo", category: "Logistics", price: "Variable", isActive: true },
    { id: "2", name: "Sea Freight", description: "Ocean cargo shipping", category: "Logistics", price: "Variable", isActive: true },
    { id: "3", name: "Express Delivery", description: "Same-day delivery service", category: "Courier", price: "฿500-2000", isActive: true },
    { id: "4", name: "Warehousing", description: "Storage solutions", category: "Storage", price: "฿1000/month", isActive: true },
    { id: "5", name: "Cold Chain", description: "Temperature-controlled logistics", category: "Specialized", price: "Variable", isActive: true },
    { id: "6", name: "Custom Clearance", description: "Import/export documentation", category: "Services", price: "฿3000-5000", isActive: true },
    { id: "7", name: "Insurance", description: "Cargo insurance", category: "Services", price: "0.5-2%", isActive: false },
  ];

  const columns = [
    {
      key: "name",
      label: "Product / Service",
      render: (item: any) => (
        <div className="flex items-start gap-2">
          <Package className="h-4 w-4 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (item: any) => (
        <Badge className="bg-indigo-100 text-indigo-700 border-0">{item.category}</Badge>
      ),
    },
    {
      key: "price",
      label: "Pricing",
      render: (item: any) => <p className="text-sm text-foreground">{item.price}</p>,
    },
  ];

  return (
    <AdminMasterScreen
      title="Products & Services"
      subtitle="Manage products, services, and pricing"
      items={mockProducts}
      columns={columns}
      onAdd={() => console.log("Add product")}
      onEdit={(id) => console.log("Edit product", id)}
      onDelete={(id) => console.log("Delete product", id)}
    />
  );
}
