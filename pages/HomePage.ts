import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async clickLogo() {
    await this.page.locator('a:has-text("Sweet Shop")').click();
  }

  async navigateToMenu(menuItem: string) {
    const text = menuItem === 'Sweets' ? 'Browse Sweets' : menuItem;
    await this.page.locator(`a:has-text("${text}")`).click();
  }
}