import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SweetsPage } from '../pages/SweetsPage';
import { BasketPage } from '../pages/BasketPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Sweet Shop Test Suite', () => {
  test('TC_01 - Navigation via Sweet Shop Logo', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('https://sweetshop.netlify.app/');
    
    await homePage.navigateToMenu('Sweets');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');
    
    await homePage.clickLogo();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/');
  });

  test('TC_05 - Add product to basket', async ({ page }) => {
    const sweetsPage = new SweetsPage(page);
    const basketPage = new BasketPage(page);

    await page.goto('https://sweetshop.netlify.app/sweets');

    
    const productLocator = page.locator('h4:has-text("Sherbert Straws")');
    await productLocator.waitFor({ state: 'visible' });

    
    await sweetsPage.addProductToBasket('Sherbert Straws');

    
    await page.waitForSelector('text=Sherbert Straws', { timeout: 5000 });

    
    await basketPage.navigateToBasket();

    
    await basketPage.verifyProductInBasket('Sherbert Straws');
  });

  test('TC_06 - Verify navigation menu', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('https://sweetshop.netlify.app/');
    
    await homePage.navigateToMenu('Sweets');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');
    
    await homePage.navigateToMenu('About');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/about');
    
    await homePage.navigateToMenu('Login');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/login');
    
    await homePage.navigateToMenu('Basket');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/basket');
    
    await homePage.clickLogo();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/');
  });

  test('TC_08 - Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://sweetshop.netlify.app/login');
    await loginPage.login('', '');
    
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('required');
  });

  test('TC_09 - Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://sweetshop.netlify.app/login');
    await loginPage.login('invalid@email.com', 'short');
    
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('error');
  });
});