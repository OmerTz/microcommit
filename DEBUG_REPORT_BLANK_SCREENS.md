# DEBUG REPORT: Blank Screens in Playwright E2E Tests

## Executive Summary
**ROOT CAUSE IDENTIFIED**: Elements render as `visibility: hidden` in Playwright tests due to react-native-reanimated animations not completing. All content is wrapped in `Animated.View` components with `entering` animations, but the animations never complete, leaving content permanently hidden.

## Evidence

### 1. Playwright Test Logs Show "unexpected value 'hidden'"

From `.test-output-web-1763143209949.txt`:

```
Line 53-59:
  locator resolved to <div data-testid="payment-failed-error-message" class="css-view-g5y9jx r-marginBottom-1peese0 r-paddingInline-3pj75a">…</div>
  unexpected value "hidden"
```

```
Lines 94-96, 114:
  locator resolved to <div tabindex="0" data-testid="payment-failed-try-again-button" ...>
  unexpected value "hidden"
```

```
Lines 189-194:
  locator resolved to <div data-testid="add-payment-method-security-badge" ...>
  unexpected value "hidden"
```

**Interpretation**: Playwright finds the elements in the DOM but they have `visibility: hidden` or similar CSS property set.

### 2. All Content Wrapped in Animated Views

`/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/app/(payment)/payment-failed.tsx`:

- Lines 181-198: Back button in `Animated.View` with `FadeInUp.duration(400).springify()`
- Lines 200-207: Icon container in `Animated.View` with `FadeInDown.duration(500).delay(100).springify()`
- Lines 209-214: Title in `Animated.View` with `FadeInDown.duration(500).delay(200).springify()`
- Lines 216-222: Error message in `Animated.View` with `FadeInDown.duration(500).delay(300).springify()`
- Lines 224-249: Goal summary in `Animated.View` with `FadeInDown.duration(500).delay(400).springify()`
- Lines 251-257: Reassurance text in `Animated.View` with `FadeInDown.duration(500).delay(500).springify()`
- Lines 259-313: Action buttons in `Animated.View` with `FadeInDown.duration(500).delay(600).springify()`

**Same pattern in add-payment-method.tsx** - all content wrapped in Animated.View components.

### 3. react-native-reanimated Babel Plugin MISSING

`/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/babel.config.js`:

```javascript
module.exports = function(api) {
  api.cache(true);

  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '@': '.',
        },
      },
    ],
  ];

  // Transform dynamic imports to regular require in test environment
  if (process.env.NODE_ENV === 'test') {
    plugins.push(['babel-plugin-dynamic-import-node', { noInterop: true }]);
  }

  return {
    presets: ['babel-preset-expo'],
    plugins  // ❌ Missing 'react-native-reanimated/plugin'
  };
};
```

**According to react-native-reanimated v3 documentation**, the plugin MUST be added and MUST be last in the plugins array:

```javascript
plugins: [
  // ... other plugins
  'react-native-reanimated/plugin',  // ⚠️ MUST BE LAST
]
```

### 4. No Playwright reducedMotion Configuration

`/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/playwright.config.ts`:

The config does NOT set `reducedMotion` which could help disable animations during testing:

```typescript
use: {
  baseURL: 'http://localhost:8423',
  trace: 'on-first-retry',
  screenshot: 'on',
  video: 'on-first-retry',
  viewport: { width: 1280, height: 720 },
  actionTimeout: 15000,
  testIdAttribute: 'data-testid',
  // ❌ Missing: reducedMotion: 'reduce'
},
```

## How react-native-reanimated Works

1. **Initial State**: When `Animated.View` with `entering` animation mounts, the element starts HIDDEN (visibility: hidden or opacity: 0)
2. **Animation Phase**: The animation library interpolates from hidden → visible over the duration
3. **Final State**: Once complete, element becomes fully visible

**In Playwright tests on web**:
- Without the Babel plugin, animations don't initialize properly
- Elements remain in initial "hidden" state
- `toBeVisible()` checks pass because elements exist in DOM with correct testIDs
- But visual rendering is blocked by visibility: hidden

## Why Tests Pass Despite Blank Screens

Playwright's `toBeVisible()` checks:
1. ✅ Element exists in DOM
2. ✅ Element has non-zero dimensions
3. ✅ Element is within viewport
4. ❌ BUT: Element has `visibility: hidden` → Playwright eventually waits and retries until timeout

From logs, we see Playwright retrying:
```
unexpected value "hidden"
<retries multiple times>
locator resolved to <div> (after animation completes)
```

**Tests pass because animations EVENTUALLY complete**, but screenshots are taken mid-animation when content is still hidden.

## Impact

### Affected Screens
1. `/(payment)/payment-failed` - All content invisible during animation
2. `/(payment)/add-payment-method` - All content invisible during animation

### Test Symptoms
- Screenshots show blank white screens with only back arrow visible (not animated)
- Elements pass visibility checks but visual content missing
- Navigation works (elements are clickable even when invisible)
- Playwright logs show "unexpected value 'hidden'" repeatedly

## Root Causes (Multiple Contributing Factors)

### Primary Cause
**Missing react-native-reanimated Babel plugin** - Without this plugin, animations don't work correctly on web, leaving elements hidden.

### Contributing Factors
1. **No reducedMotion in Playwright config** - Tests don't disable animations, relying on them to complete
2. **Long animation delays** - Some elements have 600ms delay before even starting animation
3. **No animation completion detection** - Tests don't wait for animations to finish before taking screenshots

## Recommended Solutions

### Solution 1: Add react-native-reanimated Babel Plugin (REQUIRED)
```javascript
// babel.config.js
module.exports = function(api) {
  api.cache(true);

  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '@': '.',
        },
      },
    ],
  ];

  if (process.env.NODE_ENV === 'test') {
    plugins.push(['babel-plugin-dynamic-import-node', { noInterop: true }]);
  }

  // MUST be last plugin
  plugins.push('react-native-reanimated/plugin');

  return {
    presets: ['babel-preset-expo'],
    plugins
  };
};
```

### Solution 2: Add reducedMotion to Playwright Config (RECOMMENDED)
```typescript
// playwright.config.ts
use: {
  baseURL: 'http://localhost:8423',
  reducedMotion: 'reduce',  // Disable animations in tests
  // ... rest of config
}
```

### Solution 3: Conditional Animation Disabling (ALTERNATIVE)
Create animation config that detects test environment:

```typescript
// utils/animations.ts
import { Platform } from 'react-native';

export const isTestEnvironment = () => {
  if (Platform.OS === 'web') {
    return typeof window !== 'undefined' &&
           (window.location.hostname === 'localhost' ||
            process.env.NODE_ENV === 'test');
  }
  return false;
};

export const getAnimationConfig = () => {
  if (isTestEnvironment()) {
    return {
      duration: 0,
      delay: 0,
    };
  }
  return {
    duration: 500,
    delay: 100,
  };
};
```

Then use in components:
```typescript
const animConfig = getAnimationConfig();
<Animated.View entering={FadeInDown.duration(animConfig.duration).delay(animConfig.delay)}>
```

### Solution 4: Wait for Animations in Tests (NOT RECOMMENDED)
Add explicit waits after navigation:
```javascript
await page.goto('/payment-failed');
await page.waitForTimeout(1000); // Wait for all animations
await expect(page.locator('[data-testid="payment-failed-screen"]')).toBeVisible();
```

**Why not recommended**: Hardcoded delays are brittle, slow down tests, and don't address root cause.

## Implementation Priority

1. **CRITICAL - MUST FIX**: Add `react-native-reanimated/plugin` to babel.config.js
2. **HIGHLY RECOMMENDED**: Add `reducedMotion: 'reduce'` to playwright.config.ts
3. **OPTIONAL**: Implement conditional animation disabling for test environments
4. **AVOID**: Don't add hardcoded delays to tests

## Verification Steps

After implementing fixes:

1. Restart dev server (babel changes require restart)
2. Run web E2E tests: `./tzrif doctor --product MicroCommit`
3. Check screenshots in `web-e2e/screenshots/` - should show full content
4. Verify no "unexpected value 'hidden'" in test logs
5. Test mobile E2E to ensure changes don't break native animations

## Files to Modify

### Critical Changes
- `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/babel.config.js` - Add reanimated plugin

### Recommended Changes
- `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/playwright.config.ts` - Add reducedMotion

### Affected Components (No Changes Needed)
- `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/app/(payment)/payment-failed.tsx`
- `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/app/(payment)/add-payment-method.tsx`
- `/Users/omertzadiki/Desktop/dev/tzrif86/products/MicroCommit/app/(payment)/add-payment-method.native.tsx`

## Additional Notes

- This issue affects ONLY web platform in Playwright tests
- Native mobile tests likely work fine (react-native-reanimated works without plugin on native)
- Users in production on web might also experience this issue if plugin is missing
- The fact that only the back arrow is visible suggests non-animated elements render correctly
- Element instability warnings in logs ("element is not stable") further confirm animations are running

## References

- react-native-reanimated v3 Babel plugin docs: https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugin
- Playwright reducedMotion: https://playwright.dev/docs/api/class-testoptions#test-options-reduced-motion
- expo-router with reanimated: https://docs.expo.dev/versions/latest/sdk/reanimated/
