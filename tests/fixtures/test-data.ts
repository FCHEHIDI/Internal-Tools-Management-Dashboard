import { ToolFormData } from '../pages/AddToolFormPage';

/**
 * Test Data Factory Pattern
 * Provides reusable, consistent test data generation
 */

export const ToolDataFactory = {
  /**
   * Create valid tool data with all required fields
   */
  createValidTool(overrides?: Partial<ToolFormData>): ToolFormData {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    return {
      name: 'Playwright Test Tool',
      category: 'Development',
      department: 'Engineering',
      description: 'A comprehensive tool for end-to-end testing',
      monthlyCost: '99.99',
      billingCycle: 'monthly',
      renewalDate: futureDate.toISOString().split('T')[0],
      users: '10',
      website: 'https://playwright.dev',
      contactEmail: 'support@playwright.dev',
      ...overrides,
    };
  },

  /**
   * Create minimal valid tool (required fields only)
   */
  createMinimalTool(): ToolFormData {
    return this.createValidTool({
      description: 'Test',
      website: '',
      contactEmail: '',
    });
  },

  /**
   * Create tool with invalid email
   */
  createToolWithInvalidEmail(): ToolFormData {
    return this.createValidTool({
      contactEmail: 'invalid-email',
    });
  },

  /**
   * Create tool with invalid cost
   */
  createToolWithInvalidCost(): ToolFormData {
    return this.createValidTool({
      monthlyCost: '-50',
    });
  },

  /**
   * Create tool with past renewal date
   */
  createToolWithPastDate(): ToolFormData {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 30);

    return this.createValidTool({
      renewalDate: pastDate.toISOString().split('T')[0],
    });
  },

  /**
   * Create tool with edge case values
   */
  createToolWithEdgeCases(): ToolFormData {
    return {
      name: 'A'.repeat(100), // Very long name
      category: 'Development',
      department: 'Engineering',
      description: 'X'.repeat(500), // Very long description
      monthlyCost: '9999999.99', // Very high cost
      billingCycle: 'monthly',
      renewalDate: '2030-12-31', // Far future
      users: '10000', // Many users
      website: 'https://this-is-a-very-long-domain-name-for-testing-purposes.example.com',
      contactEmail: 'very.long.email.address.for.testing@example-domain.com',
    };
  },

  /**
   * Create batch of tools for stress testing
   */
  createToolBatch(count: number): ToolFormData[] {
    return Array.from({ length: count }, (_, i) =>
      this.createValidTool({
        name: `Test Tool ${i + 1}`,
        contactEmail: `test${i + 1}@example.com`,
      })
    );
  },

  /**
   * Create tool with specific category
   */
  createToolByCategory(category: string): ToolFormData {
    const departmentMap: Record<string, string> = {
      Development: 'Engineering',
      Design: 'Product',
      'Project Management': 'Operations',
      Communication: 'Operations',
      Analytics: 'Data',
    };

    return this.createValidTool({
      category,
      department: departmentMap[category] || 'Operations',
    });
  },
};

/**
 * User interaction patterns for realistic testing
 */
export const UserBehaviorPatterns = {
  /**
   * Slow typer - simulates user typing with delays
   */
  async slowType(page: any, selector: string, text: string) {
    const input = page.locator(selector);
    await input.click();
    for (const char of text) {
      await input.type(char, { delay: 100 });
    }
  },

  /**
   * Hesitant user - pauses between fields
   */
  async fillFormWithPauses(
    formPage: any,
    data: ToolFormData,
    pauseDuration: number = 500
  ) {
    await formPage.nameInput.fill(data.name);
    await new Promise((resolve) => setTimeout(resolve, pauseDuration));

    await formPage.categorySelect.selectOption(data.category);
    await new Promise((resolve) => setTimeout(resolve, pauseDuration));

    await formPage.departmentSelect.selectOption(data.department);
    await new Promise((resolve) => setTimeout(resolve, pauseDuration));

    // Continue with remaining fields...
    await formPage.fillForm(data);
  },

  /**
   * Fast user - power user behavior
   */
  async fillFormRapidly(formPage: any, data: ToolFormData) {
    // Fill all fields without delays
    await Promise.all([
      formPage.nameInput.fill(data.name),
      formPage.descriptionTextarea.fill(data.description),
      formPage.monthlyCostInput.fill(data.monthlyCost),
      formPage.usersInput.fill(data.users),
    ]);

    // Dropdowns sequentially (can't be parallel)
    await formPage.categorySelect.selectOption(data.category);
    await formPage.departmentSelect.selectOption(data.department);
    await formPage.billingCycleSelect.selectOption(data.billingCycle);

    await formPage.renewalDateInput.fill(data.renewalDate);
    await formPage.websiteInput.fill(data.website);
    await formPage.contactEmailInput.fill(data.contactEmail);
  },
};

/**
 * Test scenarios for A/B testing
 */
export const TestScenarios = {
  /**
   * Scenario: User discovers tool by accident
   */
  accidentalDiscovery: {
    description: 'User stumbles upon widget while browsing dashboard',
    expectation: 'Should capture attention with visual design',
    variant: 'widget' as const,
  },

  /**
   * Scenario: User has immediate need
   */
  urgentNeed: {
    description: 'User needs to add tool quickly for upcoming meeting',
    expectation: 'Should minimize time to form completion',
    variant: 'modal' as const, // Modal might be faster
  },

  /**
   * Scenario: User is exploring options
   */
  browsing: {
    description: 'User exploring dashboard features without immediate goal',
    expectation: 'Widget should educate and engage',
    variant: 'widget' as const,
  },

  /**
   * Scenario: Returning user
   */
  returningUser: {
    description: 'User has added tools before, knows the process',
    expectation: 'Should remember user preferences, offer shortcuts',
    variant: 'either' as const,
  },
};
