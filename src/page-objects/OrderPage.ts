import { WebOperations } from '../operations/WebOperations'

export class OrderPage extends WebOperations {
  readonly confirmOrder = '[title="Confirm Order"]'
  readonly heading = '.maintext'

  /**
   * Performs click operation with given text
   * @param text A button/link name
   */
  async doClick(text: string) {
    await this.page.locator(this.getLocator(text)).click()
  }

  /**
   * Get order confirmation message
   * @returns A string value
   */
  async getOrderConfirmation() {
    await this.page.waitForSelector('text="Your Order Has Been Processed!"', {
      timeout: 30000,
    })
    return await this.page.locator(this.heading).textContent()
  }

  /**
   * Get the locator as per given name
   * @param name A name of the locator
   * @returns A locator as a string
   */
  private getLocator(name: string) {
    switch (name.toLowerCase()) {
      case 'confirm order':
        return this.confirmOrder
      default:
        throw new Error('locator not found for ' + name)
    }
  }
}
