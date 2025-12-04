import { Page, Locator } from '@playwright/test';

export interface ToolFormData {
  name: string;
  category: string;
  department: string;
  description: string;
  monthlyCost: string;
  billingCycle: string;
  renewalDate: string;
  users: string;
  website: string;
  contactEmail: string;
}

/**
 * Page Object Model for Add Tool Form
 * Encapsulates form interactions and validation
 */
export class AddToolFormPage {
  readonly page: Page;
  
  // Form elements
  readonly formTitle: Locator;
  readonly nameInput: Locator;
  readonly categorySelect: Locator;
  readonly departmentSelect: Locator;
  readonly descriptionTextarea: Locator;
  readonly monthlyCostInput: Locator;
  readonly billingCycleSelect: Locator;
  readonly renewalDateInput: Locator;
  readonly usersInput: Locator;
  readonly websiteInput: Locator;
  readonly contactEmailInput: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;
  
  // Validation
  readonly errorMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.formTitle = page.locator('text=Add New Tool').first();
    this.nameInput = page.locator('input[id="name"]');
    this.categorySelect = page.locator('select[id="category"]');
    this.departmentSelect = page.locator('select[id="department"]');
    this.descriptionTextarea = page.locator('textarea[id="description"]');
    this.monthlyCostInput = page.locator('input[id="monthlyCost"]');
    this.billingCycleSelect = page.locator('select[id="billingCycle"]');
    this.renewalDateInput = page.locator('input[id="renewalDate"]');
    this.usersInput = page.locator('input[id="users"]');
    this.websiteInput = page.locator('input[id="website"]');
    this.contactEmailInput = page.locator('input[id="contactEmail"]');
    this.submitButton = page.locator('button[type="submit"]:has-text("Add Tool")');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    this.errorMessages = page.locator('[role="alert"], .error-message, text=/required|invalid/i');
  }

  async waitForFormVisible() {
    await this.formTitle.waitFor({ state: 'visible', timeout: 5000 });
  }

  async fillForm(data: ToolFormData) {
    await this.nameInput.fill(data.name);
    await this.categorySelect.selectOption(data.category);
    await this.departmentSelect.selectOption(data.department);
    await this.descriptionTextarea.fill(data.description);
    await this.monthlyCostInput.fill(data.monthlyCost);
    await this.billingCycleSelect.selectOption(data.billingCycle);
    await this.renewalDateInput.fill(data.renewalDate);
    await this.usersInput.fill(data.users);
    await this.websiteInput.fill(data.website);
    await this.contactEmailInput.fill(data.contactEmail);
  }

  async fillPartialForm(fields: Partial<ToolFormData>) {
    if (fields.name) await this.nameInput.fill(fields.name);
    if (fields.category) await this.categorySelect.selectOption(fields.category);
    if (fields.department) await this.departmentSelect.selectOption(fields.department);
    if (fields.description) await this.descriptionTextarea.fill(fields.description);
    if (fields.monthlyCost) await this.monthlyCostInput.fill(fields.monthlyCost);
    if (fields.billingCycle) await this.billingCycleSelect.selectOption(fields.billingCycle);
    if (fields.renewalDate) await this.renewalDateInput.fill(fields.renewalDate);
    if (fields.users) await this.usersInput.fill(fields.users);
    if (fields.website) await this.websiteInput.fill(fields.website);
    if (fields.contactEmail) await this.contactEmailInput.fill(fields.contactEmail);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async cancelForm() {
    await this.cancelButton.click();
  }

  async getErrorCount(): Promise<number> {
    return await this.errorMessages.count();
  }

  async getErrorMessages(): Promise<string[]> {
    const count = await this.getErrorCount();
    const messages: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const text = await this.errorMessages.nth(i).textContent();
      if (text) messages.push(text.trim());
    }
    
    return messages;
  }

  async isFormValid(): Promise<boolean> {
    // Check if submit button is enabled (indicates form validation passed)
    return await this.submitButton.isEnabled();
  }

  /**
   * Clear form - useful for testing form reset
   */
  async clearForm() {
    await this.nameInput.clear();
    await this.descriptionTextarea.clear();
    await this.monthlyCostInput.clear();
    await this.usersInput.clear();
    await this.websiteInput.clear();
    await this.contactEmailInput.clear();
  }

  /**
   * Get field validation state
   */
  async getFieldValidation(fieldId: string): Promise<{
    hasError: boolean;
    errorMessage?: string;
  }> {
    const field = this.page.locator(`#${fieldId}`);
    const ariaInvalid = await field.getAttribute('aria-invalid');
    const hasError = ariaInvalid === 'true';

    let errorMessage: string | undefined;
    if (hasError) {
      const describedBy = await field.getAttribute('aria-describedby');
      if (describedBy) {
        const errorElement = this.page.locator(`#${describedBy}`);
        errorMessage = (await errorElement.textContent()) || undefined;
      }
    }

    return { hasError, errorMessage };
  }

  /**
   * Performance: Measure form interaction responsiveness
   */
  async measureFieldResponseTime(fieldId: string, value: string): Promise<number> {
    const startTime = performance.now();
    await this.page.locator(`#${fieldId}`).fill(value);
    await this.page.waitForTimeout(50); // Small delay for validation
    return performance.now() - startTime;
  }
}
