/**
 * Global E2E Test Setup
 * Handles iOS deep link confirmation dialog that appears on first device.openURL() call
 *
 * On iOS, when a fresh simulator runs device.openURL() for the first time, the system
 * shows a confirmation dialog: "Open in 'MicroCommit'?"
 * This setup automatically handles that dialog by tapping "Open" button.
 * This allows all tests using deep links to proceed without manual intervention.
 */

let dialogHandled = false;

beforeAll(async () => {
  if (!dialogHandled && device.getPlatform && device.getPlatform() === 'ios') {
    try {
      console.log('[E2E SETUP] Handling iOS deep link confirmation dialog...');

      // Trigger a dummy deep link to prompt the confirmation dialog
      try {
        await device.openURL({ url: 'microcommit://test-permission' });
      } catch (e) {
        // Ignore errors from opening the dummy URL
        console.log('[E2E SETUP] Dummy deep link opened');
      }

      // Wait a moment for dialog to appear
      await new Promise(resolve => setTimeout(resolve, 500));

      // Accept the dialog by tapping "Open" button
      try {
        // The "Open" button in iOS system dialog
        await element(by.label('Open')).tap();
        console.log('[E2E SETUP] iOS deep link confirmation dialog handled');
      } catch (e) {
        // Dialog might not appear if permission already granted or on different iOS version
        console.log('[E2E SETUP] Dialog not found - permission may already be granted or device configuration differs');
      }

      // Mark as handled so we don't repeat this for subsequent test files
      dialogHandled = true;

      // Small delay to let permission propagate
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.warn('[E2E SETUP] Error in deep link setup:', error.message);
      // Continue with tests even if setup fails - dialog handling is best-effort
    }
  }
});
