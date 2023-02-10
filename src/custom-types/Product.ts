import { Locator } from '@playwright/test'
/**
 * Custom product data type to map product details
 */
export type Product = {
  name: any
  image: Locator
  view: Locator
  writeReview: Locator
  price: any
  outOfStock: Locator
  addToCart: Locator
}
