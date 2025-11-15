/**
 * Manual debugging script to test goBack() behavior
 * Run with: node debug-goback-behavior.js
 */

const { chromium } = require('playwright');

async function testScenario(browser, scenarioName, url, buttonTestId) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`Testing: ${scenarioName}`);
  console.log('='.repeat(80));

  const context = await browser.newContext();
  const page = await context.newPage();

  // Track console messages and errors
  page.on('console', msg => console.log(`[CONSOLE ${msg.type()}]:`, msg.text()));
  page.on('pageerror', err => console.log(`[PAGE ERROR]:`, err.message));

  try {
    // Step 1: Navigate to payment-failed
    console.log(`\n1. Navigating to: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    console.log(`   Current URL: ${page.url()}`);
    await page.screenshot({ path: `/tmp/${scenarioName}-01-payment-failed.png` });

    // Step 2: Wait for payment-failed screen
    console.log('\n2. Waiting for payment-failed-screen...');
    await page.waitForSelector('[data-testid="payment-failed-screen"]', { timeout: 5000 });
    console.log('   ✓ payment-failed-screen visible');

    // Step 3: Click the action button
    console.log(`\n3. Clicking button: ${buttonTestId}`);
    await page.click(`[data-testid="${buttonTestId}"]`);
    console.log('   ✓ Button clicked');

    // Step 4: Wait for navigation
    console.log('\n4. Waiting for screen change...');
    await page.waitForTimeout(1000);
    console.log(`   Current URL: ${page.url()}`);
    await page.screenshot({ path: `/tmp/${scenarioName}-02-after-click.png` });

    // Check what's visible
    const addPaymentVisible = await page.isVisible('[data-testid="add-payment-method-screen"]');
    console.log(`   add-payment-method-screen visible: ${addPaymentVisible}`);

    // Step 5: Call goBack()
    console.log('\n5. Calling page.goBack()...');
    await page.goBack();
    console.log(`   Immediate URL after goBack: ${page.url()}`);
    await page.screenshot({ path: `/tmp/${scenarioName}-03-immediate-goback.png` });

    // Step 6: Wait 1 second and check again
    console.log('\n6. Waiting 1 second...');
    await page.waitForTimeout(1000);
    console.log(`   URL after 1s: ${page.url()}`);
    await page.screenshot({ path: `/tmp/${scenarioName}-04-after-1s.png` });

    // Step 7: Wait another 2 seconds and check again
    console.log('\n7. Waiting another 2 seconds...');
    await page.waitForTimeout(2000);
    console.log(`   URL after 3s total: ${page.url()}`);
    await page.screenshot({ path: `/tmp/${scenarioName}-05-after-3s.png` });

    // Check what's visible now
    const paymentFailedVisible = await page.isVisible('[data-testid="payment-failed-screen"]');
    console.log(`   payment-failed-screen visible: ${paymentFailedVisible}`);

    // Get page title
    const title = await page.title();
    console.log(`   Page title: ${title}`);

    // Get any visible text
    const bodyText = await page.textContent('body');
    console.log(`   Body has content: ${bodyText.length > 0 ? 'YES' : 'NO'}`);

    console.log(`\n✓ ${scenarioName} COMPLETE`);
    console.log(`Screenshots saved to /tmp/${scenarioName}-*.png`);

  } catch (error) {
    console.error(`\n✗ ${scenarioName} FAILED:`, error.message);
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: false }); // Use headless: false to see it

  try {
    // Test scenario 1: Screen-167 (Use Different Card)
    await testScenario(
      browser,
      'screen-167-different-card',
      'http://localhost:8423/(payment)/payment-failed?errorType=card_declined&goalName=Test%20Goal&commitmentAmount=25&charityName=Test%20Charity&goalId=test-goal-123',
      'payment-failed-different-card-button'
    );

    // Test scenario 2: Flow-102 (Try Again)
    await testScenario(
      browser,
      'flow-102-try-again',
      'http://localhost:8423/(payment)/payment-failed?errorType=insufficient_funds&goalName=Emergency%20Fund&commitmentAmount=100&charityName=Red%20Cross&goalId=test-goal-123',
      'payment-failed-try-again-button'
    );

  } finally {
    await browser.close();
  }
}

main().catch(console.error);
