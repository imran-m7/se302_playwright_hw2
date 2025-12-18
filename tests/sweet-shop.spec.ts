import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SweetsPage } from '../pages/SweetsPage';
import { BasketPage } from '../pages/BasketPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Sweet Shop Test Suite', () => {
  test('TC_01 - Navigation via Sweet Shop Logo', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('https://sweetshop.netlify.app/');
    // Navigate to Sweets page
    await homePage.navigateToMenu('Sweets');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');
    // Click logo to go back home
    await homePage.clickLogo();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/');
  });

  test('TC_05 - Add product to basket', async ({ page }) => {
    const sweetsPage = new SweetsPage(page);
    const basketPage = new BasketPage(page);
    await page.goto('https://sweetshop.netlify.app/sweets');
    // Add a product, e.g., Sherbert Straws
    await sweetsPage.addProductToBasket('Sherbert Straws');
    // Wait for basket update (adjust selector if needed)
    await page.waitForSelector('.basket-count', { state: 'visible' }); // Assuming a basket count indicator
    // Navigate to basket
    await basketPage.navigateToBasket();
    // Verify product in basket with explicit wait
    await page.waitForTimeout(1000); // Temporary; replace with proper wait
    await basketPage.verifyProductInBasket('Sherbert Straws');
  });

  test('TC_06 - Verify navigation menu', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('https://sweetshop.netlify.app/');
    // Navigate to Sweets
    await homePage.navigateToMenu('Sweets');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');
    // Navigate to About
    await homePage.navigateToMenu('About');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/about');
    // Navigate to Login
    await homePage.navigateToMenu('Login');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/login');
    // Navigate to Basket
    await homePage.navigateToMenu('Basket');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/basket');
    // Return to Home using logo
    await homePage.clickLogo();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/');
  });

  test('TC_08 - Login with empty credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://sweetshop.netlify.app/login');
    await loginPage.login('', '');
    // Expect error message
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('required'); // Assuming some message
  });

  test('TC_09 - Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://sweetshop.netlify.app/login');
    await loginPage.login('invalid@email.com', 'short');
    // Expect error message
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('error'); // Assuming some message
  });
});