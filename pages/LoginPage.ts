import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.fill('input[type="email"]', username);
    await this.page.fill('input[type="password"]', password);
    await this.page.click('button:has-text("Login")');
  }

  async getErrorMessage() {
    // Assuming error message appears, perhaps in a div or p
    return this.page.locator('.error, p.error, .alert').textContent();
  }
}