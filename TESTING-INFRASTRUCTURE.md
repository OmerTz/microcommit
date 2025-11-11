# MubleExpo Testing Infrastructure

## Overview
MubleExpo has unified testing infrastructure for both mobile (Detox) and web (Playwright) with **identical interfaces**.

## Quick Start

### Mobile Testing (Detox)
```bash
# Run all mobile tests
npm run test:mobile

# Run specific test
npx detox test --configuration ios mobile-e2e/auth-onboarding-dashboard-sanity.test.js
```

### Web Testing (Playwright)
```bash
# Run all web tests
npm run test:web

# Run with UI
npm run playwright:test:ui

# Run headed (see browser)
npm run playwright:test:headed

# View report
npm run playwright:report
```

## Same Interface Example

The interface is **IDENTICAL** between mobile and web. Only the setup differs:

### Mobile (Detox)
```javascript
describe('Test', () => {
  beforeAll(async () => {
    await device.launchApp();
    helpers.initTest('test-name');
  });

  it('should test', async () => {
    // ALL METHODS IDENTICAL
    await helpers.auth.login(email, password, true);
    await helpers.nav.handleOnboarding('skip', true);
    await helpers.dashboard.verifyDashboardState({...});
  });
});
```

### Web (Playwright)
```javascript
test.describe('Test', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.goto(config.api.baseUrl);
    helpers.setup('test-name', page, context); // Only difference!
  });

  test('should test', async () => {
    // ALL METHODS IDENTICAL
    await helpers.auth.login(email, password, true);
    await helpers.nav.handleOnboarding('skip', true);
    await helpers.dashboard.verifyDashboardState({...});
  });
});
```

## Shared Helper Methods

All these methods work **identically** in both infrastructures:

### Authentication
- `helpers.auth.login(email, password, screenshots)`
- `helpers.auth.signup(userData, screenshots)`
- `helpers.auth.quickLogin()`
- `helpers.auth.logout()`
- `helpers.auth.verifyAuthError(message)`

### Navigation
- `helpers.nav.handleOnboarding(action, screenshots)`
- `helpers.nav.navigateToDashboard(screenshots)`
- `helpers.nav.navigateToTab(tabName, screenshots)`
- `helpers.nav.goBack()`
- `helpers.nav.verifyScreen(screenName, elements)`

### Dashboard
- `helpers.dashboard.addPet(petData, screenshots)`
- `helpers.dashboard.scheduleAppointment(data, screenshots)`
- `helpers.dashboard.checkMessages(screenshots)`
- `helpers.dashboard.findVet(criteria, screenshots)`
- `helpers.dashboard.verifyDashboardState(state)`

### Core Utilities
- `helpers.takeScreenshot(name, category)`
- `helpers.logStep(message, success)`
- `helpers.logPhase(phase)`
- `helpers.waitForElement(selector, timeout, desc)`
- `helpers.tapElement(selector, desc)`
- `helpers.typeText(selector, text, desc)`
- `helpers.verifyElements(elements)`
- `helpers.generateReport(results)`
- `helpers.retryAction(action, retries, desc)`
- `helpers.handleAppState()`

### Shortcuts
- `helpers.quickLogin()` - Login with test account
- `helpers.skipOnboarding()` - Skip onboarding
- `helpers.goToDashboard()` - Navigate to dashboard

## Screenshot Management

Both infrastructures use **identical** screenshot organization:

```
mobile-e2e/                       web-e2e/screenshots/
├── .artifacts/                   ├── auth/
│   ├── auth/                     │   └── test-name/
│   │   └── test-name/            │       ├── 01-login-initial.png
│   │       ├── 01-login.png      │       └── 02-login-filled.png
│   │       └── 02-filled.png     ├── dashboard/
│   └── dashboard/                └── errors/
```

Format: `{counter}-{state-name}.png`

## Configuration

Both use the **same** configuration structure:

```javascript
// mobile-e2e/config/testConfig.js
// web-e2e/config/testConfig.js

module.exports = {
  screenshots: {
    enabled: true,
    format: 'png',
    categories: { auth, onboarding, dashboard, ... }
  },
  testAccounts: {
    owner: { email: 'owner@test.com', password: 'Test123!' }
  },
  timeouts: {
    short: 3000,
    medium: 5000,
    long: 10000
  },
  testData: {
    pets: [...],
    appointments: [...]
  }
};
```

## File Structure

```
MubleExpo/
├── mobile-e2e/                   # Detox tests
│   ├── helpers/
│   │   ├── testHelpers.js
│   │   ├── authHelpers.js
│   │   ├── navigationHelpers.js
│   │   ├── dashboardHelpers.js
│   │   └── index.js
│   ├── config/
│   │   └── testConfig.js
│   └── tests/
│       └── *.test.js
│
├── web-e2e/                      # Playwright tests (SAME STRUCTURE)
│   ├── helpers/
│   │   ├── testHelpers.js
│   │   ├── authHelpers.js
│   │   ├── navigationHelpers.js
│   │   ├── dashboardHelpers.js
│   │   └── index.js
│   ├── config/
│   │   └── testConfig.js
│   └── tests/
│       └── *.test.js
```

## Test Reports

Both generate reports in the same format:

```javascript
{
  "testName": "sanity-test",
  "passed": true,
  "duration": "2m 15s",
  "screenshotCount": 8,
  "timestamp": "2024-08-27T21:30:00Z",
  "steps": [
    { "name": "Authentication", "passed": true },
    { "name": "Onboarding", "passed": true },
    { "name": "Dashboard", "passed": true }
  ]
}
```

## Running Both Test Suites

```bash
# Run all tests (mobile + web)
npm run test:all

# Run mobile only
npm run test:mobile

# Run web only
npm run test:web
```

## Key Benefits

1. **Learn Once, Use Everywhere**: Same API for mobile and web testing
2. **Code Reuse**: Test logic can be shared between platforms
3. **Consistency**: Same patterns, naming, and organization
4. **Maintainability**: Updates to helpers benefit both platforms
5. **Onboarding**: New team members learn one interface

## Migration Guide

To convert a Detox test to Playwright:

1. Change imports:
```javascript
// Detox
describe('Test', () => {

// Playwright
const { test } = require('@playwright/test');
test.describe('Test', () => {
```

2. Update setup:
```javascript
// Detox
beforeAll(async () => {
  await device.launchApp();
  helpers.initTest('test-name');
});

// Playwright
test.beforeEach(async ({ page, context }) => {
  await page.goto(config.api.baseUrl);
  helpers.setup('test-name', page, context);
});
```

3. **Everything else stays the same!**

## Tips

- Use `helpers.retryAction()` for flaky elements in both
- Screenshots automatically organized by category
- Reports generated in JSON for CI/CD integration
- Both support parallel execution (configure in respective configs)
- Mobile tests use device simulator, web tests use real browser