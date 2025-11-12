/**
 * Global E2E Test Setup
 * Handles iOS deep link confirmation dialog that appears when device.openURL() is called
 *
 * On iOS, when device.openURL() is called for the first time, the system shows a
 * confirmation dialog: "Open in 'MicroCommit'?"
 * This setup monkey-patches device.openURL to automatically handle the dialog.
 */

const PLATFORM = device.getPlatform ? device.getPlatform() : null;
const IS_IOS = PLATFORM === 'ios';

if (IS_IOS) {
  console.log('[E2E SETUP] iOS platform detected - installing deep link dialog handler');

  // Monkey-patch device.openURL to handle the dialog automatically
  const originalOpenURL = device.openURL.bind(device);

  device.openURL = async function(params) {
    try {
      console.log('[E2E SETUP] Opening URL:', params.url);

      // Call the original openURL
      const result = await originalOpenURL(params);

      // Wait for the dialog to potentially appear
      await new Promise(resolve => setTimeout(resolve, 300));

      // Try to find and tap the "Open" button
      try {
        const openButton = element(by.label('Open'));
        await openButton.multiTap(1);
        console.log('[E2E SETUP] iOS deep link confirmation dialog handled - tapped Open button');
      } catch (dialogError) {
        // Dialog might not appear on all scenarios (e.g., if permission was already granted)
        console.log('[E2E SETUP] Dialog not found (may already have permission)');
      }

      return result;
    } catch (error) {
      console.warn('[E2E SETUP] Error handling openURL:', error.message);
      throw error;
    }
  };
}
