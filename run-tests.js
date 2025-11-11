#!/usr/bin/env node

/**
 * Unified test runner for MubleExpo
 * Shows how both infrastructures work with same interface
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0] || 'help';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function runCommand(cmd, description) {
  log(`\n🚀 ${description}`, colors.cyan);
  log(`   Command: ${cmd}`, colors.bright);
  console.log('');
  
  try {
    execSync(cmd, { stdio: 'inherit' });
    log(`✅ ${description} completed`, colors.green);
    return true;
  } catch (error) {
    log(`❌ ${description} failed`, colors.red);
    return false;
  }
}

function showHelp() {
  log('\n🧪 MubleExpo Unified Test Runner', colors.bright);
  log('================================\n', colors.bright);
  
  log('Both infrastructures use the SAME interface:', colors.green);
  log('  helpers.auth.login()');
  log('  helpers.nav.handleOnboarding()');
  log('  helpers.dashboard.verifyDashboardState()');
  log('  helpers.takeScreenshot()\n');
  
  log('Commands:', colors.yellow);
  log('  node run-tests.js mobile       - Run Detox mobile tests');
  log('  node run-tests.js web          - Run Playwright web tests');
  log('  node run-tests.js both         - Run both test suites');
  log('  node run-tests.js compare      - Run same test on both platforms');
  log('  node run-tests.js screenshots  - Show screenshot locations');
  log('  node run-tests.js setup        - Setup both infrastructures\n');
  
  log('Quick commands:', colors.cyan);
  log('  npm run test:mobile    - Detox tests');
  log('  npm run test:web       - Playwright tests');
  log('  npm run test:all       - Both suites\n');
}

function runMobileTests() {
  log('\n📱 Running Mobile Tests (Detox)', colors.blue);
  log('================================', colors.blue);
  
  return runCommand(
    'npx detox test --configuration ios mobile-e2e/tests/sanity-with-infrastructure.test.js',
    'Mobile Sanity Test'
  );
}

function runWebTests() {
  log('\n🌐 Running Web Tests (Playwright)', colors.blue);
  log('===================================', colors.blue);
  
  return runCommand(
    'npx playwright test web-e2e/tests/sanity-with-infrastructure.test.js',
    'Web Sanity Test'
  );
}

function runBothTests() {
  log('\n🎯 Running Both Test Suites', colors.bright);
  log('============================', colors.bright);
  
  const mobileSuccess = runMobileTests();
  const webSuccess = runWebTests();
  
  log('\n📊 Test Results:', colors.bright);
  log(`   Mobile: ${mobileSuccess ? '✅ PASSED' : '❌ FAILED'}`, mobileSuccess ? colors.green : colors.red);
  log(`   Web:    ${webSuccess ? '✅ PASSED' : '❌ FAILED'}`, webSuccess ? colors.green : colors.red);
  
  return mobileSuccess && webSuccess;
}

function compareTests() {
  log('\n🔄 Running Same Test on Both Platforms', colors.bright);
  log('=======================================', colors.bright);
  
  // Run the auth-onboarding-dashboard sanity test on both
  log('\nThis demonstrates the IDENTICAL interface:', colors.yellow);
  
  const mobileCmd = 'npx detox test --configuration ios mobile-e2e/auth-onboarding-dashboard-sanity.test.js';
  const webCmd = 'npx playwright test web-e2e/tests/auth-onboarding-dashboard-sanity.test.js';
  
  const mobileSuccess = runCommand(mobileCmd, 'Mobile Version');
  const webSuccess = runCommand(webCmd, 'Web Version');
  
  log('\n✨ Comparison Results:', colors.bright);
  log('   Both tests use the EXACT same helper methods!', colors.green);
  log(`   Mobile: ${mobileSuccess ? '✅' : '❌'}`, mobileSuccess ? colors.green : colors.red);
  log(`   Web:    ${webSuccess ? '✅' : '❌'}`, webSuccess ? colors.green : colors.red);
}

function showScreenshots() {
  log('\n📸 Screenshot Organization', colors.bright);
  log('=========================', colors.bright);
  
  log('\nBoth infrastructures use IDENTICAL organization:', colors.green);
  log('\nFormat: {counter}-{state-name}.png', colors.yellow);
  log('Path: {category}/{test-name}/{filename}\n', colors.yellow);
  
  // Check mobile screenshots
  const mobileDir = 'mobile-e2e/.artifacts';
  if (fs.existsSync(mobileDir)) {
    log('📱 Mobile Screenshots:', colors.blue);
    const categories = fs.readdirSync(mobileDir).filter(f => fs.statSync(path.join(mobileDir, f)).isDirectory());
    categories.forEach(cat => {
      log(`   ${cat}/`, colors.cyan);
      const tests = fs.readdirSync(path.join(mobileDir, cat)).filter(f => fs.statSync(path.join(mobileDir, cat, f)).isDirectory());
      tests.forEach(test => {
        const files = fs.readdirSync(path.join(mobileDir, cat, test));
        log(`     ${test}/ (${files.length} screenshots)`);
      });
    });
  }
  
  // Check web screenshots
  const webDir = 'web-e2e/screenshots';
  if (fs.existsSync(webDir)) {
    log('\n🌐 Web Screenshots:', colors.blue);
    const categories = fs.readdirSync(webDir).filter(f => fs.statSync(path.join(webDir, f)).isDirectory());
    categories.forEach(cat => {
      log(`   ${cat}/`, colors.cyan);
      const tests = fs.readdirSync(path.join(webDir, cat)).filter(f => fs.statSync(path.join(webDir, cat, f)).isDirectory());
      tests.forEach(test => {
        const files = fs.readdirSync(path.join(webDir, cat, test));
        log(`     ${test}/ (${files.length} screenshots)`);
      });
    });
  }
}

function setupInfrastructures() {
  log('\n⚙️  Setting Up Test Infrastructures', colors.bright);
  log('===================================', colors.bright);
  
  // Setup Playwright
  log('\n1. Setting up Playwright...', colors.yellow);
  runCommand('cd web-e2e && sh setup.sh', 'Playwright Setup');
  
  // Setup directories
  log('\n2. Creating directories...', colors.yellow);
  const dirs = [
    'mobile-e2e/.artifacts',
    'web-e2e/screenshots',
    'web-e2e/reports',
    'web-e2e/test-results'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      log(`   Created: ${dir}`, colors.green);
    } else {
      log(`   Exists: ${dir}`, colors.cyan);
    }
  });
  
  log('\n✅ Setup complete!', colors.green);
}

// Main execution
switch (command) {
  case 'mobile':
    runMobileTests();
    break;
  case 'web':
    runWebTests();
    break;
  case 'both':
    runBothTests();
    break;
  case 'compare':
    compareTests();
    break;
  case 'screenshots':
    showScreenshots();
    break;
  case 'setup':
    setupInfrastructures();
    break;
  case 'help':
  default:
    showHelp();
    break;
}

log(''); // Final newline