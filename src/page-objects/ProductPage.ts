import { WebOperations } from '../operations/WebOperations'

/**
 * A product page class contains all locators and method to perform operations on them
 */
export class ProductPage extends WebOperations {
  readonly name = '.prdocutname'
  readonly price = '.oneprice'
  readonly cart = '.productcart'
  readonly image = '.thumbnail > a > img'
  readonly localImage = '#product_details .local_image img'

  /**
   * Get product cart
   * @returns list of products cart
   */
  getCart() {
    return this.page.locator(this.cart)
  }

  /**
   * Get product images
   * @returns list of product images
   */
  getImages() {
    return this.page.locator(this.image)
  }

  /**
   * Get product local image
   * @returns list of product local images
   */
  getLocalImages() {
    return this.page.locator(this.localImage)
  }
}
