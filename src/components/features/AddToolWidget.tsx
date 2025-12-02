import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import { WelcomeWidget } from './WelcomeWidget';
import { CampaignBanner } from './CampaignBanner';
import { Button } from '@/components/ui/Button';
import { Input, Label } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';

/**
 * @component AddToolWidget
 * @description Modern, contextual widget container that replaces traditional modal approach.
 * 
 * @pattern Progressive Disclosure + State Machine
 * Instead of immediately showing a form modal, this widget:
 * 1. **welcome** - Greets user, shows recent activity, provides context
 * 2. **campaign** - (Optional) Displays marketing content, announcements, features
 * 3. **form** - Shows comprehensive add tool form when user is ready
 * 4. **minimized** - (Future) Can collapse to corner badge for quick access
 * 
 * @why Modern Web UX vs Desktop Modal
 * Traditional modal approach:
 * ❌ Disruptive overlay
 * ❌ Blocks entire interface
 * ❌ Immediate cognitive load
 * ❌ Desktop-era pattern
 * 
 * Widget approach:
 * ✅ Contextual, inline experience
 * ✅ Progressive engagement (orient → engage → act)
 * ✅ More flexible on mobile
 * ✅ Modern web-first design
 * ✅ Opportunity for personalization
 * 
 * @ux-decisions
 * - Default to 'welcome' state for engagement
 * - Can show 'campaign' state based on:
 *   * Feature flags (new feature launch)
 *   * User segment (power users get different message)
 *   * Time-based (Q4 budget planning season)
 *   * Behavior (haven't added tool in 30 days)
 * - Form state triggered by explicit user action
 * - Smooth animations between states (framer-motion)
 * - Can minimize to corner if user wants to continue browsing
 * 
 * @production
 * - Initial state determined by business logic:
 *   * First-time users → campaign with onboarding
 *   * Active users → welcome widget
 *   * Power users → direct to form (skip engagement)
 * - Widget content fetched from CMS/API
 * - Personalized based on user data
 * - Track engagement metrics (impressions, transitions, completions)
 * 
 * @accessibility
 * - Proper focus management on state transitions
 * - Keyboard navigation supported
 * - Screen reader announcements
 * - Color contrast maintained
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

interface AddToolWidgetProps {
  /**
   * Current widget display mode
   * @default 'welcome' - Start with engaging welcome screen
   */
  initialMode?: 'welcome' | 'campaign' | 'form';
  
  /**
   * User data for personalization
   */
  user?: {
    name: string;
    lastAction?: {
      action: string;
      toolName: string;
      timeAgo: string;
    };
    quarterlySavings?: number;
  };
  
  /**
   * Campaign configuration (optional)
   * If provided, widget can show campaign state
   */
  campaign?: {
    title: string;
    description: string;
    badge?: string;
    imageUrl?: string;
    primaryCta: {
      label: string;
      action: 'add-tool' | 'learn-more' | 'open-url' | 'start-trial';
      url?: string;
    };
    secondaryCta?: {
      label: string;
      action: 'add-tool' | 'learn-more' | 'open-url';
      url?: string;
    };
  };
  
  /**
   * Callback when form is successfully submitted
   */
  onSubmit?: (data: ToolFormData) => void;
  
  /**
   * Callback when widget is dismissed/minimized
   */
  onDismiss?: () => void;
}

export function AddToolWidget({
  initialMode = 'welcome',
  user,
  campaign,
  onSubmit,
  onDismiss,
}: AddToolWidgetProps) {
  // Widget state machine: welcome → campaign → form
  const [mode, setMode] = useState<'welcome' | 'campaign' | 'form'>(initialMode);
  
  // Form state (same as original modal)
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

  /**
   * @function handleSubmit
   * @description Form validation and submission (same logic as modal)
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Tool name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (formData.monthlyCost <= 0) newErrors.monthlyCost = 'Monthly cost must be greater than 0';
    if (formData.users <= 0) newErrors.users = 'Number of users must be greater than 0';
    if (!formData.renewalDate) newErrors.renewalDate = 'Renewal date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit?.(formData);
      handleReset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * @function handleReset
   * @description Reset widget to initial welcome state
   */
  const handleReset = () => {
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
    setMode('welcome');
  };

  return (
    <div className="relative" data-testid="add-tool-widget">
      <AnimatePresence mode="wait">
        {/* Welcome State */}
        {mode === 'welcome' && (
          <WelcomeWidget
            key="welcome"
            userName={user?.name}
            lastAction={user?.lastAction}
            quarterlySavings={user?.quarterlySavings}
            onAddToolClick={() => {
              // If campaign available, show it first; otherwise go to form
              setMode(campaign ? 'campaign' : 'form');
            }}
          />
        )}

        {/* Campaign State */}
        {mode === 'campaign' && campaign && (
          <CampaignBanner
            key="campaign"
            campaign={campaign}
            onPrimaryAction={() => setMode('form')}
            onSecondaryAction={() => {
              // Open learn more link
              if (campaign.secondaryCta?.url) {
                window.open(campaign.secondaryCta.url, '_blank');
              }
            }}
            onDismiss={() => {
              setMode('welcome');
              onDismiss?.();
            }}
          />
        )}

        {/* Form State */}
        {mode === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              {/* Header with back button */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMode('welcome')}
                    className="text-foreground-secondary hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Add New Tool</h2>
                    <p className="text-sm text-foreground-secondary mt-1">
                      Add a new SaaS tool to your stack
                    </p>
                  </div>
                </div>
                
                {onDismiss && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDismiss}
                    className="text-foreground-secondary hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                )}
              </div>

              {/* Form (reusing exact structure from modal) */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" required>Tool Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Slack, Figma, Notion"
                        error={errors.name}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" required>Category</Label>
                      <Select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        error={errors.category}
                      >
                        <option value="">Select category</option>
                        <option value="Communication">Communication</option>
                        <option value="Design">Design</option>
                        <option value="Development">Development</option>
                        <option value="Productivity">Productivity</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Security">Security</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Other">Other</option>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department" required>Department</Label>
                      <Select
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        error={errors.department}
                      >
                        <option value="">Select department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Operations">Operations</option>
                        <option value="Customer Support">Customer Support</option>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status">Status</Label>
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

                  <div>
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Billing Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="monthlyCost" required>Monthly Cost (€)</Label>
                      <Input
                        id="monthlyCost"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.monthlyCost || ''}
                        onChange={(e) => setFormData({ ...formData, monthlyCost: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                        error={errors.monthlyCost}
                      />
                    </div>

                    <div>
                      <Label htmlFor="billingCycle">Billing Cycle</Label>
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

                    <div>
                      <Label htmlFor="renewalDate" required>Renewal Date</Label>
                      <Input
                        id="renewalDate"
                        type="date"
                        value={formData.renewalDate}
                        onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
                        error={errors.renewalDate}
                      />
                    </div>
                  </div>
                </div>

                {/* Usage Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Usage Information</h3>
                  
                  <div>
                    <Label htmlFor="users" required>Number of Users/Licenses</Label>
                    <Input
                      id="users"
                      type="number"
                      min="1"
                      value={formData.users || ''}
                      onChange={(e) => setFormData({ ...formData, users: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      error={errors.users}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
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

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any additional information or notes"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setMode('welcome')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Adding Tool...' : 'Add Tool'}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
