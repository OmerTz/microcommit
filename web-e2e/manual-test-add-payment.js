const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture console messages
  page.on('console', msg => {
    console.log(`[BROWSER ${msg.type()}]:`, msg.text());
  });

  // Capture errors
  page.on('pageerror', error => {
    console.log(`[PAGE ERROR]:`, error.message);
  });

  // Navigate to add-payment-method screen
  console.log('Navigating to add-payment-method screen...');
  await page.goto('http://localhost:8423/(payment)/add-payment-method');

  // Wait for screen to load or timeout
  try {
    await page.waitForSelector('[data-testid="add-payment-method-screen"]', { timeout: 5000 });
    console.log('✅ add-payment-method-screen testID found');
  } catch (e) {
    console.log('❌ add-payment-method-screen testID NOT found');
  }

  // Take screenshot
  await page.screenshot({ path: '/tmp/manual-add-payment-method.png', fullPage: true });
  console.log('Screenshot saved to /tmp/manual-add-payment-method.png');

  // Get page HTML
  const html = await page.content();
  console.log('\n=== PAGE HTML ===');
  console.log(html.substring(0, 2000)); // First 2000 chars

  // Check if elements exist in DOM
  const elements = [
    'add-payment-method-screen',
    'add-payment-method-security-badge',
    'add-payment-method-card-number',
    'add-payment-method-process-button'
  ];

  console.log('\n=== ELEMENT VISIBILITY ===');
  for (const testId of elements) {
    const el = await page.locator(`[data-testid="${testId}"]`);
    const count = await el.count();
    const isVisible = count > 0 ? await el.isVisible().catch(() => false) : false;
    console.log(`${testId}: count=${count}, visible=${isVisible}`);
  }

  // Wait for manual inspection
  console.log('\nBrowser will stay open for 30 seconds for manual inspection...');
  await page.waitForTimeout(30000);

  await browser.close();
})();
