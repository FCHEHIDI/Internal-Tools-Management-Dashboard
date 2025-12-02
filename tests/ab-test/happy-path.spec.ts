import { test, expect } from '../fixtures/ab-test-enhanced';
import { DashboardPage } from '../pages/DashboardPage';
import { AddToolFormPage } from '../pages/AddToolFormPage';
import { ToolDataFactory } from '../fixtures/test-data';

/**
 * @file Happy Path Tests
 * @description Tests the complete successful user journey
 */

test.describe('Widget Pattern - Happy Path', { tag: ['@smoke', '@critical', '@ab-test', '@widget'] }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Complete journey: Welcome → Campaign → Form → Success', async ({ 
    page, 
    metrics, 
    trackEvent 
  }) => {
    const startTime = Date.now();
    const dashboard = new DashboardPage(page);
    const formPage = new AddToolFormPage(page);
    
    // STEP 1: Widget Impression
    await dashboard.waitForWidget();
    metrics.impressions++;
    trackEvent('widget_impression', { variant: 'widget' });
    
    // Verify welcome state
    const welcomeValid = await dashboard.isWelcomeStateValid();
    expect(welcomeValid).toBe(true);
    
    // STEP 2: User engages (clicks CTA)
    const engageTime = Date.now();
    await dashboard.clickAddTool();
    metrics.clicks++;
    metrics.timeToEngage = engageTime - startTime;
    trackEvent('cta_click', { from: 'welcome', to: 'campaign' });
    
    // STEP 3: Campaign shown
    const campaignValid = await dashboard.isCampaignStateValid();
    expect(campaignValid).toBe(true);
    
    await dashboard.clickCampaignPrimaryCTA();
    trackEvent('campaign_cta_click', { cta: 'primary' });
    
    // STEP 4: Form appears
    await formPage.waitForFormVisible();
    const formStartTime = Date.now();
    metrics.formStarts++;
    metrics.timeToFormStart = formStartTime - startTime;
    trackEvent('form_start');
    
    // STEP 5: Fill and submit form
    const toolData = ToolDataFactory.createValidTool();
    await formPage.fillForm(toolData);
    trackEvent('form_filled');
    
    await formPage.submitForm();
    const submitTime = Date.now();
    metrics.timeToSubmit = submitTime - startTime;
    metrics.formCompletions++;
    trackEvent('form_submitted', { 
      totalDuration: metrics.timeToSubmit,
      timeBreakdown: {
        toEngage: metrics.timeToEngage,
        toFormStart: metrics.timeToFormStart,
        toSubmit: metrics.timeToSubmit,
      }
    });
    
    // Verify success
    await expect(page.locator('text=/success|added|created/i')).toBeVisible({ timeout: 5000 });
    
    // Log final conversion metrics
    console.log('Conversion Metrics:', {
      CTR: `${(metrics.ctr * 100).toFixed(1)}%`,
      FormStartRate: `${(metrics.startRate * 100).toFixed(1)}%`,
      CompletionRate: `${(metrics.completionRate * 100).toFixed(1)}%`,
      OverallConversion: `${(metrics.overallConversion * 100).toFixed(1)}%`,
      TotalTime: `${metrics.timeToSubmit}ms`,
    });
  });

  test('Fast user journey - minimal interactions', async ({ 
    page, 
    metrics, 
    trackEvent 
  }) => {
    const dashboard = new DashboardPage(page);
    const formPage = new AddToolFormPage(page);
    
    // Skip welcome, go straight to form
    await dashboard.waitForWidget();
    metrics.impressions++;
    
    await dashboard.clickAddTool();
    metrics.clicks++;
    
    await dashboard.clickCampaignPrimaryCTA();
    
    await formPage.waitForFormVisible();
    metrics.formStarts++;
    
    // Use minimal data
    const minimalData = ToolDataFactory.createMinimalTool();
    await formPage.fillForm(minimalData);
    
    await formPage.submitForm();
    metrics.formCompletions++;
    
    await expect(page.locator('text=/success|added/i')).toBeVisible();
  });

  test('Returning user - show different content', async ({ page }) => {
    // Simulate returning user (localStorage/cookies)
    await page.evaluate(() => {
      localStorage.setItem('hasAddedTool', 'true');
      localStorage.setItem('toolCount', '3');
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    const dashboard = new DashboardPage(page);
    
    // Returning users might see different welcome message
    await dashboard.waitForWidget();
    const heading = await dashboard.welcomeHeading.textContent();
    
    // Could show personalized greeting
    expect(heading).toBeTruthy();
  });
});
