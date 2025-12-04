import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface ABTestMetricsSummary {
  variant: string;
  project: string;
  totalTests: number;
  passed: number;
  failed: number;
  avgDuration: number;
  metrics: {
    impressions: number;
    clicks: number;
    formStarts: number;
    formCompletions: number;
    ctr: number;
    conversionRate: number;
    avgTimeToConversion: number;
  };
}

/**
 * Custom Playwright Reporter for A/B Test Metrics
 * 
 * Aggregates test results and generates comparison reports
 */
class ABTestReporter implements Reporter {
  private config!: FullConfig;
  private suite!: Suite;
  private testResults: Map<string, TestResult[]> = new Map();
  private metricsData: Map<string, any[]> = new Map();

  onBegin(config: FullConfig, suite: Suite) {
    this.config = config;
    this.suite = suite;
    console.log(`\n🧪 Starting A/B Test Suite: ${suite.allTests().length} tests\n`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const projectName = test.parent.project()?.name || 'unknown';
    
    // Store test result
    if (!this.testResults.has(projectName)) {
      this.testResults.set(projectName, []);
    }
    this.testResults.get(projectName)!.push(result);

    // Extract metrics from attachments
    const metricsAttachment = result.attachments.find(
      (a) => a.name === 'ab-test-metrics'
    );
    
    if (metricsAttachment && metricsAttachment.body) {
      try {
        const metrics = JSON.parse(metricsAttachment.body.toString('utf-8'));
        
        if (!this.metricsData.has(metrics.variant)) {
          this.metricsData.set(metrics.variant, []);
        }
        this.metricsData.get(metrics.variant)!.push(metrics);
        
        // Log per-test metrics
        if (result.status === 'passed') {
          console.log(`✅ ${test.title}`);
          console.log(`   Variant: ${metrics.variant}`);
          console.log(`   Conversion: ${(metrics.metrics.overallConversion * 100).toFixed(1)}%`);
          console.log(`   Time: ${metrics.metrics.timeToSubmit}ms\n`);
        } else {
          console.log(`❌ ${test.title} - ${result.status}\n`);
        }
      } catch (err) {
        console.error('Failed to parse metrics:', err);
      }
    }
  }

  async onEnd(result: FullResult) {
    console.log(`\n📊 A/B Test Results Summary\n`);
    console.log(`${'='.repeat(80)}\n`);

    // Aggregate metrics by variant
    const summaries: ABTestMetricsSummary[] = [];

    for (const [variant, metricsArray] of this.metricsData.entries()) {
      const summary = this.aggregateMetrics(variant, metricsArray);
      summaries.push(summary);
      
      this.printVariantSummary(summary);
    }

    // Compare variants
    if (summaries.length >= 2) {
      this.compareVariants(summaries);
    }

    // Generate JSON report
    await this.generateJSONReport(summaries);
    
    // Generate HTML report
    await this.generateHTMLReport(summaries);

    console.log(`\n${'='.repeat(80)}\n`);
    console.log(`Final Status: ${result.status}`);
    console.log(`Total Duration: ${result.duration}ms\n`);
  }

  private aggregateMetrics(variant: string, metricsArray: any[]): ABTestMetricsSummary {
    const totalTests = metricsArray.length;
    
    if (totalTests === 0) {
      return {
        variant,
        project: 'unknown',
        totalTests: 0,
        passed: 0,
        failed: 0,
        avgDuration: 0,
        metrics: {
          impressions: 0,
          clicks: 0,
          formStarts: 0,
          formCompletions: 0,
          ctr: 0,
          conversionRate: 0,
          avgTimeToConversion: 0,
        },
      };
    }

    // Aggregate across all tests
    const totals = metricsArray.reduce(
      (acc, data) => {
        const m = data.metrics;
        return {
          impressions: acc.impressions + m.impressions,
          clicks: acc.clicks + m.clicks,
          formStarts: acc.formStarts + m.formStarts,
          formCompletions: acc.formCompletions + m.formCompletions,
          timeToSubmit: acc.timeToSubmit + m.timeToSubmit,
        };
      },
      { impressions: 0, clicks: 0, formStarts: 0, formCompletions: 0, timeToSubmit: 0 }
    );

    return {
      variant,
      project: metricsArray[0].project,
      totalTests,
      passed: metricsArray.filter((d) => d.metrics.formCompletions > 0).length,
      failed: totalTests - metricsArray.filter((d) => d.metrics.formCompletions > 0).length,
      avgDuration: metricsArray.reduce((sum, d) => sum + (d.metrics.timeToSubmit || 0), 0) / totalTests,
      metrics: {
        impressions: totals.impressions,
        clicks: totals.clicks,
        formStarts: totals.formStarts,
        formCompletions: totals.formCompletions,
        ctr: totals.impressions > 0 ? totals.clicks / totals.impressions : 0,
        conversionRate: totals.impressions > 0 ? totals.formCompletions / totals.impressions : 0,
        avgTimeToConversion: totals.timeToSubmit / totalTests,
      },
    };
  }

  private printVariantSummary(summary: ABTestMetricsSummary) {
    console.log(`📦 Variant: ${summary.variant.toUpperCase()}`);
    console.log(`   Project: ${summary.project}`);
    console.log(`   Tests: ${summary.totalTests} (${summary.passed} passed, ${summary.failed} failed)`);
    console.log(`   \n   Funnel Metrics:`);
    console.log(`   - Impressions: ${summary.metrics.impressions}`);
    console.log(`   - Clicks: ${summary.metrics.clicks}`);
    console.log(`   - Form Starts: ${summary.metrics.formStarts}`);
    console.log(`   - Completions: ${summary.metrics.formCompletions}`);
    console.log(`   \n   Performance:`);
    console.log(`   - CTR: ${(summary.metrics.ctr * 100).toFixed(2)}%`);
    console.log(`   - Conversion Rate: ${(summary.metrics.conversionRate * 100).toFixed(2)}%`);
    console.log(`   - Avg Time to Conversion: ${summary.metrics.avgTimeToConversion.toFixed(0)}ms`);
    console.log(``);
  }

  private compareVariants(summaries: ABTestMetricsSummary[]) {
    console.log(`\n🔬 Variant Comparison\n`);
    
    const [control, ...variants] = summaries;
    
    for (const variant of variants) {
      const ctrUplift = this.calculateUplift(control.metrics.ctr, variant.metrics.ctr);
      const conversionUplift = this.calculateUplift(
        control.metrics.conversionRate,
        variant.metrics.conversionRate
      );
      const timeChange = this.calculateUplift(
        control.metrics.avgTimeToConversion,
        variant.metrics.avgTimeToConversion
      );

      console.log(`${variant.variant} vs ${control.variant}:`);
      console.log(`   CTR: ${ctrUplift > 0 ? '📈' : '📉'} ${ctrUplift.toFixed(1)}% (${ctrUplift > 0 ? 'improvement' : 'decline'})`);
      console.log(`   Conversion: ${conversionUplift > 0 ? '📈' : '📉'} ${conversionUplift.toFixed(1)}% (${conversionUplift > 0 ? 'improvement' : 'decline'})`);
      console.log(`   Time: ${timeChange < 0 ? '⚡' : '🐌'} ${Math.abs(timeChange).toFixed(1)}% (${timeChange < 0 ? 'faster' : 'slower'})`);
      console.log(``);
    }
  }

  private calculateUplift(baseline: number, variant: number): number {
    if (baseline === 0) return 0;
    return ((variant - baseline) / baseline) * 100;
  }

  private async generateJSONReport(summaries: ABTestMetricsSummary[]) {
    const reportDir = path.join(this.config.rootDir, 'playwright-report');
    
    // Ensure directory exists
    try {
      await fs.promises.mkdir(reportDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }
    
    const reportPath = path.join(reportDir, 'ab-test-summary.json');
    
    const report = {
      timestamp: new Date().toISOString(),
      variants: summaries,
      comparison: summaries.length >= 2 ? {
        control: summaries[0].variant,
        winner: this.determineWinner(summaries),
      } : null,
    };

    await fs.promises.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 JSON Report: ${reportPath}`);
  }

  private async generateHTMLReport(summaries: ABTestMetricsSummary[]) {
    const html = this.createHTMLReport(summaries);
    const reportDir = path.join(this.config.rootDir, 'playwright-report');
    
    // Ensure directory exists
    try {
      await fs.promises.mkdir(reportDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }
    
    const reportPath = path.join(reportDir, 'ab-test-comparison.html');
    
    await fs.promises.writeFile(reportPath, html);
    console.log(`📄 HTML Report: ${reportPath}`);
  }

  private createHTMLReport(summaries: ABTestMetricsSummary[]): string {
    const rows = summaries.map(s => `
      <tr>
        <td><strong>${s.variant}</strong></td>
        <td>${(s.metrics.ctr * 100).toFixed(2)}%</td>
        <td>${(s.metrics.conversionRate * 100).toFixed(2)}%</td>
        <td>${s.metrics.avgTimeToConversion.toFixed(0)}ms</td>
        <td>${s.totalTests}</td>
        <td>${s.passed}/${s.failed}</td>
      </tr>
    `).join('');

    return `
<!DOCTYPE html>
<html>
<head>
  <title>A/B Test Comparison Report</title>
  <style>
    body { font-family: system-ui; max-width: 1200px; margin: 40px auto; padding: 20px; }
    h1 { color: #333; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; font-weight: 600; }
    tr:hover { background: #f9f9f9; }
    .winner { background: #e8f5e9; }
  </style>
</head>
<body>
  <h1>🧪 A/B Test Comparison Report</h1>
  <p>Generated: ${new Date().toLocaleString()}</p>
  
  <table>
    <thead>
      <tr>
        <th>Variant</th>
        <th>CTR</th>
        <th>Conversion Rate</th>
        <th>Avg Time</th>
        <th>Total Tests</th>
        <th>Passed/Failed</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  
  <h2>Winner: ${this.determineWinner(summaries)}</h2>
</body>
</html>
    `;
  }

  private determineWinner(summaries: ABTestMetricsSummary[]): string {
    if (summaries.length < 2) return 'N/A';
    
    // Simple winner determination based on conversion rate
    const sorted = [...summaries].sort((a, b) => 
      b.metrics.conversionRate - a.metrics.conversionRate
    );
    
    return sorted[0].variant;
  }
}

export default ABTestReporter;
