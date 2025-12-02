import { useState, FormEvent } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Label } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ToolFormData) => void;
}

export interface ToolFormData {
  name: string;
  category: string;
  department: string;
  description: string;
  monthlyCost: number;
  billingCycle: string;
  renewalDate: string;
  users: number;
  status: string;
  website: string;
  contactEmail: string;
  notes: string;
}

export function AddToolModal({ isOpen, onClose, onSubmit }: AddToolModalProps) {
  const [formData, setFormData] = useState<ToolFormData>({
    name: '',
    category: '',
    department: '',
    description: '',
    monthlyCost: 0,
    billingCycle: 'monthly',
    renewalDate: '',
    users: 0,
    status: 'active',
    website: '',
    contactEmail: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Tool name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    if (formData.monthlyCost <= 0) {
      newErrors.monthlyCost = 'Monthly cost must be greater than 0';
    }
    if (formData.users <= 0) {
      newErrors.users = 'Number of users must be greater than 0';
    }
    if (!formData.renewalDate) {
      newErrors.renewalDate = 'Renewal date is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit?.(formData);
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      category: '',
      department: '',
      description: '',
      monthlyCost: 0,
      billingCycle: 'monthly',
      renewalDate: '',
      users: 0,
      status: 'active',
      website: '',
      contactEmail: '',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Tool"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={isSubmitting}>
            Add Tool
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" required>
                Tool Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Slack"
                error={errors.name}
              />
              {errors.name && (
                <p className="text-sm text-status-error">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" required>
                Category
              </Label>
              <Select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select a category</option>
                <option value="Communication">Communication</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Project Management">Project Management</option>
                <option value="Analytics">Analytics</option>
              </Select>
              {errors.category && (
                <p className="text-sm text-status-error">{errors.category}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department" required>
                Department
              </Label>
              <Select
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              >
                <option value="">Select a department</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Support">Support</option>
              </Select>
              {errors.department && (
                <p className="text-sm text-status-error">{errors.department}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" required>
                Status
              </Label>
              <Select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="expiring">Expiring Soon</option>
                <option value="unused">Unused</option>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the tool and its purpose"
              rows={3}
            />
          </div>
        </div>

        {/* Billing Information */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">Billing Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyCost" required>
                Monthly Cost (€)
              </Label>
              <Input
                id="monthlyCost"
                type="number"
                value={formData.monthlyCost || ''}
                onChange={(e) => setFormData({ ...formData, monthlyCost: Number(e.target.value) })}
                placeholder="0.00"
                error={errors.monthlyCost}
              />
              {errors.monthlyCost && (
                <p className="text-sm text-status-error">{errors.monthlyCost}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingCycle" required>
                Billing Cycle
              </Label>
              <Select
                id="billingCycle"
                value={formData.billingCycle}
                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annual">Annual</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="renewalDate" required>
                Renewal Date
              </Label>
              <Input
                id="renewalDate"
                type="date"
                value={formData.renewalDate}
                onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
                error={errors.renewalDate}
              />
              {errors.renewalDate && (
                <p className="text-sm text-status-error">{errors.renewalDate}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="users" required>
              Number of Users
            </Label>
            <Input
              id="users"
              type="number"
              value={formData.users || ''}
              onChange={(e) => setFormData({ ...formData, users: Number(e.target.value) })}
              placeholder="0"
              error={errors.users}
            />
            {errors.users && (
              <p className="text-sm text-status-error">{errors.users}</p>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="support@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or information"
              rows={3}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
