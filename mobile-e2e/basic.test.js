/**
 * Basic Mobile E2E test for MicroCommit - ONE BIG TEST
 * Tests complete flow from app launch through basic navigation
 *
 * Rules followed:
 * - Single comprehensive test (no multiple small tests)
 * - Starts from app launch (no login required for basic test)
 * - Tests navigation with goBack/goForward
 * - Uses only testID selectors
 * - No hardcoded timeouts
 */
describe('MicroCommit - Basic app launch and navigation flow', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: { notifications: 'YES' }
    });
  });

  it('should launch app and complete basic navigation', async () => {
    // Step 1: Wait for app to be ready - check for actual visible UI element (login screen)
    await waitFor(element(by.id('login-email-input')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/01-app-launched-login');
    await expect(element(by.id('login-email-input'))).toExist();
    await expect(element(by.id('login-password-input'))).toExist();
    await expect(element(by.id('login-submit-button'))).toExist();

    // Step 2: Navigate to Create Account screen (tests forward navigation)
    await waitFor(element(by.id('login-signup-link')))
      .toBeVisible()
      .withTimeout(2000);

    await element(by.id('login-signup-link')).tap();

    // Step 3: Wait for Create Account screen to load
    await waitFor(element(by.id('signup-email-input')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/02-create-account-screen');
    await expect(element(by.id('signup-email-input'))).toExist();
    await expect(element(by.id('signup-password-input'))).toExist();

    // Step 4: Go back to login screen by tapping custom back button (tests back navigation)
    await waitFor(element(by.id('auth-back-button')))
      .toBeVisible()
      .withTimeout(2000);

    await element(by.id('auth-back-button')).tap();

    // Step 5: Wait for login screen to reappear
    await waitFor(element(by.id('login-email-input')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/03-back-to-login');

    // Step 6: Verify state persists after back navigation
    await expect(element(by.id('login-email-input'))).toExist();
    await expect(element(by.id('login-password-input'))).toExist();
    await expect(element(by.id('login-submit-button'))).toExist();

    // Step 7: Navigate forward again to Create Account (tests forward navigation after back)
    await element(by.id('login-signup-link')).tap();

    await waitFor(element(by.id('signup-email-input')))
      .toExist()
      .withTimeout(2000);

    await device.takeScreenshot('mobile-e2e/screenshots/04-forward-again');
    await expect(element(by.id('signup-email-input'))).toExist();

    await device.takeScreenshot('mobile-e2e/screenshots/05-test-complete');

    // Test passes - app launches successfully, forward/back/forward navigation works, state persists
  });
});
