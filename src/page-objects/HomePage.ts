import { Product } from '../custom-types/Product'
import { WebOperations } from '../operations/WebOperations'

/**
 * A home page class contains all locators and method to perform operations on them
 */
export class HomePage extends WebOperations {
  readonly menu = '#customer_menu_top'
  readonly menuText = '.menu_text'
  readonly categories = '.categorymenu > li > a'
  readonly subCategories =
    '//nav//a[contains(text(), "cat-placeholder")]/following-sibling::div//a[contains(text(), "subcat-placeholder")]'
  readonly heading = '.maintext'
  readonly productList = '.list-inline > div:not(.clearfix)'
  readonly checkout = '[data-id="menu_checkout"]'
  readonly returningCustomer = '.returncustomer'
  readonly currency = '.language'
  readonly currencyDropdown = '.dropdown-menu.currency'
  readonly name = '.prdocutname'
  readonly image = '.thumbnail > a > img'
  readonly view = '.details'
  readonly writeReview = '.compare'
  readonly price = '.price > div'
  readonly outOfStock = '.nostock'
  readonly addToCart = '.productcart'

  /**
   * Performs click operation with given text
   * @param text A button/link name
   */
  async doClick(text: string) {
    await this.page.locator(this.getLocator(text)).first().click()
  }

  /**
   * Searches for products as per given category and subcategory
   * @param category A category
   * @param subcategory A subcategory
   */
  async search(category: string, subcategory: string) {
    await this.page.locator(this.categories).filter({ hasText: category }).hover()
    await this.page
      .locator(this.subCategories.replace('cat-placeholder', category).replace('subcat-placeholder', subcategory))
      .click()
  }

  /**
   * Get the text of the sub category
   * @returns A string value
   */
  async getSubCategoryHeading() {
    return await this.page.locator(this.heading).textContent()
  }

  /**
   * Get the list of all products of the selected categories
   * @returns A list of all products
   */
  async getProducts() {
    let list: Product[] = []
    const products = this.page.locator(this.productList)
    const count = await products.count()
    for (let i = 0; i < count; i++) {
      let product: Product = {
        name: await products.nth(i).locator(this.name).textContent(),
        image: products.nth(i).locator(this.image),
        view: products.nth(i).locator(this.view),
        writeReview: products.nth(i).locator(this.writeReview),
        price: await products.nth(i).locator(this.price).first().textContent(),
        outOfStock: products.nth(i).locator(this.outOfStock),
        addToCart: products.nth(i).locator(this.addToCart),
      }
      list.push(product)
    }
    return list
  }

  /**
   * Get the locator as per given name
   * @param name A name of the locator
   * @returns A locator as a string
   */
  private getLocator(name: string) {
    switch (name.toLowerCase()) {
      case 'login':
        return this.menu
      case 'checkout':
        return this.checkout
      default:
        throw new Error('locator not found for ' + name)
    }
  }
}
