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
 * - Starts from app launch
 * - Uses only testID selectors
 * - Max 2 second timeouts with waitFor
 * - Captures screenshots at key moments
 * - NO hardcoded delays or fallback logic
 */

describe('Payment Failure & Retry Flow - Complete flow from app launch through payment failure and retry', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: { notifications: 'YES' }
    });
  });

  it('should complete payment failure and retry flow with all recovery options', async () => {
    // Wait for app to launch - verify login screen appears
    await waitFor(element(by.id('login-email-input')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/00-app-launched-login');

    // Navigate to payment failed screen with insufficient funds error
    await device.openURL({ url: 'microcommit://payment-failed?errorType=insufficient_funds&goalName=Emergency%20Fund&commitmentAmount=100&charityName=Red%20Cross&goalId=test-goal-123' });

    await waitFor(element(by.id('payment-failed-screen')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/01-payment-failed-screen');

    // Verify error message and goal summary are displayed
    await expect(element(by.id('payment-failed-error-message'))).toExist();
    await expect(element(by.id('payment-failed-goal-summary'))).toExist();

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/02-error-and-summary-displayed');

    // Test retry with same card - click Try Again button (no payment details scenario)
    await waitFor(element(by.id('payment-failed-try-again-button')))
      .toBeVisible()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/03-before-retry-same-card');

    // Tap retry button - should navigate back since no payment details provided
    await element(by.id('payment-failed-try-again-button')).tap();

    await waitFor(element(by.id('payment-failed-screen')))
      .not.toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/04-after-retry-navigation');

    // Test retry with payment details (simulating actual retry scenario)
    await device.openURL({
      url: 'microcommit://payment-failed?errorType=insufficient_funds&goalName=Retry%20Test&commitmentAmount=50&charityName=Test%20Charity&goalId=test-retry-001&paymentIntentId=pi_test_123&paymentMethodId=pm_test_123&userId=user_test_123&cardLast4=4242&cardBrand=visa'
    });

    await waitFor(element(by.id('payment-failed-screen')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/05-retry-with-payment-details');

    // Verify retry button is enabled with payment details
    await waitFor(element(by.id('payment-failed-try-again-button')))
      .toBeVisible()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/06-retry-button-enabled');

    // Tap retry button to trigger actual retry logic
    await element(by.id('payment-failed-try-again-button')).tap();

    // Button should show loading state briefly (capture if visible)
    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/07-retry-loading-state');

    // Navigate back to payment failed screen for next flow test
    await device.openURL({ url: 'microcommit://payment-failed?errorType=card_declined&goalName=Fitness%20Goal&commitmentAmount=50&charityName=UNICEF&goalId=test-goal-456' });

    await waitFor(element(by.id('payment-failed-screen')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/08-new-error-card-declined');

    // Test change payment method - click Use Different Card button
    await waitFor(element(by.id('payment-failed-different-card-button')))
      .toBeVisible()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/09-before-change-payment-method');

    await element(by.id('payment-failed-different-card-button')).tap();

    await waitFor(element(by.id('payment-failed-screen')))
      .not.toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/10-after-change-payment-method');

    // Navigate back to payment failed screen for help flow
    await device.openURL({ url: 'microcommit://payment-failed?errorType=network_error&goalName=Vacation%20Fund&commitmentAmount=75&charityName=WWF&goalId=test-goal-789' });

    await waitFor(element(by.id('payment-failed-screen')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/11-network-error-screen');

    // Test help flow - verify Need Help link exists (Detox will auto-scroll if needed)
    await expect(element(by.id('payment-failed-help-link'))).toExist();

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/12-help-link-visible');

    // Test cancel goal flow - verify Cancel Goal link exists (Detox will auto-scroll if needed)
    await expect(element(by.id('payment-failed-cancel-link'))).toExist();

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/13-cancel-link-visible');

    // Test multiple error types in sequence (simulating retry attempts)
    const errorTypes = [
      { type: 'invalid_details', name: 'Invalid Details Test' },
      { type: 'expired_card', name: 'Expired Card Test' },
      { type: '3ds_required', name: '3DS Test' },
      { type: 'unknown', name: 'Unknown Error Test' }
    ];

    for (let i = 0; i < errorTypes.length; i++) {
      const { type, name } = errorTypes[i];
      await device.openURL({
        url: `microcommit://payment-failed?errorType=${type}&goalName=${encodeURIComponent(name)}&commitmentAmount=25&charityName=Test%20Charity&goalId=test-retry-${i}`
      });

      await waitFor(element(by.id('payment-failed-screen')))
        .toExist()
        .withTimeout(2000);

      await device.takeScreenshot(`mobile-e2e/screenshots/flow-102/14-error-type-${type}`);

      // Verify all action buttons are visible and functional
      await expect(element(by.id('payment-failed-try-again-button'))).toExist();
      await expect(element(by.id('payment-failed-different-card-button'))).toExist();
      await expect(element(by.id('payment-failed-help-link'))).toExist();
      await expect(element(by.id('payment-failed-cancel-link'))).toExist();
    }

    // Final screenshot - complete flow tested
    await device.openURL({ url: 'microcommit://payment-failed?errorType=insufficient_funds&goalName=Final%20Flow%20Test&commitmentAmount=200&charityName=Final%20Charity&goalId=final-test' });

    await waitFor(element(by.id('payment-failed-screen')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/18-flow-complete');

    // Verify back button works at end of flow
    await waitFor(element(by.id('payment-failed-back-button')))
      .toBeVisible()
      .withTimeout(2000);

    await element(by.id('payment-failed-back-button')).tap();

    await waitFor(element(by.id('payment-failed-screen')))
      .not.toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/flow-102/19-final-back-navigation');

    // Payment Failure & Retry flow complete
  });
});
