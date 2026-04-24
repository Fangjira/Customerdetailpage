import { useState } from 'react';
import { useModuleManager } from '../hooks/use-module-manager';
import { Customer } from '@/types/crm';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../components/ui/dialog';
import { Building2, Mail, Phone, Edit2, Trash2, UserPlus } from 'lucide-react';

/**
 * Example component showing how to use useModuleManager for Customers
 */
export function CustomerListExample() {
  // Use the SAME universal hook with 'customers' module
  const customers = useModuleManager<Customer>('customers');

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    status: 'prospect' as const,
  });

  const handleCreate = () => {
    if (!formData.name || !formData.email) return;

    customers.createRecord(formData);
    resetForm();
    setIsCreateOpen(false);
  };

  const handleUpdate = () => {
    if (!editingCustomer) return;

    customers.updateRecord(editingCustomer.id, formData);
    resetForm();
    setEditingCustomer(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      customers.deleteRecord(id);
    }
  };

  const openEditDialog = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || '',
      company: customer.company || '',
      industry: customer.industry || '',
      status: customer.status,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      status: 'prospect',
    });
  };

  const activeCustomers = customers.findRecords((c) => c.status === 'active');
  const prospectCustomers = customers.findRecords((c) => c.status === 'prospect');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">Customer Management</h1>
          <p className="text-gray-600">
            Total: {customers.count} | Active: {activeCustomers.length} | Prospects: {prospectCustomers.length}
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Customer List */}
      <div className="grid gap-4">
        {customers.records.map((customer) => (
          <div
            key={customer.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{customer.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    customer.status === 'active' ? 'bg-green-100 text-green-700' :
                    customer.status === 'inactive' ? 'bg-gray-100 text-gray-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {customer.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {customer.company && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 className="h-4 w-4" />
                      <span>{customer.company}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                  {customer.industry && (
                    <div className="text-gray-600">
                      <span className="font-medium">Industry:</span> {customer.industry}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(customer)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(customer.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {customers.count === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No customers yet. Click "Add Customer" to get started.</p>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateOpen || editingCustomer !== null} onOpenChange={(open) => {
        if (!open) {
          setIsCreateOpen(false);
          setEditingCustomer(null);
          resetForm();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? 'Edit Customer' : 'Create New Customer'}
            </DialogTitle>
          
          <DialogDescription className="sr-only">
            Dialog description
          </DialogDescription></DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name *</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1-555-0000"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Company</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Industry</label>
              <Input
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., Technology, Healthcare"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full border rounded-md p-2"
              >
                <option value="prospect">Prospect</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateOpen(false);
              setEditingCustomer(null);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={editingCustomer ? handleUpdate : handleCreate}>
              {editingCustomer ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
