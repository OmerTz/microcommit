/**
 * E2E Test for Screen: Payment Screen
 * Screen ID: 167
 *
 * TODO: Implement actual test cases for this screen
 */

describe('Payment Screen Screen', () => {
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

  // TODO: Add more test cases specific to this screen
  // it('should handle user interactions', async () => {
  //   ...
  // });
});
