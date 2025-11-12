/**
 * E2E Test for Flow: Payment Failure & Retry
 * Flow ID: 102
 *
 * TODO: Implement actual test cases for this flow
 */

describe('Payment Failure & Retry Flow', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });

    const deepLinkUrl = `exp+tzrif86template://expo-development-client/?url=${encodeURIComponent(process.env.EX_DEV_LAUNCHER_URL)}`;
    console.log('Opening deep link:', deepLinkUrl);
    console.log('EX_DEV_LAUNCHER_URL:', process.env.EX_DEV_LAUNCHER_URL);

    await device.openURL({ url: deepLinkUrl });
  });

  it('should load successfully', async () => {
    // Verify app launched successfully by checking for login screen
    await waitFor(element(by.id('login-email-input')))
      .toExist()
      .withTimeout(2000);

    // Verify app loaded without crashing
    await expect(element(by.id('login-email-input'))).toExist();
  });

  // TODO: Add more test cases specific to this flow
  // it('should handle user interactions', async () => {
  //   ...
  // });
});
