import { Page, expect } from '@playwright/test';

export class BasketPage {
  constructor(private page: Page) {}

  async verifyProductInBasket(productName: string) {
    const productLocator = this.page.locator(`text=${productName}`);
    await expect(productLocator).toBeVisible();
  }

  async navigateToBasket() {
    await this.page.locator('a[href="/basket"]').click();
  }
}