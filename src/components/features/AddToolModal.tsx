import { useState, FormEvent } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Label } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

/**
 * Props for the AddToolModal component.
 * 
 * @interface AddToolModalProps
 * @property {boolean} isOpen - Controls modal visibility (controlled component pattern)
 * @property {() => void} onClose - Callback when modal should close (user clicks cancel/backdrop/escape)
 * @property {(data: ToolFormData) => void} [onSubmit] - Optional callback with form data on successful submission
 * 
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * <AddToolModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onSubmit={(data) => createTool(data)}
 * />
 * ```
 */
interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ToolFormData) => void;
}

/**
 * Represents the complete data structure for a SaaS tool.
 * This interface defines the contract between the form and the API.
 * 
 * @interface ToolFormData
 * @property {string} name - Tool name (required, validated)
 * @property {string} category - Tool category from predefined list
 * @property {string} department - Department using the tool
 * @property {string} description - Brief description of tool purpose
 * @property {number} monthlyCost - Monthly subscription cost in euros
 * @property {string} billingCycle - Billing frequency (monthly/quarterly/annual)
 * @property {string} renewalDate - ISO date string for next renewal
 * @property {number} users - Number of active users/licenses
 * @property {string} status - Tool status (active/expiring/unused)
 * @property {string} website - Tool's official website URL
 * @property {string} contactEmail - Support or account contact email
 * @property {string} notes - Additional notes or context
 * 
 * @remarks
 * Export this interface so it can be reused in:
 * - API service layer (type-safe requests)
 * - State management (Zustand stores)
 * - Other forms (EditToolModal)
 */
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

/**
 * AddToolModal - A comprehensive form modal for adding new SaaS tools to the system.
 * 
 * This component demonstrates several React best practices:
 * 1. Controlled form inputs with local state management
 * 2. Client-side validation with user-friendly error messages
 * 3. Optimistic UI updates with loading states
 * 4. Proper form cleanup on modal close
 * 5. Accessible form structure with labels and error messaging
 * 
 * @component
 * @example
 * ```tsx
 * const [showModal, setShowModal] = useState(false);
 * 
 * <AddToolModal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   onSubmit={async (data) => {
 *     await api.createTool(data);
 *     queryClient.invalidateQueries(['tools']);
 *   }}
 * />
 * ```
 * 
 * @architectural-note
 * This component follows the "Presentation Component" pattern:
 * - Handles UI logic (validation, form state)
 * - Delegates business logic to parent (API calls, global state updates)
 * - Makes it testable and reusable
 */
export function AddToolModal({ isOpen, onClose, onSubmit }: AddToolModalProps) {
  /**
   * Local form state using controlled inputs pattern.
   * 
   * @pattern Controlled Components
   * Each input's value is controlled by React state, making it the "single source of truth".
   * This enables: validation, dynamic updates, conditional rendering, and easy reset.
   * 
   * @state formData - The complete form data object
   * @default - Initialized with sensible defaults (status: 'active', billingCycle: 'monthly')
   */
  const [formData, setFormData] = useState<ToolFormData>({
    name: '',
    category: '',
    department: '',
    description: '',
    monthlyCost: 0,
    billingCycle: 'monthly', // Default to most common billing cycle
    renewalDate: '',
    users: 0,
    status: 'active', // New tools default to active status
    website: '',
    contactEmail: '',
    notes: '',
  });

  /**
   * Error state for form validation.
   * 
   * @pattern Error State Management
   * - Uses Record<string, string> for field-specific error messages
   * - Allows displaying errors next to respective fields (better UX)
   * - Cleared on successful submission or modal close
   * 
   * @state errors - Map of field names to error messages
   * @example { name: 'Tool name is required', monthlyCost: 'Must be greater than 0' }
   */
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Loading state for async submission.
   * 
   * @pattern Loading States
   * - Prevents double-submission (button disabled during submit)
   * - Provides user feedback (spinner in button)
   * - Essential for good UX in async operations
   * 
   * @state isSubmitting - True when form is being submitted
   */
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handles form submission with validation.
   * 
   * @async
   * @param {FormEvent} e - The form submit event
   * @returns {Promise<void>}
   * 
   * @validation-strategy
   * Client-side validation for immediate feedback:
   * 1. Check required fields (name, category, department)
   * 2. Validate numeric constraints (monthlyCost > 0, users > 0)
   * 3. Check date fields (renewalDate required)
   * 
   * @important
   * This is client-side validation only. Always validate on the server too!
   * Never trust client data - this is just for UX improvement.
   * 
   * @error-handling
   * - Validation errors: Display inline, prevent submission
   * - Network errors: Should be caught by parent component's onSubmit
   * - Success: Clear form and close modal
   * 
   * @ux-consideration
   * The 1-second timeout simulates an API call. In production:
   * - Replace with actual API call via onSubmit callback
   * - Use TanStack Query for caching and optimistic updates
   * - Consider toast notifications for success/error feedback
   */
  const handleSubmit = async (e: FormEvent) => {
    // Prevent default form submission (would reload the page)
    e.preventDefault();
    
    // Validation: Build error object for any invalid fields
    const newErrors: Record<string, string> = {};
    
    // Required text field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Tool name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    
    // Numeric validation with business rules
    if (formData.monthlyCost <= 0) {
      newErrors.monthlyCost = 'Monthly cost must be greater than 0';
    }
    if (formData.users <= 0) {
      newErrors.users = 'Number of users must be greater than 0';
    }
    
    // Date validation
    if (!formData.renewalDate) {
      newErrors.renewalDate = 'Renewal date is required';
    }

    // If validation fails, update error state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Early return prevents submission
    }

    // Start async submission
    setIsSubmitting(true);
    try {
      // Simulate API call (replace with real API call in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call parent's onSubmit handler with validated data
      onSubmit?.(formData);
      
      // Success: Clean up and close modal
      handleClose();
    } catch (error) {
      // Handle submission errors
      // In production: Show toast notification, log to error tracking service
      console.error('Error submitting form:', error);
      // Optionally: Set a general error message to display to user
    } finally {
      // Always reset loading state, even if there's an error
      setIsSubmitting(false);
    }
  };

  /**
   * Resets form state and closes the modal.
   * 
   * @function handleClose
   * @returns {void}
   * 
   * @pattern State Cleanup
   * Always reset component state when closing a modal to ensure:
   * 1. Fresh state when reopened (no stale data)
   * 2. No memory leaks from retained error messages
   * 3. Better user experience (clean slate for next use)
   * 
   * @best-practice
   * Separate close logic from the onClose callback so you can:
   * - Add additional cleanup logic here
   * - Reuse this function in multiple places (cancel button, successful submit)
   * - Maintain single responsibility principle
   */
  const handleClose = () => {
    // Reset form to initial empty state
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
    
    // Clear any validation errors
    setErrors({});
    
    // Notify parent component to close the modal
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
          {/* 
            Cancel button: Secondary variant to de-emphasize
            Disabled during submission to prevent state inconsistency
          */}
          <Button variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          {/* 
            Submit button: Primary variant for main action
            Loading state shows spinner and disables interaction
            onClick triggers validation and submission
          */}
          <Button onClick={handleSubmit} loading={isSubmitting}>
            Add Tool
          </Button>
        </>
      }
    >
      {/* 
        Form structure:
        - onSubmit handler for Enter key submission
        - Organized into logical sections for better UX
        - Each section separated by borders
        
        @accessibility
        - Labels linked to inputs via htmlFor/id
        - Required fields marked visually and semantically
        - Error messages associated with inputs
      */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
          
          {/* 
            Grid layout: 2 columns on desktop, 1 on mobile
            Keeps related fields together for better form flow
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tool Name Field */}
            <div className="space-y-2">
              {/* 
                Label with 'required' prop adds visual indicator (*)
                htmlFor links label to input for accessibility
              */}
              <Label htmlFor="name" required>
                Tool Name
              </Label>
              {/* 
                Controlled input pattern:
                - value={formData.name}: React controls the value
                - onChange: Updates state on every keystroke
                - Spread syntax {...formData, name: e.target.value} creates new object (immutability)
              */}
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Slack"
                error={errors.name} // Passes error for styling
              />
              {/* Conditional error message display */}
              {errors.name && (
                <p className="text-sm text-status-error">{errors.name}</p>
              )}
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <Label htmlFor="category" required>
                Category
              </Label>
              {/* 
                Select dropdown with predefined options
                @ux-note: Always include a placeholder option to force explicit selection
              */}
              <Select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {/* 
                  These options should ideally come from:
                  - API endpoint (GET /categories)
                  - Or a constants file for easy management
                  - Or Zustand store for app-wide consistency
                */}
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
            {/* 
              Textarea for multi-line input
              @ux-tip: Optional fields don't need 'required' indicator
              rows prop controls initial height
            */}
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the tool and its purpose"
              rows={3}
            />
          </div>
        </div>

        {/* Billing Information Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Visual separator between sections for better form scanning */}
          <h3 className="text-lg font-semibold text-foreground">Billing Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Monthly Cost Field */}
            <div className="space-y-2">
              <Label htmlFor="monthlyCost" required>
                Monthly Cost (€)
              </Label>
              {/* 
                Number input with type coercion:
                - HTML input always returns string
                - Number() converts to number for state
                - || '' provides fallback for empty/zero display
                
                @gotcha: type="number" allows decimals by default
                Consider: step="0.01" for cent precision
              */}
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

            {/* Renewal Date Field */}
            <div className="space-y-2">
              <Label htmlFor="renewalDate" required>
                Renewal Date
              </Label>
              {/* 
                Date input: HTML5 date picker
                @browser-support: Works in all modern browsers
                @format: Stores as YYYY-MM-DD (ISO format)
                
                @enhancement-idea:
                Could use a date picker library like react-day-picker for:
                - Better UX across browsers
                - Date range validation
                - Custom styling
              */}
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

          {/* Number of Users Field */}
          <div className="space-y-2">
            <Label htmlFor="users" required>
              Number of Users
            </Label>
            {/* 
              @business-logic: This could be:
              - Manual entry (current implementation)
              - Auto-calculated from license count
              - Synced from the tool's API
              - Tracked via SSO integration
            */}
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

        {/* Additional Information Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Website Field */}
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              {/* 
                URL input: HTML5 validation for URL format
                @validation: Browser checks for valid URL structure
                @enhancement: Could add custom validation for specific domains
              */}
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            {/* Contact Email Field */}
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              {/* 
                Email input: HTML5 validation for email format
                @pattern: Checks for valid email structure (name@domain.tld)
              */}
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="support@example.com"
              />
            </div>
          </div>

          {/* Notes Field */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            {/* 
              Free-form notes field for additional context
              @use-cases:
              - Renewal negotiation notes
              - Alternative tools considered
              - License restrictions
              - Integration requirements
            */}
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
