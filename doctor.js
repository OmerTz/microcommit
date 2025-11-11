#!/usr/bin/env node

/**
 * MubleExpo Health Check Doctor
 * Runs comprehensive health checks including e2e tests
 * Returns detailed error messages for failures
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${colors.bold}${colors.cyan}🔍 ${title}${colors.reset}`);
  log('='.repeat(50), colors.cyan);
}

let healthReport = {
  overall: 'HEALTHY',
  timestamp: new Date().toISOString(),
  checks: [],
  e2e: {
    mobile: { status: 'NOT_RUN', error: null, duration: 0 },
    web: { status: 'NOT_RUN', error: null, duration: 0 }
  },
  summary: {
    passed: 0,
    failed: 0,
    total: 0
  }
};

function addCheck(name, status, details = '', error = null) {
  const check = {
    name,
    status: status ? 'PASS' : 'FAIL',
    details,
    error: error ? error.toString() : null,
    timestamp: new Date().toISOString()
  };
  
  healthReport.checks.push(check);
  
  if (status) {
    healthReport.summary.passed++;
    log(`  ✅ ${name}${details ? ` - ${details}` : ''}`, colors.green);
  } else {
    healthReport.summary.failed++;
    healthReport.overall = 'UNHEALTHY';
    log(`  ❌ ${name}${details ? ` - ${details}` : ''}`, colors.red);
    if (error) {
      log(`     Error: ${error.message || error}`, colors.red);
    }
  }
  
  healthReport.summary.total++;
}

function runCommand(command, description, options = {}) {
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      timeout: options.timeout || 30000,
      ...options 
    });
    return { success: true, output: result };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      output: error.output ? error.output.join('\n') : '',
      code: error.status
    };
  }
}

async function runE2ETest(type, command, timeout) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    log(`\n🧪 Running ${type} E2E tests...`, colors.blue);
    
    const child = spawn('bash', ['-c', command], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    const timeoutId = setTimeout(() => {
      child.kill('SIGTERM');
      resolve({
        success: false,
        error: `Test timeout after ${timeout}ms`,
        output: stdout + stderr,
        duration: Date.now() - startTime
      });
    }, timeout);
    
    child.on('close', (code) => {
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      
      if (code === 0) {
        resolve({
          success: true,
          output: stdout,
          duration
        });
      } else {
        // Extract meaningful error from output
        let error = `Process exited with code ${code}`;
        
        // Look for specific error patterns
        const errorPatterns = [
          /Error: (.+)/,
          /FAIL (.+)/,
          /✘ (.+)/,
          /Failed: (.+)/,
          /AssertionError: (.+)/,
          /TimeoutError: (.+)/
        ];
        
        const combinedOutput = stderr + stdout;
        for (const pattern of errorPatterns) {
          const match = combinedOutput.match(pattern);
          if (match) {
            error = match[1].trim();
            break;
          }
        }
        
        resolve({
          success: false,
          error,
          output: combinedOutput,
          duration
        });
      }
    });
    
    child.on('error', (error) => {
      clearTimeout(timeoutId);
      resolve({
        success: false,
        error: error.message,
        output: stdout + stderr,
        duration: Date.now() - startTime
      });
    });
  });
}

async function checkEnvironment() {
  logSection('Environment Check');
  
  // Node.js version
  const nodeResult = runCommand('node --version', 'Node.js version');
  addCheck('Node.js', nodeResult.success, nodeResult.output?.trim(), nodeResult.error);
  
  // NPM version
  const npmResult = runCommand('npm --version', 'NPM version');
  addCheck('NPM', npmResult.success, npmResult.output?.trim(), npmResult.error);
  
  // Check if package.json exists
  const packageExists = fs.existsSync('package.json');
  addCheck('package.json', packageExists, packageExists ? 'Found' : 'Missing');
  
  // Check node_modules
  const nodeModulesExists = fs.existsSync('node_modules');
  addCheck('node_modules', nodeModulesExists, nodeModulesExists ? 'Installed' : 'Missing');
}

async function checkDependencies() {
  logSection('Dependencies Check');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check critical dependencies
    const criticalDeps = ['expo', 'react', 'react-native'];
    criticalDeps.forEach(dep => {
      const hasInDeps = packageJson.dependencies?.[dep];
      const hasInDevDeps = packageJson.devDependencies?.[dep];
      addCheck(`${dep}`, hasInDeps || hasInDevDeps, hasInDeps || hasInDevDeps || 'Missing');
    });
    
    // Check test dependencies
    const testDeps = ['@playwright/test', 'detox', 'jest'];
    testDeps.forEach(dep => {
      const hasInDeps = packageJson.dependencies?.[dep];
      const hasInDevDeps = packageJson.devDependencies?.[dep];
      addCheck(`${dep}`, hasInDeps || hasInDevDeps, hasInDeps || hasInDevDeps || 'Missing');
    });
    
  } catch (error) {
    addCheck('package.json parsing', false, '', error);
  }
}

async function checkTestInfrastructure() {
  logSection('Test Infrastructure Check');
  
  // Check mobile e2e structure
  const mobileE2EExists = fs.existsSync('mobile-e2e');
  addCheck('Mobile E2E directory', mobileE2EExists);
  
  if (mobileE2EExists) {
    const mobileHelpers = fs.existsSync('mobile-e2e/helpers');
    const mobileConfig = fs.existsSync('mobile-e2e/config');
    const mobileTests = fs.existsSync('mobile-e2e/tests') || fs.existsSync('mobile-e2e/*.test.js');
    
    addCheck('Mobile E2E helpers', mobileHelpers);
    addCheck('Mobile E2E config', mobileConfig);
    addCheck('Mobile E2E tests', mobileTests);
  }
  
  // Check web e2e structure
  const webE2EExists = fs.existsSync('web-e2e');
  addCheck('Web E2E directory', webE2EExists);
  
  if (webE2EExists) {
    const webHelpers = fs.existsSync('web-e2e/helpers');
    const webConfig = fs.existsSync('web-e2e/config');
    const webTests = fs.existsSync('web-e2e/tests');
    const playwrightConfig = fs.existsSync('web-e2e/playwright.config.js');
    
    addCheck('Web E2E helpers', webHelpers);
    addCheck('Web E2E config', webConfig);
    addCheck('Web E2E tests', webTests);
    addCheck('Playwright config', playwrightConfig);
  }
  
  // Check detox config
  const detoxConfig = fs.existsSync('.detoxrc.js') || fs.existsSync('.detoxrc.json');
  addCheck('Detox configuration', detoxConfig);
}

async function runE2ETests() {
  logSection('E2E Tests Execution');
  
  // Clean up screenshot directories before running tests
  log('🧹 Cleaning up screenshot directories...', colors.yellow);
  try {
    execSync('rm -rf mobile-e2e/screenshots/* 2>/dev/null || true', { encoding: 'utf8' });
    execSync('rm -rf web-e2e/screenshots/* 2>/dev/null || true', { encoding: 'utf8' });
    log('  ✅ Screenshot directories cleaned', colors.green);
  } catch (error) {
    log('  ⚠️  Could not clean all screenshot directories', colors.yellow);
  }
  
  const testPromises = [];
  const timeout = parseInt(process.env.E2E_TIMEOUT) || 60000; // Default 60s, customizable via E2E_TIMEOUT env var
  
  // Prepare Mobile E2E Tests (Detox)
  if (fs.existsSync('mobile-e2e')) {
    log('\n📱 Mobile E2E Tests (Detox) - Starting...', colors.blue);
    
    const mobilePromise = runE2ETest(
      'Mobile',
      'npx detox test --configuration ios --headless --testNamePattern="sanity" || npm run test:mobile -- --headless --testNamePattern="sanity"',
      timeout
    ).then(mobileResult => {
      healthReport.e2e.mobile = {
        status: mobileResult.success ? 'PASS' : 'FAIL',
        error: mobileResult.error,
        duration: mobileResult.duration,
        output: mobileResult.output
      };
      
      addCheck(
        'Mobile E2E Tests',
        mobileResult.success,
        `${(mobileResult.duration / 1000).toFixed(1)}s`,
        mobileResult.error
      );
      
      // Copy screenshots from artifacts to screenshots folder
      try {
        const latestArtifacts = execSync('ls -dt mobile-e2e/.artifacts/ios* 2>/dev/null | head -1', { encoding: 'utf8' }).trim();
        if (latestArtifacts) {
          execSync(`mkdir -p mobile-e2e/screenshots`, { encoding: 'utf8' });
          // Find and copy screenshots, extracting suite/test/filename structure from the path
          const screenshots = execSync(`find "${latestArtifacts}" -name "*.png" -not -name "test*.png" 2>/dev/null`, { encoding: 'utf8' })
            .trim()
            .split('\n')
            .filter(Boolean);
          
          screenshots.forEach(screenshot => {
            // Extract the filename - it should contain the suite/test/counter-description pattern
            const filename = screenshot.split('/').pop();
            if (filename.includes('_')) {
              // Format: suite_test_counter-description.png
              const parts = filename.split('_');
              if (parts.length >= 3) {
                const suite = parts[0];
                const test = parts[1];
                const file = parts.slice(2).join('_');
                execSync(`mkdir -p "mobile-e2e/screenshots/${suite}/${test}" 2>/dev/null || true`, { encoding: 'utf8' });
                execSync(`cp "${screenshot}" "mobile-e2e/screenshots/${suite}/${test}/${file}" 2>/dev/null || true`, { encoding: 'utf8' });
              }
            }
          });
          log('  📸 Mobile screenshots organized in mobile-e2e/screenshots/', colors.cyan);
        }
      } catch (error) {
        // Silent fail - screenshots are optional
      }
      
      return { type: 'mobile', result: mobileResult };
    });
    
    testPromises.push(mobilePromise);
  } else {
    healthReport.e2e.mobile.status = 'SKIPPED';
    addCheck('Mobile E2E Tests', false, 'Mobile E2E directory not found');
  }
  
  // Prepare Web E2E Tests (Playwright)
  if (fs.existsSync('web-e2e')) {
    log('🌐 Web E2E Tests (Playwright) - Starting...', colors.blue);
    
    const webPromise = runE2ETest(
      'Web',
      'npx playwright test --config web-e2e/playwright.config.js --grep="sanity" --project=chrome',
      timeout
    ).then(webResult => {
      healthReport.e2e.web = {
        status: webResult.success ? 'PASS' : 'FAIL',
        error: webResult.error,
        duration: webResult.duration,
        output: webResult.output
      };
      
      addCheck(
        'Web E2E Tests',
        webResult.success,
        `${(webResult.duration / 1000).toFixed(1)}s`,
        webResult.error
      );
      
      return { type: 'web', result: webResult };
    });
    
    testPromises.push(webPromise);
  } else {
    healthReport.e2e.web.status = 'SKIPPED';
    addCheck('Web E2E Tests', false, 'Web E2E directory not found');
  }
  
  // Run tests in parallel
  if (testPromises.length > 0) {
    log('\n⚡ Running E2E tests in parallel...', colors.cyan);
    const startTime = Date.now();
    
    try {
      const results = await Promise.all(testPromises);
      const totalDuration = (Date.now() - startTime) / 1000;
      
      log(`\n✅ Parallel E2E tests completed in ${totalDuration.toFixed(1)}s`, colors.green);
      
      // Log individual results
      results.forEach(({ type, result }) => {
        const emoji = type === 'mobile' ? '📱' : '🌐';
        const status = result.success ? '✅ PASS' : '❌ FAIL';
        log(`${emoji} ${type}: ${status} (${(result.duration/1000).toFixed(1)}s)`, 
            result.success ? colors.green : colors.red);
      });
    } catch (error) {
      log(`\n❌ Error running parallel tests: ${error.message}`, colors.red);
    }
  }
}

async function generateReport() {
  logSection('Health Report Summary');
  
  const overallColor = healthReport.overall === 'HEALTHY' ? colors.green : colors.red;
  const overallIcon = healthReport.overall === 'HEALTHY' ? '✅' : '❌';
  
  log(`${overallIcon} Overall Status: ${healthReport.overall}`, overallColor);
  log(`📊 Tests: ${healthReport.summary.passed} passed, ${healthReport.summary.failed} failed, ${healthReport.summary.total} total`);
  
  // E2E Summary
  log('\n🧪 E2E Test Results:', colors.bold);
  log(`   📱 Mobile: ${healthReport.e2e.mobile.status} ${healthReport.e2e.mobile.duration ? `(${(healthReport.e2e.mobile.duration / 1000).toFixed(1)}s)` : ''}`);
  if (healthReport.e2e.mobile.error) {
    log(`      Error: ${healthReport.e2e.mobile.error}`, colors.red);
  }
  
  log(`   🌐 Web: ${healthReport.e2e.web.status} ${healthReport.e2e.web.duration ? `(${(healthReport.e2e.web.duration / 1000).toFixed(1)}s)` : ''}`);
  if (healthReport.e2e.web.error) {
    log(`      Error: ${healthReport.e2e.web.error}`, colors.red);
  }
  
  // Save detailed report
  const reportPath = 'health-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(healthReport, null, 2));
  log(`\n📄 Detailed report saved to: ${reportPath}`, colors.cyan);
  
  // Post to GitHub PR if available
  await postToPR();
  
  // Exit with error code if unhealthy
  if (healthReport.overall === 'UNHEALTHY') {
    log('\n❌ Health check failed!', colors.red);
    process.exit(1);
  } else {
    log('\n✅ All systems healthy!', colors.green);
    process.exit(0);
  }
}

async function postToPR() {
  try {
    // Check if we're on a feature branch with a PR
    const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    if (!currentBranch || currentBranch === 'main' || currentBranch === 'master') {
      return; // Skip posting on main branches
    }
    
    // Check for existing PR
    const prCheck = execSync(`gh pr list --head ${currentBranch} --json number,title,url`, { 
      encoding: 'utf8', 
      stdio: 'pipe' 
    });
    const prs = JSON.parse(prCheck);
    
    if (prs.length === 0) {
      log('No PR found for current branch', colors.yellow);
      return;
    }
    
    const pr = prs[0];
    const prNumber = pr.number;
    
    // Generate PR comment
    const comment = generatePRComment();
    
    // Post comment to PR
    const commentCmd = `gh pr comment ${prNumber} --body "${comment.replace(/"/g, '\\"')}"`;
    execSync(commentCmd, { stdio: 'pipe' });
    
    log(`📝 Posted E2E results to PR #${prNumber}: ${pr.url}`, colors.green);
    
  } catch (error) {
    log(`Could not post to PR: ${error.message}`, colors.yellow);
  }
}

function generatePRComment() {
  const timestamp = new Date().toISOString();
  const overallEmoji = healthReport.overall === 'HEALTHY' ? '✅' : '❌';
  
  let comment = `## ${overallEmoji} E2E Health Check Results\\n\\n`;
  comment += `**Overall Status:** ${healthReport.overall}\\n`;
  comment += `**Timestamp:** ${timestamp}\\n\\n`;
  
  // E2E Test Results
  comment += `### 🧪 E2E Test Results\\n\\n`;
  
  if (healthReport.e2e.mobile.status !== 'NOT_RUN') {
    const mobileEmoji = healthReport.e2e.mobile.status === 'PASS' ? '✅' : '❌';
    comment += `📱 **Mobile E2E (Detox):** ${mobileEmoji} ${healthReport.e2e.mobile.status}`;
    if (healthReport.e2e.mobile.duration) {
      comment += ` _(${(healthReport.e2e.mobile.duration/1000).toFixed(1)}s)_`;
    }
    comment += `\\n`;
    if (healthReport.e2e.mobile.error) {
      comment += `   🔴 Error: \`${healthReport.e2e.mobile.error}\`\\n`;
    }
  }
  
  if (healthReport.e2e.web.status !== 'NOT_RUN') {
    const webEmoji = healthReport.e2e.web.status === 'PASS' ? '✅' : '❌';
    comment += `🌐 **Web E2E (Playwright):** ${webEmoji} ${healthReport.e2e.web.status}`;
    if (healthReport.e2e.web.duration) {
      comment += ` _(${(healthReport.e2e.web.duration/1000).toFixed(1)}s)_`;
    }
    comment += `\\n`;
    if (healthReport.e2e.web.error) {
      comment += `   🔴 Error: \`${healthReport.e2e.web.error}\`\\n`;
    }
  }
  
  // Infrastructure Status
  comment += `\\n### 🏗️ Infrastructure Status\\n\\n`;
  comment += `**Tests:** ${healthReport.summary.passed} passed, ${healthReport.summary.failed} failed\\n`;
  
  if (healthReport.summary.failed > 0) {
    comment += `\\n**Failed Checks:**\\n`;
    healthReport.checks
      .filter(c => c.status === 'FAIL')
      .forEach(check => {
        comment += `- ❌ ${check.name}`;
        if (check.error) comment += `: \`${check.error}\``;
        comment += `\\n`;
      });
  }
  
  // Commands
  comment += `\\n### 🚀 Available Commands\\n\\n`;
  comment += `\`\`\`bash\\n`;
  comment += `# Quick health check (infrastructure only)\\n`;
  comment += `npm run health\\n\\n`;
  comment += `# Full health check with E2E tests\\n`;
  comment += `npm run health:full\\n\\n`;
  comment += `# CI-optimized health check\\n`;
  comment += `npm run health:ci\\n\\n`;
  comment += `# Individual test suites\\n`;
  comment += `npm run test:mobile  # Mobile E2E (Detox)\\n`;
  comment += `npm run test:web     # Web E2E (Playwright)\\n`;
  comment += `\`\`\`\\n\\n`;
  
  comment += `---\\n`;
  comment += `*Automated E2E health check - ${timestamp}*`;
  
  return comment;
}

async function main() {
  log(`${colors.bold}${colors.blue}🏥 MubleExpo Health Check Doctor${colors.reset}`);
  log(`${colors.blue}Starting comprehensive health check...${colors.reset}\n`);
  
  try {
    await checkEnvironment();
    await checkDependencies();
    await checkTestInfrastructure();
    await runE2ETests();
  } catch (error) {
    log(`\n💥 Unexpected error during health check: ${error.message}`, colors.red);
    healthReport.overall = 'UNHEALTHY';
    addCheck('Health check execution', false, '', error);
  }
  
  await generateReport();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  log('\n🛑 Health check interrupted', colors.yellow);
  generateReport();
});

process.on('SIGTERM', () => {
  log('\n🛑 Health check terminated', colors.yellow);
  generateReport();
});

if (require.main === module) {
  main();
}

module.exports = { runE2ETest, healthReport };