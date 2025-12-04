#!/usr/bin/env node

/**
 * A/B Test Runner Script
 * 
 * Quick utility to run A/B tests and generate comparison reports
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 A/B Test Runner\n');
console.log('=' .repeat(80));

// Commands
const commands = {
  'Run all A/B tests': 'npx playwright test tests/ab-test/',
  'Run with UI': 'npx playwright test --ui',
  'Run widget tests only': 'npx playwright test tests/ab-test/widget-pattern.spec.ts',
  'Run in headed mode': 'npx playwright test --headed',
  'Debug mode': 'npx playwright test --debug',
  'Show report': 'npx playwright show-report',
};

console.log('\n📋 Available Commands:\n');
Object.entries(commands).forEach(([name, cmd], index) => {
  console.log(`  ${index + 1}. ${name}`);
  console.log(`     ${cmd}\n`);
});

console.log('\n💡 Quick Start:\n');
console.log('  npm run test:e2e              # Run all E2E tests');
console.log('  npx playwright test --ui      # Interactive UI mode');
console.log('  npx playwright show-report    # View results\n');

console.log('\n🎯 Test Categories:\n');
console.log('  • Widget Pattern Tests: tests/ab-test/widget-pattern.spec.ts');
console.log('  • Fixtures: tests/fixtures/ab-test.ts');
console.log('  • Config: playwright.config.ts\n');

console.log('\n📊 After Running Tests:\n');
console.log('  1. Check playwright-report/ for HTML report');
console.log('  2. Review results.json for metrics');
console.log('  3. Compare widget vs modal conversion rates');
console.log('  4. Analyze time-to-conversion differences');
console.log('  5. Review Core Web Vitals (LCP, FID, CLS)\n');

console.log('=' .repeat(80));
console.log('\nRun any command from the list above to get started! 🚀\n');
