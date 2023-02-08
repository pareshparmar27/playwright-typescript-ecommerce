import { WebOperations } from '../operations/WebOperations'

/**
 * A login page class contains all locators and method to perform operations on them
 */
export class LoginPage extends WebOperations {
  readonly loginName = '#loginFrm_loginname'
  readonly password = '#loginFrm_password'
  readonly loginButton = '[title="Login"]'
  readonly alertError = '.alert-error'
  readonly continue = '[title="Continue"]'

  /**
   * login to the application with user credentails
   * @param username A username of the customer
   * @param password A password of the customer
   */
  async doLogin(username: string, password: string) {
    await this.page.locator(this.loginName).type(username)
    await this.page.locator(this.password).type(password)
    await this.page.locator(this.loginButton).click()
  }

  /**
   * Performs click operation with given text
   * @param text A button/link name
   */
  async doClick(text: string) {
    await this.page.locator(this.getLocator(text)).click()
  }

  /**
   * Get the locator as per given name
   * @param name A name of the locator
   * @returns A locator as a string
   */
  private getLocator(name: string) {
    switch (name.toLowerCase()) {
      case 'confirm order':
        return this.continue
      case 'continue':
        return this.continue
      default:
        throw new Error('locator not found for ' + name)
    }
  }
}
