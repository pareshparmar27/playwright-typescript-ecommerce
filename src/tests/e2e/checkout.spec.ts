import { expect, Page } from '@playwright/test'
import { test } from '../../fixture/my-test'
import { GuestPage } from '../../page-objects/GuestPage'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { OrderPage } from '../../page-objects/OrderPage'
import { ProductPage } from '../../page-objects/ProductPage'

let page: Page
let homePage: HomePage
let loginPage: LoginPage
let productPage: ProductPage
let orderPage: OrderPage
let guestPage: GuestPage

/**
 * Checkout to ensure the products are successfully ordered
 */
test.describe('Product checkout Test', () => {
  /**
   * Launch the application
   */
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    productPage = new ProductPage(page)
    orderPage = new OrderPage(page)
    guestPage = new GuestPage(page)
    await page.goto('/')
  })

  /**
   * Checkout and order shampoo product with register account
   */
  test('Order a shampoo product with register account', async ({
    username,
    password,
  }) => {
    await homePage.search('Hair Care', 'Shampoo')

    expect(await homePage.getSubCategoryHeading()).toBe('Shampoo')
    expect(await homePage.getProductCount()).toBeGreaterThan(0)

    await productPage.getCart().first().click()
    await homePage.doClick('Checkout')
    await page.getByLabel('Register Account').check()
    await loginPage.doLogin(username, password)
    await orderPage.doClick('Confirm Order')

    expect(await orderPage.getOrderConfirmation()).toContain(
      'Your Order Has Been Processed!'
    )
  })

  /**
   * Checkout and order shampoo product with guest account
   */
  test('Order a eyes product with guest account', async () => {
    await homePage.search('Skincare', 'Eyes')

    expect(await homePage.getSubCategoryHeading()).toBe('Eyes')
    expect(await homePage.getProductCount()).toBeGreaterThan(0)

    await productPage.getCart().first().click()
    await homePage.doClick('Checkout')
    await page.getByLabel('Guest Checkout').check()
    await loginPage.doClick('Continue')
    await guestPage.addDetails()
    await orderPage.doClick('Confirm Order')

    expect(await orderPage.getOrderConfirmation()).toContain(
      'Your Order Has Been Processed!'
    )
  })
})
