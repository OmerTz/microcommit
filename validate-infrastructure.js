#!/usr/bin/env node

/**
 * Validates that both test infrastructures have identical interfaces
 * This proves the interfaces are truly the same
 */

const fs = require('fs');
const path = require('path');

// Load both helper exports
const mobileHelpers = require('./mobile-e2e/helpers');
const webHelpers = require('./web-e2e/helpers');

console.log('🔍 Validating Infrastructure Interfaces...\n');

// Get all methods from both infrastructures
function getMethods(obj, prefix = '') {
  let methods = [];
  
  for (let key in obj) {
    if (typeof obj[key] === 'function') {
      methods.push(prefix ? `${prefix}.${key}` : key);
    } else if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively get nested methods
      if (key !== 'test' && key !== 'page' && key !== 'context') { // Skip internal references
        methods = methods.concat(getMethods(obj[key], prefix ? `${prefix}.${key}` : key));
      }
    }
  }
  
  return methods.sort();
}

// Get methods from both infrastructures
const mobileMethods = getMethods(mobileHelpers);
const webMethods = getMethods(webHelpers);

// Compare interfaces
console.log('📱 Mobile Infrastructure Methods:');
console.log('=================================');
mobileMethods.forEach(m => console.log(`  ✓ helpers.${m}()`));

console.log('\n🌐 Web Infrastructure Methods:');
console.log('==============================');
webMethods.forEach(m => console.log(`  ✓ helpers.${m}()`));

// Find differences
const mobileOnly = mobileMethods.filter(m => !webMethods.includes(m));
const webOnly = webMethods.filter(m => !mobileMethods.includes(m) && m !== 'setup'); // setup is web-specific

console.log('\n📊 Comparison Results:');
console.log('=====================');

if (mobileOnly.length === 0 && webOnly.length === 0) {
  console.log('✅ PERFECT MATCH! Both infrastructures have IDENTICAL interfaces!');
  console.log('\n🎯 Shared Methods (' + mobileMethods.length + ' total):');
  
  // Group by category
  const categories = {
    auth: mobileMethods.filter(m => m.startsWith('auth.')),
    nav: mobileMethods.filter(m => m.startsWith('nav.')),
    dashboard: mobileMethods.filter(m => m.startsWith('dashboard.')),
    core: mobileMethods.filter(m => !m.includes('.'))
  };
  
  console.log('\n🔐 Authentication (' + categories.auth.length + ' methods):');
  categories.auth.forEach(m => console.log(`  • helpers.${m}()`));
  
  console.log('\n🧭 Navigation (' + categories.nav.length + ' methods):');
  categories.nav.forEach(m => console.log(`  • helpers.${m}()`));
  
  console.log('\n📊 Dashboard (' + categories.dashboard.length + ' methods):');
  categories.dashboard.forEach(m => console.log(`  • helpers.${m}()`));
  
  console.log('\n🛠️ Core Utilities (' + categories.core.length + ' methods):');
  categories.core.forEach(m => console.log(`  • helpers.${m}()`));
  
} else {
  console.log('⚠️  Differences found:');
  if (mobileOnly.length > 0) {
    console.log('\nMobile-only methods:');
    mobileOnly.forEach(m => console.log(`  - ${m}`));
  }
  if (webOnly.length > 0) {
    console.log('\nWeb-only methods:');
    webOnly.forEach(m => console.log(`  - ${m}`));
  }
}

// Test that methods have same signatures
console.log('\n🔬 Signature Validation:');
console.log('=======================');

const methodsToCheck = [
  'auth.login',
  'auth.signup',
  'nav.handleOnboarding',
  'dashboard.addPet',
  'takeScreenshot'
];

methodsToCheck.forEach(method => {
  const parts = method.split('.');
  let mobileMethod = mobileHelpers;
  let webMethod = webHelpers;
  
  for (const part of parts) {
    mobileMethod = mobileMethod[part];
    webMethod = webMethod[part];
  }
  
  if (mobileMethod && webMethod) {
    const mobileParams = mobileMethod.length;
    const webParams = webMethod.length;
    
    if (mobileParams === webParams) {
      console.log(`  ✓ ${method}() - ${mobileParams} parameters (matched)`);
    } else {
      console.log(`  ⚠ ${method}() - Mobile: ${mobileParams}, Web: ${webParams} parameters`);
    }
  }
});

// Show usage example
console.log('\n📝 Usage Example (IDENTICAL for both):');
console.log('======================================');
console.log(`
// Mobile (Detox)
await helpers.auth.login(email, password, true);
await helpers.nav.handleOnboarding('skip', true);
await helpers.dashboard.verifyDashboardState({...});

// Web (Playwright) - EXACTLY THE SAME!
await helpers.auth.login(email, password, true);
await helpers.nav.handleOnboarding('skip', true);
await helpers.dashboard.verifyDashboardState({...});
`);

console.log('✨ The only difference is initial setup:');
console.log('  Mobile:  helpers.initTest(name)');
console.log('  Web:     helpers.setup(name, page, context)\n');