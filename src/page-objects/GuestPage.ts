import { WebOperations } from '../operations/WebOperations'
import { faker } from '@faker-js/faker'

/**
 * A guest page class contains all locators and method to perform operations on them
 */
export class GuestPage extends WebOperations {
  readonly firstname = '#guestFrm_firstname'
  readonly lastname = '#guestFrm_lastname'
  readonly email = '#guestFrm_email'
  readonly address_one = '#guestFrm_address_1'
  readonly city = '#guestFrm_city'
  readonly state = '#guestFrm_zone_id'
  readonly zipcode = '#guestFrm_postcode'
  readonly country = '#guestFrm_country_id'
  readonly continue = '[title="Continue"]'

  /**
   * add user details
   */
  async addDetails() {
    await this.enterPersonalDetails()
    await this.enterAddress()
  }

  /**
   *  enter personal details using faker-js
   */
  async enterPersonalDetails() {
    await this.page.locator(this.firstname).type(faker.name.firstName())
    await this.page.locator(this.lastname).type(faker.name.lastName())
    await this.page.locator(this.email).type(faker.internet.email())
  }

  /**
   * enter address using faker-js
   */
  async enterAddress() {
    await this.page
      .locator(this.address_one)
      .type(faker.address.streetAddress())
    await this.page.locator(this.city).type(faker.address.city())
    await this.page.locator(this.state).selectOption('Aberdeen')
    await this.page.locator(this.zipcode).type(faker.address.zipCode())
    await this.page.locator(this.country).selectOption('Austria')
    await this.doClick('Continue')
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
      case 'continue':
        return this.continue
      default:
        throw new Error('locator not found for ' + name)
    }
  }
}
