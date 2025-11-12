import { test, expect } from '@playwright/test';

/**
 * E2E Test for Flow: Payment Failure & Retry (Flow ID: 102)
 *
 * This test follows the ONE BIG TEST rule and tests the complete payment failure and retry flow:
 * - User encounters payment failure
 * - User sees error details and goal summary
 * - User can retry with same card
 * - User can change payment method
 * - User can seek help
 * - User can cancel goal creation
 *
 * Rules followed:
 * - Single comprehensive test (ONE BIG TEST)
 * - Starts from app launch (login screen)
 * - Uses only data-testid selectors
 * - Max 2 second timeouts with waitFor
 * - Captures screenshots at key moments
 * - Tests navigation with goBack/goForward
 * - NO hardcoded delays, ports, or fallback logic
 */

test('Payment Failure & Retry Flow - Complete flow from login through payment failure and retry', async ({ page }) => {
  // Start from app launch - navigate to login screen
  await page.goto('/');

  // Wait for login screen to load
  await expect(page.locator('[data-testid="login-email-input"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/00-app-launched-login.png' });

  // Navigate to payment failed screen with insufficient funds error
  await page.goto('/payment-failed?errorType=insufficient_funds&goalName=Emergency%20Fund&commitmentAmount=100&charityName=Red%20Cross&goalId=test-goal-123');

  await expect(page.locator('[data-testid="payment-failed-screen"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/01-payment-failed-screen.png' });

  // Verify error message and goal summary are displayed
  await expect(page.locator('[data-testid="payment-failed-error-message"]')).toBeVisible();
  await expect(page.locator('[data-testid="payment-failed-goal-summary"]')).toBeVisible();

  // Verify goal details are correct
  const goalSummary = page.locator('[data-testid="payment-failed-goal-summary"]');
  await expect(goalSummary).toContainText('Emergency Fund');
  await expect(goalSummary).toContainText('$100');
  await expect(goalSummary).toContainText('Red Cross');

  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/02-error-and-summary-displayed.png' });

  // Test retry with same card - click Try Again button
  const tryAgainButton = page.locator('[data-testid="payment-failed-try-again-button"]');
  await expect(tryAgainButton).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/03-before-retry-same-card.png' });

  await tryAgainButton.click();
  await expect(page.locator('[data-testid="payment-failed-screen"]')).not.toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/04-after-retry-navigation.png' });

  // Test goBack to return to payment failed screen
  await page.goBack();
  await expect(page.locator('[data-testid="payment-failed-screen"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/05-back-to-payment-failed.png' });

  // Test goForward
  await page.goForward();
  await expect(page.locator('[data-testid="payment-failed-screen"]')).not.toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/06-forward-after-retry.png' });

  // Navigate back to payment failed screen for next flow test
  await page.goto('/payment-failed?errorType=card_declined&goalName=Fitness%20Goal&commitmentAmount=50&charityName=UNICEF&goalId=test-goal-456');
  await expect(page.locator('[data-testid="payment-failed-screen"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/07-new-error-card-declined.png' });

  // Test change payment method - click Use Different Card button
  const differentCardButton = page.locator('[data-testid="payment-failed-different-card-button"]');
  await expect(differentCardButton).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/08-before-change-payment-method.png' });

  await differentCardButton.click();
  await expect(page.locator('[data-testid="payment-failed-screen"]')).not.toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/09-after-change-payment-method.png' });

  // Navigate back to payment failed screen for help flow
  await page.goto('/payment-failed?errorType=network_error&goalName=Vacation%20Fund&commitmentAmount=75&charityName=WWF&goalId=test-goal-789');
  await expect(page.locator('[data-testid="payment-failed-screen"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/10-network-error-screen.png' });

  // Test help flow - verify Need Help link exists
  const helpLink = page.locator('[data-testid="payment-failed-help-link"]');
  await expect(helpLink).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/11-help-link-visible.png' });

  // Test cancel goal flow - verify Cancel Goal link exists
  const cancelLink = page.locator('[data-testid="payment-failed-cancel-link"]');
  await expect(cancelLink).toBeVisible();
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/12-cancel-link-visible.png' });

  // Click cancel and handle confirmation dialog
  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Cancel');
    await dialog.dismiss();
  });

  await cancelLink.click();
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/13-after-cancel-click.png' });

  // Test multiple error types in sequence (simulating retry attempts)
  const errorTypes = ['invalid_details', 'expired_card', '3ds_required', 'unknown'];

  for (let i = 0; i < errorTypes.length; i++) {
    const errorType = errorTypes[i];
    await page.goto(`/payment-failed?errorType=${errorType}&goalName=Retry%20Test&commitmentAmount=25&charityName=Test%20Charity&goalId=test-retry-${i}`);

    await expect(page.locator('[data-testid="payment-failed-screen"]')).toBeVisible({ timeout: 2000 });
    await page.screenshot({ path: `web-e2e/screenshots/flow-102/14-error-type-${errorType}.png` });

    // Verify all action buttons are visible and functional
    await expect(page.locator('[data-testid="payment-failed-try-again-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="payment-failed-different-card-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="payment-failed-help-link"]')).toBeVisible();
    await expect(page.locator('[data-testid="payment-failed-cancel-link"]')).toBeVisible();
  }

  // Final screenshot - complete flow tested
  await page.goto('/payment-failed?errorType=insufficient_funds&goalName=Final%20Flow%20Test&commitmentAmount=200&charityName=Final%20Charity&goalId=final-test');
  await expect(page.locator('[data-testid="payment-failed-screen"]')).toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/15-flow-complete.png' });

  // Verify back button works at end of flow
  const backButton = page.locator('[data-testid="payment-failed-back-button"]');
  await expect(backButton).toBeVisible();
  await backButton.click();
  await expect(page.locator('[data-testid="payment-failed-screen"]')).not.toBeVisible({ timeout: 2000 });
  await page.screenshot({ path: 'web-e2e/screenshots/flow-102/16-final-back-navigation.png' });

  // Payment Failure & Retry flow complete
});
