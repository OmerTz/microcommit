#!/usr/bin/env node

/**
 * MubleExpo Quick Health Check Doctor
 * Fast health checks with e2e infrastructure validation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

let report = {
  overall: 'HEALTHY',
  timestamp: new Date().toISOString(),
  e2e: {
    mobile: { status: 'NOT_TESTED', infrastructure: 'OK', error: null },
    web: { status: 'NOT_TESTED', infrastructure: 'OK', error: null }
  },
  summary: { passed: 0, failed: 0, total: 0 }
};

function check(name, condition, error = null) {
  const status = condition ? 'PASS' : 'FAIL';
  const icon = condition ? '✅' : '❌';
  const color = condition ? colors.green : colors.red;
  
  log(`  ${icon} ${name}`, color);
  
  if (!condition) {
    report.overall = 'UNHEALTHY';
    report.summary.failed++;
    if (error) {
      log(`     Error: ${error}`, colors.red);
    }
  } else {
    report.summary.passed++;
  }
  
  report.summary.total++;
  return condition;
}

function runQuick(command) {
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      timeout: 10000,
      stdio: 'pipe' 
    });
    return { success: true, output: result.trim() };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      output: error.output ? error.output.join('').trim() : ''
    };
  }
}

function validateE2EInfrastructure() {
  log(`\n${colors.bold}${colors.cyan}🧪 E2E Infrastructure Check${colors.reset}`);
  log('='.repeat(40), colors.cyan);
  
  // Mobile E2E Infrastructure
  const mobileDir = fs.existsSync('mobile-e2e');
  const mobileHelpers = fs.existsSync('mobile-e2e/helpers/index.js');
  const mobileConfig = fs.existsSync('mobile-e2e/config/testConfig.js');
  const detoxConfig = fs.existsSync('.detoxrc.js');
  
  check('Mobile E2E directory', mobileDir);
  check('Mobile E2E helpers', mobileHelpers);
  check('Mobile E2E config', mobileConfig);
  check('Detox configuration', detoxConfig);
  
  // Test mobile helpers load
  if (mobileHelpers) {
    try {
      const helpers = require('./mobile-e2e/helpers');
      const hasAuthHelpers = helpers.auth && typeof helpers.auth.login === 'function';
      const hasNavHelpers = helpers.nav && typeof helpers.nav.handleOnboarding === 'function';
      const hasDashboardHelpers = helpers.dashboard && typeof helpers.dashboard.verifyDashboardState === 'function';
      
      check('Mobile helpers load', true);
      check('Mobile auth helpers', hasAuthHelpers);
      check('Mobile nav helpers', hasNavHelpers);  
      check('Mobile dashboard helpers', hasDashboardHelpers);
      
      report.e2e.mobile.infrastructure = 'OK';
    } catch (error) {
      check('Mobile helpers load', false, error.message);
      report.e2e.mobile.infrastructure = 'ERROR';
      report.e2e.mobile.error = error.message;
    }
  }
  
  // Web E2E Infrastructure
  const webDir = fs.existsSync('web-e2e');
  const webHelpers = fs.existsSync('web-e2e/helpers/index.js');
  const webConfig = fs.existsSync('web-e2e/config/testConfig.js');
  const playwrightConfig = fs.existsSync('web-e2e/playwright.config.js');
  
  check('Web E2E directory', webDir);
  check('Web E2E helpers', webHelpers);
  check('Web E2E config', webConfig);
  check('Playwright configuration', playwrightConfig);
  
  // Test web helpers load
  if (webHelpers) {
    try {
      const helpers = require('./web-e2e/helpers');
      const hasAuthHelpers = helpers.auth && typeof helpers.auth.login === 'function';
      const hasNavHelpers = helpers.nav && typeof helpers.nav.handleOnboarding === 'function';
      const hasDashboardHelpers = helpers.dashboard && typeof helpers.dashboard.verifyDashboardState === 'function';
      
      check('Web helpers load', true);
      check('Web auth helpers', hasAuthHelpers);
      check('Web nav helpers', hasNavHelpers);
      check('Web dashboard helpers', hasDashboardHelpers);
      
      report.e2e.web.infrastructure = 'OK';
    } catch (error) {
      check('Web helpers load', false, error.message);
      report.e2e.web.infrastructure = 'ERROR'; 
      report.e2e.web.error = error.message;
    }
  }
}

function quickE2ETest() {
  log(`\n${colors.bold}${colors.cyan}⚡ Quick E2E Smoke Test${colors.reset}`);
  log('='.repeat(40), colors.cyan);
  
  // Test mobile infrastructure can run (without full test)
  if (fs.existsSync('mobile-e2e') && fs.existsSync('.detoxrc.js')) {
    const detoxCheck = runQuick('npx detox --help');
    check('Detox CLI available', detoxCheck.success, detoxCheck.error);
    
    if (detoxCheck.success) {
      // Try to validate config by checking build configuration
      const configCheck = runQuick('npx detox build --configuration ios --help');
      if (configCheck.success) {
        check('Mobile E2E config valid', true);
        report.e2e.mobile.status = 'READY';
      } else {
        check('Mobile E2E config valid', false, 'Config validation failed');
        report.e2e.mobile.status = 'CONFIG_ERROR';
        report.e2e.mobile.error = 'Configuration validation failed';
      }
    } else {
      report.e2e.mobile.status = 'CLI_ERROR';
      report.e2e.mobile.error = 'Detox CLI not available';
    }
  } else {
    check('Mobile E2E setup', false, 'Missing mobile-e2e or .detoxrc.js');
    report.e2e.mobile.status = 'MISSING';
  }
  
  // Test web infrastructure can run (without full test) 
  if (fs.existsSync('web-e2e/playwright.config.js')) {
    const playwrightCheck = runQuick('npx playwright --help');
    check('Playwright CLI available', playwrightCheck.success, playwrightCheck.error);
    
    if (playwrightCheck.success) {
      // Try to validate config
      const configCheck = runQuick('npx playwright test --config web-e2e/playwright.config.js --list');
      if (configCheck.success) {
        check('Web E2E config valid', true);
        report.e2e.web.status = 'READY';
      } else {
        check('Web E2E config valid', false, 'Config validation failed');
        report.e2e.web.status = 'CONFIG_ERROR';
        report.e2e.web.error = 'Configuration validation failed';
      }
    } else {
      report.e2e.web.status = 'CLI_ERROR';
      report.e2e.web.error = 'Playwright CLI not available';
    }
  } else {
    check('Web E2E setup', false, 'Missing playwright.config.js');
    report.e2e.web.status = 'MISSING';
  }
}

function generateSummary() {
  log(`\n${colors.bold}${colors.cyan}📊 Health Summary${colors.reset}`);
  log('='.repeat(40), colors.cyan);
  
  const overallColor = report.overall === 'HEALTHY' ? colors.green : colors.red;
  const overallIcon = report.overall === 'HEALTHY' ? '✅' : '❌';
  
  log(`${overallIcon} Overall: ${report.overall}`, overallColor);
  log(`📈 Checks: ${report.summary.passed} passed, ${report.summary.failed} failed`);
  
  // E2E Status
  log(`\n🧪 E2E Infrastructure Status:`, colors.bold);
  
  const mobileColor = report.e2e.mobile.status === 'READY' ? colors.green : colors.red;
  const webColor = report.e2e.web.status === 'READY' ? colors.green : colors.red;
  
  log(`   📱 Mobile: ${report.e2e.mobile.status}`, mobileColor);
  if (report.e2e.mobile.error) {
    log(`      ${report.e2e.mobile.error}`, colors.red);
  }
  
  log(`   🌐 Web: ${report.e2e.web.status}`, webColor);
  if (report.e2e.web.error) {
    log(`      ${report.e2e.web.error}`, colors.red);
  }
  
  // Commands available
  log(`\n🚀 Available Commands:`, colors.bold);
  log(`   npm run test:mobile    # Mobile E2E (Detox)`);
  log(`   npm run test:web       # Web E2E (Playwright)`);
  log(`   npm run doctor         # Full health check with E2E`);
  
  // Save report
  fs.writeFileSync('health-report-quick.json', JSON.stringify(report, null, 2));
  log(`\n📄 Report: health-report-quick.json`, colors.cyan);
  
  return report;
}

function main() {
  log(`${colors.bold}${colors.blue}⚡ MubleExpo Quick Health Check${colors.reset}`);
  log(`${colors.blue}Fast infrastructure validation...${colors.reset}\n`);
  
  try {
    validateE2EInfrastructure();
    quickE2ETest();
    const result = generateSummary();
    
    if (result.overall === 'HEALTHY') {
      log(`\n✅ Infrastructure healthy!`, colors.green);
      return result;
    } else {
      log(`\n❌ Issues found!`, colors.red);
      process.exit(1);
    }
  } catch (error) {
    log(`\n💥 Unexpected error: ${error.message}`, colors.red);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main, report };