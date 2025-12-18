import { Page } from '@playwright/test';

export class SweetsPage {
  constructor(private page: Page) {}

  async addProductToBasket(productName: string) {
    await this.page.locator(`h4:has-text("${productName}")`).locator('xpath=following::a[text()="Add to Basket"]').first().click();
  }
}