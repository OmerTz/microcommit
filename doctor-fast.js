#!/usr/bin/env node

/**
 * Fast E2E health check - runs minimal smoke tests
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Fast E2E Health Check');
console.log('========================\n');

// Quick smoke test for mobile
console.log('📱 Mobile E2E Quick Check...');
try {
  // Just check if Detox can connect and app is installed
  const result = execSync('npx detox test --configuration ios --testNamePattern="should launch" --loglevel error', {
    timeout: 15000, // 15 seconds max
    encoding: 'utf8'
  });
  console.log('✅ Mobile E2E: PASS (app launches)');
} catch (error) {
  if (error.code === 'ETIMEDOUT') {
    console.log('❌ Mobile E2E: TIMEOUT (app not responding)');
  } else {
    console.log('❌ Mobile E2E: FAIL');
  }
}

// Quick smoke test for web
console.log('\n🌐 Web E2E Quick Check...');
try {
  // Just check if Playwright can launch browser
  const result = execSync('npx playwright test --config web-e2e/playwright.config.js --grep "launch" --reporter=line', {
    timeout: 15000, // 15 seconds max
    encoding: 'utf8'
  });
  console.log('✅ Web E2E: PASS (browser launches)');
} catch (error) {
  if (error.code === 'ETIMEDOUT') {
    console.log('❌ Web E2E: TIMEOUT (browser not responding)');
  } else {
    console.log('❌ Web E2E: FAIL');
  }
}

console.log('\n💡 For full E2E tests, the app needs to be running in dev mode');
console.log('   1. Start Expo: npm run dev');
console.log('   2. Run tests: npm run test:mobile or npm run test:web');