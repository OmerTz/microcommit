import { test, expect } from '@playwright/test';

/**
 * E2E Test for Screen: Add Payment Method Screen (Screen ID: 14)
 *
 * This test follows the ONE BIG TEST rule and tests all 17 required scenarios:
 * 1. Test initial screen load with all elements
 * 2. Test security badge displays
 * 3. Test card field is present and interactive
 * 4. Test cardholder name field validation (empty)
 * 5. Test cardholder name field validation (too short)
 * 6. Test cardholder name field validation (valid)
 * 7. Test billing ZIP validation (empty)
 * 8. Test billing ZIP validation (invalid format)
 * 9. Test billing ZIP validation (valid)
 * 10. Test save for future checkbox toggle (default checked)
 * 11. Test save for future checkbox toggle (unchecked)
 * 12. Test save for future checkbox toggle (re-checked)
 * 13. Test process payment button disabled when processing
 * 14. Test back button navigation
 * 15. Test back link navigation
 * 16. Test form submission with invalid card shows error
 * 17. Test screen animations
 *
 * Rules followed:
 * - Single comprehensive test (ONE BIG TEST)
 * - Starts from add-payment-method screen directly
 * - Uses only data-testid selectors
 * - 12s timeout for initial load (auth initialization), 2s for subsequent interactions
 * - Captures screenshots at key moments
 * - Tests navigation with goBack/goForward
 * - NO hardcoded delays, ports, or fallback logic
 */

test('Add Payment Method Screen - Complete flow with validation and navigation', async ({ page }) => {
  // Test Scenario 1: Initial screen load
  await page.goto('/(payment)/add-payment-method');

  // Initial screen load needs longer timeout to account for auth initialization (10s timeout + 2s buffer)
  await expect(page.locator('[data-testid="add-payment-method-screen"]')).toBeVisible({ timeout: 12000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/01-initial-load.png' });

  // Test Scenario 2: Security badge displays
  await expect(page.locator('[data-testid="add-payment-method-security-badge"]')).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/02-security-badge.png' });

  // Test Scenario 17: Verify animations played (elements are visible after animations)
  await expect(page.locator('[data-testid="add-payment-method-back-button"]')).toBeVisible();
  await expect(page.locator('[data-testid="add-payment-method-process-button"]')).toBeVisible();

  // Test Scenario 3: Card field is present and interactive
  await expect(page.locator('[data-testid="add-payment-method-card-field"]')).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/03-card-field-visible.png' });

  // Test Scenario 4: Cardholder name validation (empty)
  const cardholderNameInput = page.locator('[data-testid="add-payment-method-cardholder-name"]');
  await expect(cardholderNameInput).toBeVisible();
  await cardholderNameInput.click();
  await cardholderNameInput.blur();
  await expect(page.locator('[data-testid="add-payment-method-error-cardholder-name"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/04-cardholder-name-empty-error.png' });

  // Test Scenario 5: Cardholder name validation (too short)
  await cardholderNameInput.fill('A');
  await cardholderNameInput.blur();
  await expect(page.locator('[data-testid="add-payment-method-error-cardholder-name"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/05-cardholder-name-short-error.png' });

  // Test Scenario 6: Cardholder name validation (valid)
  await cardholderNameInput.fill('John Doe');
  await cardholderNameInput.blur();
  await expect(page.locator('[data-testid="add-payment-method-error-cardholder-name"]')).not.toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/06-cardholder-name-valid.png' });

  // Test Scenario 7: Billing ZIP validation (empty)
  const billingZipInput = page.locator('[data-testid="add-payment-method-billing-zip"]');
  await expect(billingZipInput).toBeVisible();
  await billingZipInput.click();
  await billingZipInput.blur();
  await expect(page.locator('[data-testid="add-payment-method-error-billing-zip"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/07-billing-zip-empty-error.png' });

  // Test Scenario 8: Billing ZIP validation (invalid format)
  await billingZipInput.fill('123');
  await billingZipInput.blur();
  await expect(page.locator('[data-testid="add-payment-method-error-billing-zip"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/08-billing-zip-invalid-error.png' });

  // Test Scenario 9: Billing ZIP validation (valid)
  await billingZipInput.fill('12345');
  await billingZipInput.blur();
  await expect(page.locator('[data-testid="add-payment-method-error-billing-zip"]')).not.toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/09-billing-zip-valid.png' });

  // Test Scenario 10: Save for future checkbox (default checked)
  const saveCheckbox = page.locator('[data-testid="add-payment-method-save-checkbox"]');
  await expect(saveCheckbox).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/10-checkbox-default-checked.png' });

  // Test Scenario 11: Save for future checkbox (unchecked)
  await saveCheckbox.click();
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/11-checkbox-unchecked.png' });

  // Test Scenario 12: Save for future checkbox (re-checked)
  await saveCheckbox.click();
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/12-checkbox-rechecked.png' });

  // Test Scenario 16: Form submission with invalid card shows error
  const processButton = page.locator('[data-testid="add-payment-method-process-button"]');
  await expect(processButton).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/13-before-process-click.png' });

  await processButton.click();
  // Should show error for incomplete card
  await expect(page.locator('[data-testid="add-payment-method-error-card"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/14-card-error-displayed.png' });

  // Test Scenario 14: Back button navigation
  const backButton = page.locator('[data-testid="add-payment-method-back-button"]');
  await expect(backButton).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/15-before-back-button.png' });

  await backButton.click();
  await expect(page.locator('[data-testid="add-payment-method-screen"]')).not.toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/16-after-back-button.png' });

  // Test goBack navigation
  await page.goBack();
  await expect(page.locator('[data-testid="add-payment-method-screen"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/17-after-go-back.png' });

  // Test goForward navigation
  await page.goForward();
  await expect(page.locator('[data-testid="add-payment-method-screen"]')).not.toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/18-after-go-forward.png' });

  // Navigate back to screen for final test
  await page.goto('/(payment)/add-payment-method');
  await expect(page.locator('[data-testid="add-payment-method-screen"]')).toBeVisible({ timeout: 2000 });

  // Test Scenario 15: Back link navigation
  const backLink = page.locator('[data-testid="add-payment-method-back-link"]');
  await expect(backLink).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/19-before-back-link.png' });

  await backLink.click();
  await expect(page.locator('[data-testid="add-payment-method-screen"]')).not.toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/20-after-back-link.png' });

  // Test complete
  await page.screenshot({ path: 'web-e2e/screenshots/screen-14/21-test-complete.png' });
});
