import {
  Reporter,
  TestCase,
  TestResult,
  TestStep,
  FullConfig,
  Suite,
  FullResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface PumpkinSpiceEmojis {
  passed: { short: string; verbose: string };
  failed: { short: string; verbose: string };
  skipped: { short: string; verbose: string };
  error: { short: string; verbose: string };
  xfailed: { short: string; verbose: string };
  xpassed: { short: string; verbose: string };
  timedOut: { short: string; verbose: string };
  interrupted: { short: string; verbose: string };
}

class PumpkinSpiceReporter implements Reporter {
  private totalTests = 0;
  private passedTests = 0;
  private failedTests = 0;
  private skippedTests = 0;
  private flakyTests = 0;
  private startTime: Date = new Date();
  private config!: FullConfig;
  private suite!: Suite;

  private emojis: PumpkinSpiceEmojis = {
    passed: { short: '🎃', verbose: 'PASSED 🎃' },
    failed: { short: '❄️', verbose: 'FAILED ❄️' },
    skipped: { short: '☕', verbose: 'SKIPPED ☕' },
    error: { short: '🥧', verbose: 'ERROR 🥧' },
    xfailed: { short: '🍂', verbose: 'XFAIL 🍂' },
    xpassed: { short: '🍠', verbose: 'XPASS 🍠' },
    timedOut: { short: '⏰', verbose: 'TIMEOUT ⏰' },
    interrupted: { short: '🛑', verbose: 'INTERRUPTED 🛑' },
  };

  private autumnColors = {
    reset: '\x1b[0m',
    orange: '\x1b[38;5;208m',
    brown: '\x1b[38;5;94m',
    yellow: '\x1b[38;5;220m',
    red: '\x1b[38;5;196m',
    green: '\x1b[38;5;34m',
    pumpkin: '\x1b[38;5;214m',
    spice: '\x1b[38;5;130m',
    cream: '\x1b[38;5;230m',
    leaf: '\x1b[38;5;178m',
    dim: '\x1b[2m',
    bold: '\x1b[1m',
  };

  onBegin(config: FullConfig, suite: Suite) {
    this.config = config;
    this.suite = suite;
    this.startTime = new Date();
    this.totalTests = suite.allTests().length;
    
    console.log('\n' + this.autumnColors.pumpkin + '╔════════════════════════════════════════════════════════════╗' + this.autumnColors.reset);
    console.log(this.autumnColors.pumpkin + '║' + this.autumnColors.reset + '     🎃 🍂 ' + this.autumnColors.orange + this.autumnColors.bold + 'Pumpkin Spice Test Reporter' + this.autumnColors.reset + ' 🍂 🎃      ' + this.autumnColors.pumpkin + '║' + this.autumnColors.reset);
    console.log(this.autumnColors.pumpkin + '║' + this.autumnColors.reset + '         ' + this.autumnColors.spice + '☕ Fall flavored test results ☕' + this.autumnColors.reset + '          ' + this.autumnColors.pumpkin + '║' + this.autumnColors.reset);
    console.log(this.autumnColors.pumpkin + '╚════════════════════════════════════════════════════════════╝' + this.autumnColors.reset);
    console.log();
    console.log(this.autumnColors.leaf + '🍁 Starting test run with ' + this.autumnColors.bold + this.totalTests + this.autumnColors.reset + this.autumnColors.leaf + ' tests...' + this.autumnColors.reset);
    console.log();
  }

  onTestBegin(test: TestCase, result: TestResult) {
    const location = test.location ? `${test.location.file}:${test.location.line}` : '';
    process.stdout.write(
      this.autumnColors.dim + '  Running: ' + this.autumnColors.reset + 
      this.autumnColors.cream + test.title + this.autumnColors.reset +
      (location ? this.autumnColors.dim + ' (' + location + ')' + this.autumnColors.reset : '') +
      ' ... '
    );
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const emoji = this.getStatusEmoji(result.status, test.expectedStatus);
    const duration = result.duration;
    
    let statusColor = this.autumnColors.green;
    if (result.status === 'failed') {
      statusColor = this.autumnColors.red;
      this.failedTests++;
    } else if (result.status === 'skipped') {
      statusColor = this.autumnColors.yellow;
      this.skippedTests++;
    } else if (result.status === 'passed') {
      this.passedTests++;
      if (result.retry > 0) {
        this.flakyTests++;
        statusColor = this.autumnColors.orange;
      }
    }

    process.stdout.write(
      '\r' + this.autumnColors.dim + '  ' + this.autumnColors.reset +
      emoji.short + ' ' +
      statusColor + emoji.verbose + this.autumnColors.reset +
      ' - ' + this.autumnColors.cream + test.title + this.autumnColors.reset +
      this.autumnColors.dim + ' (' + duration + 'ms)' + this.autumnColors.reset +
      (result.retry > 0 ? this.autumnColors.orange + ' [FLAKY]' + this.autumnColors.reset : '') +
      '\n'
    );

    if (result.error) {
      this.printError(result.error);
    }

    if (result.attachments.length > 0) {
      this.printAttachments(result.attachments);
    }
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
    if (step.category === 'test.step') {
      process.stdout.write(
        '    ' + this.autumnColors.dim + '└─ ' + 
        this.autumnColors.spice + step.title + this.autumnColors.reset +
        ' ... '
      );
    }
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
    if (step.category === 'test.step') {
      const statusEmoji = step.error ? '❌' : '✅';
      process.stdout.write(
        '\r    ' + this.autumnColors.dim + '└─ ' + 
        statusEmoji + ' ' +
        this.autumnColors.spice + step.title + this.autumnColors.reset +
        this.autumnColors.dim + ' (' + Math.round(step.duration) + 'ms)' + this.autumnColors.reset +
        '\n'
      );
      
      if (step.error) {
        this.printError(step.error, '      ');
      }
    }
  }

  async onEnd(result: FullResult) {
    console.log();
    console.log(this.autumnColors.pumpkin + '═══════════════════════════════════════════════════════════' + this.autumnColors.reset);
    console.log();
    
    const duration = Date.now() - this.startTime.getTime();
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(2);

    console.log(this.autumnColors.orange + this.autumnColors.bold + '🍂 Autumn Test Harvest Summary 🍂' + this.autumnColors.reset);
    console.log();
    
    const results = [
      { emoji: '🎃', label: 'Passed', count: this.passedTests, color: this.autumnColors.green },
      { emoji: '❄️', label: 'Failed', count: this.failedTests, color: this.autumnColors.red },
      { emoji: '☕', label: 'Skipped', count: this.skippedTests, color: this.autumnColors.yellow },
      { emoji: '🍁', label: 'Flaky', count: this.flakyTests, color: this.autumnColors.orange },
    ];

    results.forEach(r => {
      if (r.count > 0 || r.label === 'Passed') {
        console.log(
          '  ' + r.emoji + '  ' + 
          r.color + r.label + ':' + this.autumnColors.reset + 
          ' '.repeat(12 - r.label.length) + 
          this.autumnColors.bold + r.count + this.autumnColors.reset
        );
      }
    });

    console.log();
    console.log(
      '  ⏱️  ' + this.autumnColors.spice + 'Total time:' + this.autumnColors.reset + '  ' +
      this.autumnColors.bold + 
      (minutes > 0 ? minutes + 'm ' : '') + seconds + 's' +
      this.autumnColors.reset
    );

    const percentage = this.totalTests > 0 ? Math.round((this.passedTests / this.totalTests) * 100) : 0;
    console.log(
      '  📊 ' + this.autumnColors.spice + 'Success rate:' + this.autumnColors.reset + ' ' +
      this.getPercentageColor(percentage) + this.autumnColors.bold + percentage + '%' + this.autumnColors.reset
    );

    console.log();
    
    if (result.status === 'passed') {
      console.log(this.autumnColors.green + this.autumnColors.bold + '  🎃 All tests passed! Enjoy your pumpkin spice latte! ☕' + this.autumnColors.reset);
    } else if (result.status === 'failed') {
      console.log(this.autumnColors.red + this.autumnColors.bold + '  ❄️ Some tests failed. Time to cozy up and fix them! 🧣' + this.autumnColors.reset);
    } else {
      console.log(this.autumnColors.yellow + this.autumnColors.bold + '  🍂 Test run completed with mixed results 🍂' + this.autumnColors.reset);
    }
    
    console.log();
    console.log(this.autumnColors.pumpkin + '═══════════════════════════════════════════════════════════' + this.autumnColors.reset);
    console.log();
  }

  private getStatusEmoji(status: string, expectedStatus?: string): { short: string; verbose: string } {
    if (status === 'passed' && expectedStatus === 'failed') {
      return this.emojis.xpassed;
    }
    if (status === 'failed' && expectedStatus === 'failed') {
      return this.emojis.xfailed;
    }
    
    switch (status) {
      case 'passed':
        return this.emojis.passed;
      case 'failed':
        return this.emojis.failed;
      case 'skipped':
        return this.emojis.skipped;
      case 'timedOut':
        return this.emojis.timedOut;
      case 'interrupted':
        return this.emojis.interrupted;
      default:
        return this.emojis.error;
    }
  }

  private getPercentageColor(percentage: number): string {
    if (percentage >= 90) return this.autumnColors.green;
    if (percentage >= 70) return this.autumnColors.yellow;
    if (percentage >= 50) return this.autumnColors.orange;
    return this.autumnColors.red;
  }

  private printError(error: any, indent: string = '    ') {
    console.log(indent + this.autumnColors.red + '━━━ Error Details ━━━' + this.autumnColors.reset);
    
    if (error.message) {
      console.log(indent + this.autumnColors.red + error.message + this.autumnColors.reset);
    }
    
    if (error.stack) {
      const stackLines = error.stack.split('\n').slice(1, 4);
      stackLines.forEach((line: string) => {
        console.log(indent + this.autumnColors.dim + line.trim() + this.autumnColors.reset);
      });
    }
    
    console.log(indent + this.autumnColors.red + '━━━━━━━━━━━━━━━━━━━━' + this.autumnColors.reset);
  }

  private printAttachments(attachments: any[]) {
    if (attachments.length > 0) {
      console.log('    ' + this.autumnColors.spice + '📎 Attachments:' + this.autumnColors.reset);
      attachments.forEach(att => {
        console.log('      ' + this.autumnColors.dim + '• ' + att.name + this.autumnColors.reset);
      });
    }
  }

  printsToStdio() {
    return true;
  }
}

export default PumpkinSpiceReporter;