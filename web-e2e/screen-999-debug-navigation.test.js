const { test, expect } = require('@playwright/test');

test('debug navigation flow', async ({ page }) => {
  console.log('\n=== STEP 1: Navigate to payment-failed screen ===');
  await page.goto('/(payment)/payment-failed?errorType=card_declined&goalName=Test%20Goal&commitmentAmount=25&charityName=Test%20Charity&goalId=test-goal-123');

  console.log('Waiting for payment-failed-screen to be visible...');
  await page.locator('[data-testid="payment-failed-screen"]').waitFor({ state: 'visible', timeout: 10000 });
  console.log('✅ payment-failed-screen is VISIBLE');

  console.log('\n=== STEP 2: Click different card button ===');
  const diffCardBtn = page.locator('[data-testid="payment-failed-different-card-button"]');
  await diffCardBtn.waitFor({ state: 'visible', timeout: 5000 });
  console.log('Different card button visible, clicking...');
  await diffCardBtn.click();

  console.log('\n=== STEP 3: Wait for add-payment-method screen ===');
  await page.locator('[data-testid="add-payment-method-screen"]').waitFor({ state: 'visible', timeout: 10000 });
  console.log('✅ add-payment-method-screen is VISIBLE');
  console.log('Current URL:', page.url());

  console.log('\n=== STEP 4: Fill some fields ===');
  await page.locator('[data-testid="cardholder-name-input"]').fill('John Doe');
  await page.locator('[data-testid="billing-zip-input"]').fill('12345');
  console.log('✅ Fields filled');

  console.log('\n=== STEP 5: Browser goBack() ===');
  console.log('Current URL before goBack:', page.url());
  await page.goBack();

  console.log('\n=== STEP 6: Check what is visible after goBack ===');
  console.log('Current URL after goBack:', page.url());

  // Wait a moment for navigation to settle
  await page.waitForLoadState('networkidle');
  console.log('Network is idle');

  // Check what's visible
  const paymentFailedVisible = await page.locator('[data-testid="payment-failed-screen"]').isVisible().catch(() => false);
  const addPaymentVisible = await page.locator('[data-testid="add-payment-method-screen"]').isVisible().catch(() => false);

  console.log('payment-failed-screen visible?', paymentFailedVisible);
  console.log('add-payment-method-screen visible?', addPaymentVisible);

  // Get page content to see what's actually on screen
  const bodyText = await page.locator('body').textContent();
  console.log('\nBody text preview (first 500 chars):', bodyText.substring(0, 500));

  // Check for any error messages
  const errorElements = await page.locator('[data-testid*="error"]').all();
  console.log('Number of error elements found:', errorElements.length);

  // Take screenshot to see what's on screen
  await page.screenshot({ path: '/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/debug-goback.png', fullPage: true });
  console.log('\n📸 Screenshot saved to debug-goback.png');

  console.log('\n=== STEP 7: Try goForward() ===');
  await page.goForward();
  await page.waitForLoadState('networkidle');
  console.log('Current URL after goForward:', page.url());

  const addPaymentVisibleAfterForward = await page.locator('[data-testid="add-payment-method-screen"]').isVisible().catch(() => false);
  console.log('add-payment-method-screen visible after forward?', addPaymentVisibleAfterForward);

  console.log('\n=== TEST COMPLETE ===');
});
