#!/usr/bin/env node

/**
 * MubleExpo CI/CD Health Check Doctor
 * Runs e2e tests and returns structured results for CI/CD integration
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Disable colors for CI
const CI = process.env.CI === 'true';
const colors = CI ? {
  reset: '', green: '', red: '', yellow: '', blue: '', cyan: '', bold: ''
} : {
  reset: '\x1b[0m', green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m', 
  blue: '\x1b[34m', cyan: '\x1b[36m', bold: '\x1b[1m'
};

let report = {
  overall: 'HEALTHY',
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'development',
  e2e: {
    mobile: { status: 'NOT_RUN', error: null, duration: 0, output: '' },
    web: { status: 'NOT_RUN', error: null, duration: 0, output: '' }
  },
  infrastructure: { status: 'OK', checks: [] },
  summary: { passed: 0, failed: 0, total: 0 }
};

function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = CI ? `[${timestamp}] [${level.toUpperCase()}]` : '';
  
  const color = level === 'error' ? colors.red : 
                level === 'warn' ? colors.yellow :
                level === 'success' ? colors.green : colors.reset;
  
  console.log(`${color}${prefix} ${message}${colors.reset}`);
}

function addCheck(name, status, error = null) {
  report.infrastructure.checks.push({
    name,
    status: status ? 'PASS' : 'FAIL',
    error: error ? error.toString() : null
  });
  
  if (status) {
    report.summary.passed++;
  } else {
    report.summary.failed++;
    report.overall = 'UNHEALTHY';
  }
  report.summary.total++;
}

async function runE2ETest(type, command, timeout = 120000) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    log(`Running ${type} E2E tests...`, 'info');
    
    const child = spawn('bash', ['-c', command], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
      // Stream output in CI
      if (CI) process.stdout.write(data);
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
      if (CI) process.stderr.write(data);
    });
    
    const timeoutId = setTimeout(() => {
      child.kill('SIGTERM');
      resolve({
        success: false,
        error: `Test timeout after ${timeout/1000}s`,
        output: stdout + stderr,
        duration: Date.now() - startTime
      });
    }, timeout);
    
    child.on('close', (code) => {
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      
      let error = null;
      if (code !== 0) {
        // Extract error from output
        const combinedOutput = stderr + stdout;
        const errorMatch = combinedOutput.match(/(Error|FAIL|Failed|AssertionError|TimeoutError): ([^\n]+)/);
        error = errorMatch ? errorMatch[2] : `Process exited with code ${code}`;
      }
      
      resolve({
        success: code === 0,
        error,
        output: stdout + stderr,
        duration
      });
    });
    
    child.on('error', (err) => {
      clearTimeout(timeoutId);
      resolve({
        success: false,
        error: err.message,
        output: stdout + stderr,
        duration: Date.now() - startTime
      });
    });
  });
}

async function runInfrastructureChecks() {
  log('Checking infrastructure...', 'info');
  
  // Check directories exist
  addCheck('Mobile E2E directory', fs.existsSync('mobile-e2e'));
  addCheck('Web E2E directory', fs.existsSync('web-e2e'));
  addCheck('Detox config', fs.existsSync('.detoxrc.js'));
  addCheck('Playwright config', fs.existsSync('web-e2e/playwright.config.js'));
  
  // Check helpers load
  try {
    const mobileHelpers = require('./mobile-e2e/helpers');
    addCheck('Mobile helpers', !!mobileHelpers.auth);
  } catch (error) {
    addCheck('Mobile helpers', false, error);
  }
  
  try {
    const webHelpers = require('./web-e2e/helpers');
    addCheck('Web helpers', !!webHelpers.auth);
  } catch (error) {
    addCheck('Web helpers', false, error);
  }
}

async function runE2ETests() {
  const runMobile = process.env.SKIP_MOBILE_E2E !== 'true' && fs.existsSync('mobile-e2e');
  const runWeb = process.env.SKIP_WEB_E2E !== 'true' && fs.existsSync('web-e2e');
  
  const testPromises = [];
  const startTime = Date.now();
  
  // Prepare Mobile E2E
  if (runMobile) {
    log('Starting Mobile E2E tests...', 'info');
    const mobilePromise = runE2ETest(
      'Mobile',
      'npm run test:mobile -- --headless',
      parseInt(process.env.MOBILE_E2E_TIMEOUT || '120000')
    ).then(mobileResult => {
      report.e2e.mobile = {
        status: mobileResult.success ? 'PASS' : 'FAIL',
        error: mobileResult.error,
        duration: mobileResult.duration,
        output: mobileResult.output
      };
      
      if (mobileResult.success) {
        log(`Mobile E2E passed in ${(mobileResult.duration/1000).toFixed(1)}s`, 'success');
      } else {
        log(`Mobile E2E failed: ${mobileResult.error}`, 'error');
        report.overall = 'UNHEALTHY';
      }
      
      return { type: 'mobile', result: mobileResult };
    });
    
    testPromises.push(mobilePromise);
  } else {
    report.e2e.mobile.status = 'SKIPPED';
    log('Mobile E2E skipped', 'warn');
  }
  
  // Prepare Web E2E
  if (runWeb) {
    log('Starting Web E2E tests...', 'info');
    const webPromise = runE2ETest(
      'Web',
      'npm run test:web',
      parseInt(process.env.WEB_E2E_TIMEOUT || '120000')
    ).then(webResult => {
      report.e2e.web = {
        status: webResult.success ? 'PASS' : 'FAIL',
        error: webResult.error,
        duration: webResult.duration,
        output: webResult.output
      };
      
      if (webResult.success) {
        log(`Web E2E passed in ${(webResult.duration/1000).toFixed(1)}s`, 'success');
      } else {
        log(`Web E2E failed: ${webResult.error}`, 'error');
        report.overall = 'UNHEALTHY';
      }
      
      return { type: 'web', result: webResult };
    });
    
    testPromises.push(webPromise);
  } else {
    report.e2e.web.status = 'SKIPPED';
    log('Web E2E skipped', 'warn');
  }
  
  // Run tests in parallel if there are any
  if (testPromises.length > 0) {
    log('Running E2E tests in parallel...', 'info');
    
    try {
      const results = await Promise.all(testPromises);
      const totalDuration = (Date.now() - startTime) / 1000;
      
      log(`Parallel E2E tests completed in ${totalDuration.toFixed(1)}s`, 'success');
      
      // Log summary
      results.forEach(({ type, result }) => {
        const status = result.success ? 'PASS' : 'FAIL';
        log(`${type} E2E: ${status} (${(result.duration/1000).toFixed(1)}s)`, 
            result.success ? 'success' : 'error');
      });
    } catch (error) {
      log(`Error running parallel tests: ${error.message}`, 'error');
      report.overall = 'UNHEALTHY';
    }
  }
}

async function generateOutput() {
  // Save detailed report
  const reportPath = 'health-report-ci.json';
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // Create summary for CI
  const summary = {
    overall: report.overall,
    mobile_e2e: report.e2e.mobile.status,
    mobile_error: report.e2e.mobile.error,
    web_e2e: report.e2e.web.status,
    web_error: report.e2e.web.error,
    total_time: report.e2e.mobile.duration + report.e2e.web.duration
  };
  
  // Output for CI parsing
  if (CI) {
    console.log('::group::E2E Test Results');
    console.log(`::set-output name=overall::${summary.overall}`);
    console.log(`::set-output name=mobile_status::${summary.mobile_e2e}`);
    console.log(`::set-output name=web_status::${summary.web_e2e}`);
    console.log(`::set-output name=total_time::${summary.total_time}`);
    if (summary.mobile_error) console.log(`::error::Mobile E2E: ${summary.mobile_error}`);
    if (summary.web_error) console.log(`::error::Web E2E: ${summary.web_error}`);
    console.log('::endgroup::');
  } else {
    log(`\nResults Summary:`, 'info');
    log(`  Overall: ${summary.overall}`, summary.overall === 'HEALTHY' ? 'success' : 'error');
    log(`  Mobile E2E: ${summary.mobile_e2e}`, summary.mobile_e2e === 'PASS' ? 'success' : 'error');
    log(`  Web E2E: ${summary.web_e2e}`, summary.web_e2e === 'PASS' ? 'success' : 'error');
    if (summary.mobile_error) log(`  Mobile Error: ${summary.mobile_error}`, 'error');
    if (summary.web_error) log(`  Web Error: ${summary.web_error}`, 'error');
  }
  
  log(`Detailed report: ${reportPath}`, 'info');
  
  // Post to GitHub PR if available and not in CI (to avoid duplicate comments)
  if (!CI) {
    await postToPR();
  }
  
  return summary;
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
      log('No PR found for current branch', 'warn');
      return;
    }
    
    const pr = prs[0];
    const prNumber = pr.number;
    
    // Generate PR comment
    const comment = generatePRComment();
    
    // Post comment to PR
    const commentCmd = `gh pr comment ${prNumber} --body "${comment.replace(/"/g, '\\"')}"`;
    execSync(commentCmd, { stdio: 'pipe' });
    
    log(`Posted E2E results to PR #${prNumber}: ${pr.url}`, 'success');
    
  } catch (error) {
    log(`Could not post to PR: ${error.message}`, 'warn');
  }
}

function generatePRComment() {
  const timestamp = new Date().toISOString();
  const overallEmoji = report.overall === 'HEALTHY' ? '✅' : '❌';
  
  let comment = `## ${overallEmoji} CI E2E Health Check Results\\n\\n`;
  comment += `**Overall Status:** ${report.overall}\\n`;
  comment += `**Environment:** ${report.environment}\\n`;
  comment += `**Timestamp:** ${timestamp}\\n\\n`;
  
  // E2E Test Results
  comment += `### 🧪 E2E Test Results\\n\\n`;
  
  if (report.e2e.mobile.status !== 'NOT_RUN') {
    const mobileEmoji = report.e2e.mobile.status === 'PASS' ? '✅' : '❌';
    comment += `📱 **Mobile E2E (Detox):** ${mobileEmoji} ${report.e2e.mobile.status}`;
    if (report.e2e.mobile.duration) {
      comment += ` _(${(report.e2e.mobile.duration/1000).toFixed(1)}s)_`;
    }
    comment += `\\n`;
    if (report.e2e.mobile.error) {
      comment += `   🔴 Error: \`${report.e2e.mobile.error}\`\\n`;
    }
  }
  
  if (report.e2e.web.status !== 'NOT_RUN') {
    const webEmoji = report.e2e.web.status === 'PASS' ? '✅' : '❌';
    comment += `🌐 **Web E2E (Playwright):** ${webEmoji} ${report.e2e.web.status}`;
    if (report.e2e.web.duration) {
      comment += ` _(${(report.e2e.web.duration/1000).toFixed(1)}s)_`;
    }
    comment += `\\n`;
    if (report.e2e.web.error) {
      comment += `   🔴 Error: \`${report.e2e.web.error}\`\\n`;
    }
  }
  
  // Infrastructure Status
  comment += `\\n### 🏗️ Infrastructure Status\\n\\n`;
  comment += `**Tests:** ${report.summary.passed} passed, ${report.summary.failed} failed\\n`;
  
  if (report.summary.failed > 0) {
    comment += `\\n**Failed Infrastructure Checks:**\\n`;
    report.infrastructure.checks
      .filter(c => c.status === 'FAIL')
      .forEach(check => {
        comment += `- ❌ ${check.name}`;
        if (check.error) comment += `: \`${check.error}\``;
        comment += `\\n`;
      });
  }
  
  // Environment Info
  comment += `\\n### ⚙️ Environment\\n\\n`;
  comment += `**Environment:** ${report.environment}\\n`;
  comment += `**Total Test Time:** ${((report.e2e.mobile.duration + report.e2e.web.duration)/1000).toFixed(1)}s\\n`;
  
  comment += `\\n---\\n`;
  comment += `*Automated CI E2E health check - ${timestamp}*`;
  
  return comment;
}

async function main() {
  log('MubleExpo CI Health Check starting...', 'info');
  
  try {
    await runInfrastructureChecks();
    await runE2ETests();
    
    const summary = await generateOutput();
    
    if (summary.overall === 'HEALTHY') {
      log('All checks passed!', 'success');
      process.exit(0);
    } else {
      log('Health check failed!', 'error');
      process.exit(1);
    }
    
  } catch (error) {
    log(`Unexpected error: ${error.message}`, 'error');
    report.overall = 'UNHEALTHY';
    await generateOutput();
    process.exit(1);
  }
}

// Handle signals
process.on('SIGINT', () => {
  log('Health check interrupted', 'warn');
  generateOutput().then(() => process.exit(1));
});

if (require.main === module) {
  main();
}

module.exports = { main, report };