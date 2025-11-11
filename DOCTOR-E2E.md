# 🏥 MubleExpo Doctor - E2E Health Checks

## Overview
The MubleExpo Doctor provides comprehensive health checking including **E2E test execution** with detailed error reporting for both mobile (Detox) and web (Playwright) testing infrastructures.

## Available Doctor Commands

### 🚀 Quick Health Check
```bash
npm run health
# or
npm run doctor:quick
```
- **Fast**: ~5-10 seconds
- **Validates**: Infrastructure, helpers, configuration
- **Returns**: Structured health report with E2E readiness status

### 🔬 Full Health Check with E2E Tests
```bash
npm run health:full
# or 
npm run doctor
```
- **Comprehensive**: Runs actual E2E tests
- **Duration**: 2-5 minutes
- **Tests**: Complete mobile + web E2E test suites
- **Returns**: Full test results with failure details

### 🤖 CI/CD Health Check
```bash
npm run health:ci
# or
npm run doctor:ci
```
- **CI-Optimized**: Structured output for automation
- **Environment**: Respects CI environment variables
- **Streaming**: Real-time output for CI logs
- **Exits**: Proper exit codes for CI pipeline integration

## Health Report Structure

### Quick Report (`health-report-quick.json`)
```json
{
  "overall": "HEALTHY",
  "timestamp": "2025-08-27T20:32:50.935Z",
  "e2e": {
    "mobile": {
      "status": "READY",
      "infrastructure": "OK",
      "error": null
    },
    "web": {
      "status": "READY", 
      "infrastructure": "OK",
      "error": null
    }
  },
  "summary": {
    "passed": 20,
    "failed": 0,
    "total": 20
  }
}
```

### Full Report (`health-report.json`)
```json
{
  "overall": "HEALTHY",
  "timestamp": "2025-08-27T20:32:50.935Z",
  "e2e": {
    "mobile": {
      "status": "PASS",
      "error": null,
      "duration": 8750,
      "output": "Test execution logs..."
    },
    "web": {
      "status": "PASS", 
      "error": null,
      "duration": 5230,
      "output": "Test execution logs..."
    }
  },
  "checks": [
    {
      "name": "Mobile E2E Tests",
      "status": "PASS",
      "details": "8.8s",
      "error": null,
      "timestamp": "2025-08-27T20:33:15.123Z"
    }
  ],
  "summary": {
    "passed": 15,
    "failed": 0,
    "total": 15
  }
}
```

## E2E Test Integration

### Mobile E2E (Detox)
```bash
# Doctor runs this command:
npm run test:mobile -- --headless

# Detects these errors:
- Configuration issues
- Missing testIDs
- App crashes
- Test timeouts
- Simulator problems
```

### Web E2E (Playwright)
```bash
# Doctor runs this command:
npm run test:web

# Detects these errors:
- Browser launch failures
- Element not found
- Network timeouts
- Page crashes  
- Configuration errors
```

## Error Detection & Reporting

### Mobile E2E Errors
The doctor extracts meaningful errors from Detox output:

**Configuration Error:**
```json
{
  "status": "FAIL",
  "error": "Detox configuration invalid for iOS simulator",
  "output": "detox[12345] E Command failed with exit code = 1..."
}
```

**Test Failure:**
```json
{
  "status": "FAIL", 
  "error": "Element by text('Login') was not found",
  "duration": 15000,
  "output": "✘ should complete login flow..."
}
```

### Web E2E Errors  
The doctor extracts meaningful errors from Playwright output:

**Browser Error:**
```json
{
  "status": "FAIL",
  "error": "browserType.launch: Executable doesn't exist",
  "output": "Browser not installed. Run: npx playwright install"
}
```

**Test Failure:**
```json
{
  "status": "FAIL",
  "error": "Timeout 30000ms exceeded waiting for selector",
  "duration": 30500,
  "output": "expect(locator).toBeVisible()..."
}
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Health Check with E2E
  run: npm run health:ci
  env:
    CI: true
    MOBILE_E2E_TIMEOUT: 180000
    WEB_E2E_TIMEOUT: 120000
    
- name: Upload Health Report  
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: health-report
    path: health-report-ci.json
```

### Environment Variables
```bash
# Skip specific test suites
SKIP_MOBILE_E2E=true npm run health:ci
SKIP_WEB_E2E=true npm run health:ci

# Adjust timeouts (milliseconds)
MOBILE_E2E_TIMEOUT=300000 npm run health:ci
WEB_E2E_TIMEOUT=180000 npm run health:ci

# CI mode (disables colors, enables structured output)
CI=true npm run health:ci
```

## Usage Examples

### Development Workflow
```bash
# Quick check before committing
npm run health

# Full validation before PR
npm run health:full

# Debug test issues
npm run doctor:quick && npm run test:mobile
```

### Debugging Failed E2E Tests
```bash
# Run doctor to get structured error
npm run health:full

# Check detailed report
cat health-report.json | jq '.e2e.mobile.error'

# Run specific test suite for debugging
npm run test:mobile -- mobile-e2e/tests/auth.test.js
```

### CI Pipeline Integration
```bash
# In your CI pipeline
npm run health:ci
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ All E2E tests passed"
else
  echo "❌ E2E tests failed"
  cat health-report-ci.json | jq '.e2e'
  exit 1
fi
```

## Infrastructure Validation

The doctor validates all aspects of your E2E infrastructure:

### Mobile (Detox) Checks ✅
- Mobile E2E directory structure
- Detox configuration (`.detoxrc.js`)
- Helper modules load correctly
- Auth/nav/dashboard helpers available
- Detox CLI accessible
- iOS simulator configuration

### Web (Playwright) Checks ✅  
- Web E2E directory structure
- Playwright configuration (`playwright.config.js`)
- Helper modules load correctly
- Auth/nav/dashboard helpers available
- Playwright CLI accessible
- Browser installation

### Common Checks ✅
- Node.js and NPM versions
- Package dependencies installed
- Test configuration files
- Helper interface parity
- Screenshot directories

## Error Recovery

When the doctor detects issues:

### Infrastructure Issues
```bash
❌ Mobile E2E helpers - Error: Cannot resolve module './authHelpers'

# Fix: Check file paths and exports
ls mobile-e2e/helpers/
```

### Configuration Issues  
```bash  
❌ Detox configuration - Missing .detoxrc.js

# Fix: Create detox configuration
npx detox init
```

### Test Failures
```bash
❌ Mobile E2E Tests - Element by id('login-button') was not found

# Fix: Check testID implementation
grep -r "testID.*login-button" src/
```

## Benefits

1. **Early Detection**: Catch E2E issues before they reach CI
2. **Structured Reporting**: Machine-readable health reports
3. **Detailed Errors**: Meaningful error messages, not just exit codes
4. **CI Integration**: Seamless pipeline integration with proper outputs
5. **Infrastructure Validation**: Ensures complete E2E setup
6. **Time Savings**: Quick validation vs full test runs

## Doctor Command Summary

| Command | Speed | Tests E2E | Use Case |
|---------|-------|-----------|----------|
| `npm run health` | 🚀 Fast | ❌ No | Development, pre-commit |
| `npm run health:full` | 🐌 Slow | ✅ Yes | Pre-PR, full validation |
| `npm run health:ci` | ⚡ Medium | ✅ Yes | CI/CD pipelines |

The doctor now provides comprehensive E2E testing integration with proper error detection and reporting for both mobile and web test suites!