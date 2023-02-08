import { Page } from '@playwright/test'

/**
 * A class containing all operations on the locator which can be used on all child classes
 */
export class WebOperations {
  readonly page: Page

  /**
   * A parameterized constructor to initialize page object for all child pages
   * @param page Page object
   */
  constructor(page: Page) {
    this.page = page
  }

  /**
   * Check for the text presence in the given locator
   * @param locator A string that represent the locator
   * @param text A search string
   * @returns A boolean value
   */
  async isTextPresent(locator: string, text: string) {
    const allTexts = await this.page.locator(locator).allTextContents()
    let found = false
    for (let i = 0; i < allTexts.length; i++) {
      if (allTexts[i].trim().includes(text)) {
        found = true
        break
      }
    }
    return found
  }
}
