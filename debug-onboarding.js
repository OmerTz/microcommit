// Quick onboarding debug test
const { test } = require('@playwright/test');

test('Debug onboarding completion', async ({ page }) => {
  // Enable console logging
  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('[') || text.includes('ONBOARDING')) {
      console.log('BROWSER LOG:', text);
    }
  });

  await page.goto('http://localhost:8086/onboarding');
  
  // Click through all steps quickly to get to final step
  for (let i = 0; i < 4; i++) {
    console.log(`Clicking Continue button (step ${i})`);
    await page.getByTestId('onboarding-next-button').click();
    await page.waitForTimeout(500);
  }
  
  // Should now be on final step - take screenshot
  await page.screenshot({ path: 'debug-final-step.png', fullPage: true });
  
  // Click the final button (should be "Get Started")
  console.log('Clicking final Get Started button');
  await page.getByTestId('onboarding-next-button').click();
  
  // Wait and see what happens
  await page.waitForTimeout(3000);
  
  // Take final screenshot
  await page.screenshot({ path: 'debug-after-completion.png', fullPage: true });
  
  console.log('Final URL:', page.url());
});