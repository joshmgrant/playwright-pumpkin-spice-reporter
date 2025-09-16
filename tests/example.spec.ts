import { test, expect } from '@playwright/test';

test.describe('Pumpkin Spice Latte Shop 🎃☕', () => {
  test('should brew a perfect pumpkin spice latte', async ({ page }) => {
    await test.step('Grind the coffee beans', async () => {
      await page.waitForTimeout(100);
      expect(true).toBe(true);
    });

    await test.step('Add pumpkin spice mix', async () => {
      await page.waitForTimeout(100);
      const spiceLevel = 'perfect';
      expect(spiceLevel).toBe('perfect');
    });

    await test.step('Steam the milk', async () => {
      await page.waitForTimeout(100);
      const temperature = 165;
      expect(temperature).toBeGreaterThan(160);
      expect(temperature).toBeLessThan(170);
    });

    await test.step('Pour latte art', async () => {
      await page.waitForTimeout(100);
      const artPattern = 'leaf';
      expect(['leaf', 'heart', 'pumpkin']).toContain(artPattern);
    });
  });

  test('should serve autumn pastries', async ({ page }) => {
    const pastries = ['pumpkin bread', 'apple cider donut', 'maple scone'];
    
    for (const pastry of pastries) {
      await test.step(`Check availability of ${pastry}`, async () => {
        await page.waitForTimeout(50);
        expect(pastry).toBeTruthy();
      });
    }
  });

  test('should fail when winter arrives too early', async ({ page }) => {
    const season = 'winter';
    expect(season).toBe('autumn');
  });

  test.skip('should skip preparing hot chocolate (wrong season)', async ({ page }) => {
    await page.waitForTimeout(100);
  });

  test('should handle flaky wifi in the coffee shop', async ({ page }) => {
    const randomSuccess = Math.random() > 0.3;
    expect(randomSuccess).toBe(true);
  });

  test.fail('should expect this test to fail (testing xfail)', async ({ page }) => {
    const coffeeTemperature = 'cold';
    expect(coffeeTemperature).toBe('cold');
  });
});

test.describe('Fall Festival Tests 🍂', () => {
  test('should carve jack-o-lanterns', async ({ page }) => {
    const pumpkins = 5;
    const carved = 5;
    expect(carved).toBe(pumpkins);
  });

  test('should rake fallen leaves', async ({ page }) => {
    await test.step('Gather leaves into piles', async () => {
      await page.waitForTimeout(100);
      const piles = 3;
      expect(piles).toBeGreaterThan(0);
    });

    await test.step('Jump in leaf piles', async () => {
      await page.waitForTimeout(100);
      const fun = true;
      expect(fun).toBe(true);
    });
  });

  test('should pick apples from the orchard', async ({ page }) => {
    const appleTypes = ['Honeycrisp', 'Granny Smith', 'Gala', 'Fuji'];
    const basket: string[] = [];
    
    for (const apple of appleTypes) {
      basket.push(apple);
    }
    
    expect(basket).toHaveLength(4);
    expect(basket).toContain('Honeycrisp');
  });

  test.fixme('should fix the hayride (under maintenance)', async ({ page }) => {
    const hayrideStatus = 'broken';
    expect(hayrideStatus).toBe('operational');
  });
});

test.describe('Cozy Autumn Evening 🕯️', () => {
  test('should light cinnamon candles', async ({ page }) => {
    await page.waitForTimeout(200);
    const ambiance = 'cozy';
    expect(ambiance).toBe('cozy');
  });

  test('should wear fuzzy socks', async ({ page }) => {
    const socksFuzziness = 10;
    expect(socksFuzziness).toBe(10);
  });

  test('should fail to find summer clothes', async ({ page }) => {
    const season = 'autumn';
    const clothes = season === 'summer' ? 'shorts' : 'sweater';
    expect(clothes).toBe('shorts');
  });
});