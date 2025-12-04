import { test as base, expect } from '@playwright/test';

/**
 * Enhanced A/B Testing Fixtures with Reporter Integration
 * 
 * Improvements:
 * - Automatic metric aggregation
 * - Real-time reporter updates
 * - Better TypeScript typing
 * - Statistical analysis utilities
 */

export interface ABTestVariant {
  name: 'control' | 'widget' | 'modal';
  description: string;
  featureFlags?: Record<string, boolean>;
  weight?: number; // For traffic allocation
}

export interface ABTestMetrics {
  // Engagement
  impressions: number;
  clicks: number;
  formStarts: number;
  formCompletions: number;
  
  // Conversion funnel
  ctr: number;
  startRate: number;
  completionRate: number;
  overallConversion: number;
  
  // Time metrics (ms)
  timeToEngage: number;
  timeToFormStart: number;
  timeToSubmit: number;
  
  // Web Vitals
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay  
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  
  // UX signals
  dismissals: number;
  backButtonUses: number;
  errors: number;
  formRetries: number;
  
  // Device info
  viewport?: { width: number; height: number };
  userAgent?: string;
}

export interface ABTestEvent {
  name: string;
  timestamp: number;
  duration?: number;
  data?: Record<string, any>;
  variant: string;
}

type ABTestFixtures = {
  variant: ABTestVariant;
  metrics: ABTestMetrics;
  trackEvent: (event: string, data?: any) => void;
  measureWebVitals: () => Promise<Pick<ABTestMetrics, 'lcp' | 'fid' | 'cls' | 'ttfb'>>;
};

/**
 * Enhanced test fixture with automatic reporting
 */
export const test = base.extend<ABTestFixtures>({
  variant: async ({ browserName }, use, testInfo) => {
    // Determine variant (could be randomized, hash-based, or explicit)
    const variantName = (testInfo.project.name.includes('widget') ? 'widget' : 'control') as 'widget' | 'control';
    
    const variant: ABTestVariant = {
      name: variantName,
      description: variantName === 'widget' 
        ? 'Modern widget pattern with progressive disclosure'
        : 'Traditional modal pattern',
      featureFlags: {
        useWidgetPattern: variantName === 'widget',
        showCampaign: true,
        enableAnimations: true,
      },
      weight: 0.5, // 50/50 traffic split
    };
    
    // Attach variant info to test
    testInfo.annotations.push({
      type: 'variant',
      description: variant.name,
    });
    
    await use(variant);
  },

  metrics: async ({ page, variant }, use, testInfo) => {
    const metrics: ABTestMetrics = {
      impressions: 0,
      clicks: 0,
      formStarts: 0,
      formCompletions: 0,
      ctr: 0,
      startRate: 0,
      completionRate: 0,
      overallConversion: 0,
      timeToEngage: 0,
      timeToFormStart: 0,
      timeToSubmit: 0,
      lcp: 0,
      fid: 0,
      cls: 0,
      ttfb: 0,
      dismissals: 0,
      backButtonUses: 0,
      errors: 0,
      formRetries: 0,
      viewport: page.viewportSize() || undefined,
      userAgent: await page.evaluate(() => navigator.userAgent),
    };
    
    await use(metrics);
    
    // Calculate derived metrics
    metrics.ctr = metrics.impressions > 0 ? metrics.clicks / metrics.impressions : 0;
    metrics.startRate = metrics.clicks > 0 ? metrics.formStarts / metrics.clicks : 0;
    metrics.completionRate = metrics.formStarts > 0 ? metrics.formCompletions / metrics.formStarts : 0;
    metrics.overallConversion = metrics.impressions > 0 ? metrics.formCompletions / metrics.impressions : 0;
    
    // Attach metrics to test result for reporter
    testInfo.attachments.push({
      name: 'ab-test-metrics',
      contentType: 'application/json',
      body: Buffer.from(JSON.stringify({
        variant: variant.name,
        metrics,
        timestamp: Date.now(),
        testTitle: testInfo.title,
        project: testInfo.project.name,
      }, null, 2)),
    });
  },

  trackEvent: async ({ variant }, use, testInfo) => {
    const events: ABTestEvent[] = [];
    const startTime = Date.now();
    
    const tracker = (event: string, data?: any) => {
      const eventData: ABTestEvent = {
        name: event,
        timestamp: Date.now() - startTime,
        data,
        variant: variant.name,
      };
      
      events.push(eventData);
      console.log(`[AB-TEST:${variant.name}] ${event}`, data || '');
    };
    
    await use(tracker);
    
    // Attach events timeline
    if (events.length > 0) {
      testInfo.attachments.push({
        name: 'ab-test-events',
        contentType: 'application/json',
        body: Buffer.from(JSON.stringify(events, null, 2)),
      });
    }
  },

  measureWebVitals: async ({ page }, use) => {
    const measure = async () => {
      const vitals = await page.evaluate(() => {
        return new Promise<any>((resolve) => {
          const metrics = {
            lcp: 0,
            fid: 0,
            cls: 0,
            ttfb: 0,
          };

          // LCP - Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // FID - First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              metrics.fid = entry.processingStart - entry.startTime;
            });
          });
          fidObserver.observe({ type: 'first-input', buffered: true });

          // CLS - Cumulative Layout Shift
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            metrics.cls = clsValue;
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });

          // TTFB - Time to First Byte
          const navEntry = performance.getEntriesByType('navigation')[0] as any;
          if (navEntry) {
            metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
          }

          // Resolve after a short delay to collect metrics
          setTimeout(() => {
            lcpObserver.disconnect();
            fidObserver.disconnect();
            clsObserver.disconnect();
            resolve(metrics);
          }, 1000);
        });
      });

      return vitals;
    };

    await use(measure);
  },
});

export { expect };

/**
 * Statistical utilities for A/B test analysis
 */
export class ABTestAnalyzer {
  /**
   * Calculate confidence interval
   */
  static confidenceInterval(
    successCount: number,
    totalCount: number,
    confidenceLevel: number = 0.95
  ): { lower: number; upper: number; margin: number } {
    if (totalCount === 0) return { lower: 0, upper: 0, margin: 0 };
    
    const p = successCount / totalCount;
    const z = confidenceLevel === 0.95 ? 1.96 : 2.576; // 95% or 99%
    const margin = z * Math.sqrt((p * (1 - p)) / totalCount);
    
    return {
      lower: Math.max(0, p - margin),
      upper: Math.min(1, p + margin),
      margin,
    };
  }

  /**
   * Chi-square test for statistical significance
   */
  static chiSquareTest(
    controlSuccess: number,
    controlTotal: number,
    variantSuccess: number,
    variantTotal: number
  ): { pValue: number; significant: boolean } {
    const controlFailure = controlTotal - controlSuccess;
    const variantFailure = variantTotal - variantSuccess;
    
    const n = controlTotal + variantTotal;
    const expectedControlSuccess = ((controlTotal * (controlSuccess + variantSuccess)) / n);
    const expectedVariantSuccess = ((variantTotal * (controlSuccess + variantSuccess)) / n);
    
    const chiSquare =
      Math.pow(controlSuccess - expectedControlSuccess, 2) / expectedControlSuccess +
      Math.pow(variantSuccess - expectedVariantSuccess, 2) / expectedVariantSuccess;
    
    // Simplified p-value calculation (df=1)
    const pValue = 1 - this.normalCDF(Math.sqrt(chiSquare));
    
    return {
      pValue,
      significant: pValue < 0.05,
    };
  }

  /**
   * Normal cumulative distribution function
   */
  private static normalCDF(x: number): number {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob =
      d *
      t *
      (0.3193815 +
        t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
  }

  /**
   * Calculate relative uplift
   */
  static calculateUplift(controlRate: number, variantRate: number): number {
    if (controlRate === 0) return 0;
    return ((variantRate - controlRate) / controlRate) * 100;
  }

  /**
   * Determine sample size needed for test
   */
  static requiredSampleSize(
    baselineRate: number,
    mde: number, // Minimum detectable effect (e.g., 0.1 for 10%)
    alpha: number = 0.05,
    power: number = 0.8
  ): number {
    const z_alpha = 1.96; // 95% confidence
    const z_beta = 0.84; // 80% power
    
    const p1 = baselineRate;
    const p2 = baselineRate * (1 + mde);
    const p_avg = (p1 + p2) / 2;
    
    const n =
      (Math.pow(z_alpha + z_beta, 2) * 2 * p_avg * (1 - p_avg)) /
      Math.pow(p2 - p1, 2);
    
    return Math.ceil(n);
  }
}
