import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Dashboard
 * Encapsulates dashboard interactions and selectors
 */
export class DashboardPage {
  readonly page: Page;
  
  // Widget selectors
  readonly widgetContainer: Locator;
  readonly welcomeHeading: Locator;
  readonly didYouKnowSection: Locator;
  readonly quarterlySavings: Locator;
  readonly addToolCTA: Locator;
  
  // Campaign selectors
  readonly campaignTitle: Locator;
  readonly campaignBadge: Locator;
  readonly campaignPrimaryCTA: Locator;
  readonly campaignSecondaryCTA: Locator;
  readonly campaignDismiss: Locator;
  
  // Navigation
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Widget elements
    this.widgetContainer = page.locator('[data-testid="add-tool-widget"]');
    this.welcomeHeading = page.locator('text=/Good (morning|afternoon|evening)/i');
    this.didYouKnowSection = page.locator('text=Did you know?');
    this.quarterlySavings = page.locator('text=saved');
    this.addToolCTA = page.locator('button:has-text("Add New Tool to Your Stack")');
    
    // Campaign elements
    this.campaignTitle = page.locator('text=/Q4 Budget Planning/i');
    this.campaignBadge = page.locator('text=NEW');
    this.campaignPrimaryCTA = page.locator('button:has-text("Add Tool to Review")');
    this.campaignSecondaryCTA = page.locator('button:has-text("Learn"), button:has-text("AI Optimizer")');
    this.campaignDismiss = page.locator('[aria-label="Dismiss"], button:has-text("×")');
    
    // Navigation
    this.backButton = page.locator('button:has-text("Back")');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForWidget() {
    await this.widgetContainer.waitFor({ state: 'visible', timeout: 5000 });
  }

  async clickAddTool() {
    await this.addToolCTA.click();
  }

  async clickCampaignPrimaryCTA() {
    await this.campaignPrimaryCTA.click();
  }

  async clickCampaignSecondaryCTA() {
    await this.campaignSecondaryCTA.click();
  }

  async dismissCampaign() {
    await this.campaignDismiss.click();
  }

  async goBack() {
    await this.backButton.click();
  }

  async getWidgetState(): Promise<'welcome' | 'campaign' | 'form' | 'unknown'> {
    if (await this.welcomeHeading.isVisible({ timeout: 1000 }).catch(() => false)) {
      return 'welcome';
    }
    if (await this.campaignTitle.isVisible({ timeout: 1000 }).catch(() => false)) {
      return 'campaign';
    }
    if (await this.page.locator('text=Add New Tool').first().isVisible({ timeout: 1000 }).catch(() => false)) {
      return 'form';
    }
    return 'unknown';
  }

  async isWelcomeStateValid(): Promise<boolean> {
    const checks = await Promise.all([
      this.welcomeHeading.isVisible(),
      this.didYouKnowSection.isVisible(),
      this.quarterlySavings.isVisible(),
      this.addToolCTA.isVisible(),
    ]);
    return checks.every(Boolean);
  }

  async isCampaignStateValid(): Promise<boolean> {
    // Campaign must have at least title and primary CTA
    const titleVisible = await this.campaignTitle.isVisible().catch(() => false);
    const ctaVisible = await this.campaignPrimaryCTA.isVisible().catch(() => false);
    return titleVisible && ctaVisible;
  }

  /**
   * Performance: Measure widget render time
   */
  async measureWidgetRenderTime(): Promise<number> {
    const startTime = Date.now();
    await this.waitForWidget();
    return Date.now() - startTime;
  }

  /**
   * Accessibility: Check ARIA attributes
   */
  async checkAccessibility() {
    const results = {
      hasAriaLabels: false,
      hasKeyboardNav: false,
      hasFocusIndicators: false,
    };

    // Check ARIA labels on interactive elements
    const buttons = await this.page.locator('button[aria-label]').count();
    results.hasAriaLabels = buttons > 0;

    // Check keyboard navigation (Tab key support)
    await this.page.keyboard.press('Tab');
    const focused = await this.page.locator(':focus').count();
    results.hasKeyboardNav = focused > 0;

    return results;
  }
}
