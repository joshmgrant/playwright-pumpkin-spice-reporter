# 🎃 Playwright Pumpkin Spice Reporter ☕

A festive, autumn-themed custom reporter for Playwright Test that brings the cozy warmth of pumpkin spice season to your test results!

Inspired by the [pytest-pumpkin-spice](https://github.com/joshmgrant/pytest-pumpkin-spice) plugin, this reporter replaces boring test status indicators with delightful fall emojis and adds autumn colors to your test output.

## 🍂 Features

- **Autumn Emojis**: Test results displayed with seasonal emojis
  - 🎃 PASSED - Jack-o-lantern for successful tests
  - ❄️ FAILED - Snowflake for failed tests (winter is coming!)
  - ☕ SKIPPED - Pumpkin spice latte for skipped tests
  - 🥧 ERROR - Pumpkin pie for errors
  - 🍂 XFAIL - Falling leaves for expected failures
  - 🍠 XPASS - Sweet potato for unexpected passes
  - ⏰ TIMEOUT - Clock for timed out tests
  - 🛑 INTERRUPTED - Stop sign for interrupted tests

- **Colorful Output**: Warm autumn colors including pumpkin orange, spice brown, and leaf yellow
- **Detailed Test Steps**: Shows test steps with cozy formatting
- **Test Summary**: Beautiful harvest-themed summary with statistics
- **Flaky Test Detection**: Identifies flaky tests with special indicators

## 📦 Installation

```bash
npm install playwright-pumpkin-spice-reporter --save-dev
```

Or with yarn:

```bash
yarn add -D playwright-pumpkin-spice-reporter
```

## 🔧 Usage

### Option 1: Configure in playwright.config.ts

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // ... other config options
  reporter: 'playwright-pumpkin-spice-reporter',
});
```

### Option 2: Use via Command Line

```bash
npx playwright test --reporter=playwright-pumpkin-spice-reporter
```

### Option 3: Use Multiple Reporters

```typescript
export default defineConfig({
  reporter: [
    ['playwright-pumpkin-spice-reporter'],
    ['html', { outputFolder: 'playwright-report' }]
  ],
});
```

## 🧪 Example Output

```
╔════════════════════════════════════════════════════════════╗
║     🎃 🍂 Pumpkin Spice Test Reporter 🍂 🎃      ║
║         ☕ Fall flavored test results ☕          ║
╚════════════════════════════════════════════════════════════╝

🍁 Starting test run with 12 tests...

  🎃 PASSED 🎃 - should brew a perfect pumpkin spice latte (523ms)
    └─ ✅ Grind the coffee beans (102ms)
    └─ ✅ Add pumpkin spice mix (101ms)
    └─ ✅ Steam the milk (103ms)
    └─ ✅ Pour latte art (105ms)
  
  🎃 PASSED 🎃 - should serve autumn pastries (165ms)
  
  ❄️ FAILED ❄️ - should fail when winter arrives too early (45ms)
    ━━━ Error Details ━━━
    Expected: "autumn"
    Received: "winter"
    ━━━━━━━━━━━━━━━━━━━━
  
  ☕ SKIPPED ☕ - should skip preparing hot chocolate (wrong season) (0ms)

═══════════════════════════════════════════════════════════

🍂 Autumn Test Harvest Summary 🍂

  🎃  Passed:      8
  ❄️  Failed:      2
  ☕  Skipped:     2
  🍁  Flaky:       1

  ⏱️  Total time:  2.34s
  📊 Success rate: 67%

  ❄️ Some tests failed. Time to cozy up and fix them! 🧣

═══════════════════════════════════════════════════════════
```

## 🏗️ Building from Source

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the TypeScript:
   ```bash
   npm run build
   ```
4. Run example tests:
   ```bash
   npm run test:example
   ```

## 🎨 Customization

The reporter uses ANSI color codes for terminal output. The color scheme includes:
- Pumpkin orange for borders and headers
- Warm browns and yellows for autumn feels
- Green for passed tests
- Red for failures
- Seasonal emojis throughout

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more seasonal emojis
- Enhance color schemes
- Add configuration options
- Improve test step formatting

## 📄 License

MIT License - Enjoy your testing with a side of pumpkin spice!

## 🙏 Acknowledgments

- Inspired by [pytest-pumpkin-spice](https://github.com/joshmgrant/pytest-pumpkin-spice)
- Built for the [Playwright Test](https://playwright.dev) framework
- Created with love during pumpkin spice season 🍂

---

*May your tests be as delightful as a warm pumpkin spice latte on a crisp autumn morning!* ☕🍁