const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Enable console logging
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  const url = 'http://localhost:8423/(payment)/payment-failed?errorType=card_declined&goalName=Test%20Goal&commitmentAmount=25&charityName=Test%20Charity&goalId=test-goal-123';

  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle2' });

  console.log('Waiting 3 seconds for content to render...');
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Take screenshot
  await page.screenshot({ path: '/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/debug-blank-screen.png', fullPage: true });
  console.log('Screenshot saved to debug-blank-screen.png');

  // Check if element exists
  const screenExists = await page.$('[data-testid="payment-failed-screen"]');
  console.log('payment-failed-screen element exists:', !!screenExists);

  // Get element HTML
  if (screenExists) {
    const innerHTML = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="payment-failed-screen"]');
      return el ? el.innerHTML.substring(0, 500) : 'Not found';
    });
    console.log('Element innerHTML (first 500 chars):', innerHTML);

    // Get computed styles
    const styles = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="payment-failed-screen"]');
      if (!el) return null;
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        position: computed.position,
        width: computed.width,
        height: computed.height,
        backgroundColor: computed.backgroundColor,
        color: computed.color,
      };
    });
    console.log('Computed styles:', JSON.stringify(styles, null, 2));
  }

  // Check for console errors
  const errors = await page.evaluate(() => {
    return window.__ERRORS__ || [];
  });
  console.log('Runtime errors:', errors);

  // Get all text content on page
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Body text content length:', bodyText.length);
  console.log('Body text (first 500 chars):', bodyText.substring(0, 500));

  console.log('Investigation complete. Browser will stay open for 10 seconds...');
  await new Promise(resolve => setTimeout(resolve, 10000));

  await browser.close();
})();
