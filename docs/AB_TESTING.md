# A/B Testing with Playwright

Comprehensive guide to running A/B tests on the widget pattern using Playwright for end-to-end testing.

---

## 🎯 Why Playwright for A/B Testing?

Traditional A/B testing tools (Optimizely, VWO, Google Optimize) are great for analytics, but **Playwright gives us superpowers** for UX testing:

### Advantages:

1. **Real Browser Behavior** - Not synthetic, actual user interactions
2. **Performance Metrics** - Measure Core Web Vitals (LCP, FID, CLS)
3. **User Journey Tracking** - Full funnel analysis with timestamps
4. **Visual Regression** - Screenshot comparison between variants
5. **Accessibility Testing** - Ensure both variants are accessible
6. **Cross-Browser Validation** - Test on Chrome, Firefox, Safari, Edge
7. **Mobile Testing** - Real device emulation
8. **Debug Capability** - Step through tests, inspect state
9. **CI/CD Integration** - Automated testing on every deploy

### vs. Traditional Tools:

| Feature | Playwright | Traditional A/B Tools |
|---------|------------|----------------------|
| Real user behavior | ✅ Full browser automation | ⚠️ JavaScript injection |
| Performance metrics | ✅ Core Web Vitals | ❌ Limited |
| Debugging | ✅ Full DevTools access | ❌ Black box |
| Accessibility | ✅ Built-in audits | ❌ None |
| Cost | ✅ Free | 💰 $$$ per month |
| Learning curve | ⚠️ Moderate | ✅ Low |

---

## 🚀 Getting Started

### Install Dependencies (Already Done!)

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Run Tests

```bash
# Run all A/B tests
npm run test:e2e

# Run specific test file
npx playwright test tests/ab-test/widget-pattern.spec.ts

# Run with UI (interactive mode)
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium

# Run mobile tests only
npx playwright test --project="Mobile Chrome"

# Debug mode (step through)
npx playwright test --debug
```

### View Reports

```bash
# Open HTML report
npx playwright show-report

# Reports saved in playwright-report/
```

---

## 📊 Test Structure

### Fixture-Based Testing

We use Playwright's **fixtures** to inject A/B testing capabilities:

```typescript
import { test, expect } from '../fixtures/ab-test';

test('Widget variant test', async ({ page, metrics, trackEvent, variant }) => {
  // variant: Which version to test (widget/modal/control)
  // metrics: Automatic tracking of conversion funnel
  // trackEvent: Log user interactions
  // page: Standard Playwright page object
});
```

### Metrics Tracked Automatically:

```typescript
interface ABTestMetrics {
  // Engagement
  impressions: number;      // Widget/modal shown
  clicks: number;           // CTA clicked
  formStarts: number;       // User begins filling
  formCompletions: number;  // Successful submit
  
  // Conversion rates (calculated)
  ctr: number;              // Click-through rate
  startRate: number;        // Form start rate
  completionRate: number;   // Form completion rate
  overallConversion: number;// End-to-end conversion
  
  // Timing
  timeToEngage: number;     // Until first interaction
  timeToFormStart: number;  // Until form appears
  timeToSubmit: number;     // Total time to submit
  
  // Performance
  lcp: number;              // Largest Contentful Paint
  fid: number;              // First Input Delay
  cls: number;              // Cumulative Layout Shift
  
  // UX signals
  dismissals: number;       // User dismisses/cancels
  backButtonUses: number;   // Navigation back
  errors: number;           // Validation errors
}
```

---

## 🧪 Test Scenarios

### 1. Happy Path Test

**Goal:** Measure optimal user journey

```typescript
test('Complete user journey', async ({ page, metrics }) => {
  // 1. Widget impression
  await expect(page.locator('text=Good morning')).toBeVisible();
  metrics.impressions++;
  
  // 2. Click CTA
  await page.click('button:has-text("Add New Tool")');
  metrics.clicks++;
  
  // 3. Form appears
  metrics.formStarts++;
  
  // 4. Fill and submit
  await page.fill('input[id="name"]', 'Test Tool');
  // ... fill other fields
  await page.click('button[type="submit"]');
  metrics.formCompletions++;
  
  // Metrics automatically calculated:
  // - CTR = clicks / impressions
  // - Conversion = completions / impressions
  // - Time metrics captured
});
```

### 2. Abandonment Test

**Goal:** Identify where users drop off

```typescript
test('Form abandonment', async ({ page, metrics, trackEvent }) => {
  // Start filling form
  await page.fill('input[id="name"]', 'Test');
  trackEvent('field_filled', { field: 'name' });
  
  // User stops here - click back
  await page.click('button:has-text("Back")');
  metrics.backButtonUses++;
  trackEvent('form_abandoned', { fieldsCompleted: 1 });
  
  // Analysis: Where do users abandon most?
});
```

### 3. Validation Error Test

**Goal:** Measure error resilience

```typescript
test('Error recovery', async ({ page, metrics }) => {
  // Submit empty form
  await page.click('button[type="submit"]');
  
  // Count errors shown
  const errors = await page.locator('.text-status-unused').count();
  metrics.errors += errors;
  
  // User fixes and resubmits
  // Track: Does showing errors increase/decrease completion?
});
```

### 4. Performance Test

**Goal:** Measure Core Web Vitals

```typescript
test('Performance metrics', async ({ page, metrics }) => {
  const vitals = await measureWebVitals(page);
  
  metrics.lcp = vitals.lcp; // Should be < 2.5s
  metrics.fid = vitals.fid; // Should be < 100ms
  metrics.cls = vitals.cls; // Should be < 0.1
  
  // Compare: Does widget have better performance than modal?
});
```

### 5. Accessibility Test

**Goal:** Ensure inclusive design

```typescript
test('Keyboard navigation', async ({ page }) => {
  // Tab through elements
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  
  // Verify focus management
  await expect(page.locator('input[id="name"]')).toBeFocused();
  
  // Check ARIA labels
  await expect(page.locator('[aria-label]')).toHaveCount(5);
});
```

---

## 📈 Analysis & Reporting

### Running Comparison Tests

```bash
# Run both variants
npx playwright test tests/ab-test/widget-pattern.spec.ts
npx playwright test tests/ab-test/modal-pattern.spec.ts

# Generate comparison report
node scripts/compare-variants.js
```

### Expected Output:

```
📊 A/B Test Report
================================================================================

WIDGET VARIANT:
  Sample size: 30
  Avg Conversion: 68.50%
  Avg Time to Submit: 45.2s
  Avg LCP: 1.8s
  Avg CLS: 0.05
  Dismissal rate: 12%

MODAL VARIANT:
  Sample size: 30
  Avg Conversion: 52.30%
  Avg Time to Submit: 38.1s
  Avg LCP: 1.2s
  Avg CLS: 0.15
  Dismissal rate: 28%

COMPARISON:
  Conversion lift: +30.9% (Widget wins!)
  Time difference: +7.1s (Modal faster, but lower conversion)
  Performance: Widget has better CLS, Modal has faster LCP
  User satisfaction: Widget has fewer dismissals

WINNER: Widget variant
CONFIDENCE: 95%
RECOMMENDATION: Ship widget pattern
```

---

## 🎨 Visual Regression Testing

Compare screenshots between variants:

```typescript
test('Visual comparison', async ({ page }) => {
  await page.goto('/');
  
  // Take screenshot
  await page.screenshot({ 
    path: 'screenshots/widget-variant.png',
    fullPage: true 
  });
  
  // Compare with baseline
  // Playwright automatically detects visual differences
});
```

---

## 🔄 CI/CD Integration

### GitHub Actions Workflow:

```yaml
name: A/B Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      
      - name: Upload report
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 💡 Best Practices

### 1. **Statistical Significance**

Run each variant **at least 30 times** to ensure reliable results:

```typescript
for (let i = 0; i < 30; i++) {
  await test(`Widget variant - Run ${i}`, async ({ page }) => {
    // Test logic
  });
}
```

### 2. **Randomization**

Randomize test order to avoid bias:

```typescript
const variants = ['widget', 'modal'].sort(() => Math.random() - 0.5);
```

### 3. **Control External Factors**

- Same network conditions
- Same data seed
- Same time of day
- Consistent browser versions

### 4. **Track Everything**

```typescript
trackEvent('button_hover', { duration: 150 });
trackEvent('scroll_depth', { percentage: 75 });
trackEvent('mouse_movement', { idle: false });
```

### 5. **Test Real Scenarios**

Don't just test "happy path":
- Users with slow connections
- Users on mobile
- Users with ad blockers
- Users with accessibility tools

---

## 🐛 Debugging Failed Tests

```bash
# Run with trace
npx playwright test --trace on

# Open trace viewer
npx playwright show-trace trace.zip

# Inspect network, console, DOM, actions
```

---

## 📚 Advanced Techniques

### 1. **Session Recording**

Record entire user sessions:

```typescript
const context = await browser.newContext({
  recordVideo: { dir: 'videos/' }
});
```

### 2. **Network Interception**

Mock API responses for controlled testing:

```typescript
await page.route('**/api/tools', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ success: true })
  });
});
```

### 3. **Custom Reporters**

Send results to analytics platform:

```typescript
class AnalyticsReporter {
  onTestEnd(test, result) {
    fetch('https://analytics.example.com/ab-test', {
      method: 'POST',
      body: JSON.stringify({
        variant: test.variant,
        metrics: result.metrics,
        timestamp: Date.now()
      })
    });
  }
}
```

---

## 🎯 Next Steps

1. **Run Baseline Tests**: Establish current metrics
2. **Deploy Widget**: Ship new pattern
3. **Run Comparison**: Widget vs Modal
4. **Analyze Results**: Determine winner
5. **Ship Winner**: Remove losing variant
6. **Monitor Production**: Ensure results hold

---

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [Web Vitals](https://web.dev/vitals/)
- [A/B Testing Best Practices](https://www.optimizely.com/optimization-glossary/ab-testing/)
- [Statistical Significance Calculator](https://www.evanmiller.org/ab-testing/sample-size.html)

---

**Remember:** A/B testing is about learning, not just winning. Even if widget doesn't outperform modal, we learn WHY and iterate! 🚀
