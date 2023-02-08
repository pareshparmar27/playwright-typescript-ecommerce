import { test, expect, Page } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { ProductPage } from '../../page-objects/ProductPage'

let page: Page
let homePage: HomePage
let loginPage: LoginPage
let productPage: ProductPage

/**
 * Visual test suite to check look and feel
 */
test.describe('Visual Test', () => {
  /**
   * Launch application before each tests
   */
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    productPage = new ProductPage(page)
    await page.goto('https://automationteststore.com/')
  })

  /**
   * checks look and feel of entire home page
   */
  test('Home page snapshot', async () => {
    expect(await page.screenshot()).toMatchSnapshot('homepage.png')
  })

  /**
   * checks look and feel of only login section on home page
   */
  test('Login section snapshot', async () => {
    await homePage.doClick('Login')
    const returningCustomer = page.locator(homePage.returningCustomer)
    await expect(returningCustomer).toBeVisible()

    expect(await returningCustomer.screenshot()).toMatchSnapshot(
      'returning-customer.png'
    )
  })

  /**
   * checks look and feel of only currency dropdown section on home page
   */
  test('Currency section snapshot', async () => {
    page.locator(homePage.currency).hover()
    const dropdown = page.locator(homePage.currencyDropdown)
    await expect(dropdown).toBeVisible()

    expect(await dropdown.screenshot()).toMatchSnapshot('currency.png')
  })

  /**
   * checks look and feel of entire men shirt page
   */
  test('Men shirt snapshot', async () => {
    await homePage.search('Apparel & accessories', 'T-shirts')
    await productPage.getImages().nth(2).click()
    await expect(productPage.getLocalImages().first()).toBeVisible()

    expect(await page.screenshot()).toMatchSnapshot('men-shirt.png')
  })

  /**
   * checks look and feel of entire liner palette page
   */
  test('Liner palette snapshot', async () => {
    await homePage.search('Makeup', 'Value Sets')
    await productPage.getImages().nth(0).click()
    await expect(productPage.getLocalImages().first()).toBeVisible()

    expect(await page.screenshot()).toMatchSnapshot('liner-palette.png')
  })

  /**
   * checks look and feel of entire paperback page
   */
  test('Paperback snapshot', async () => {
    await homePage.search('Books', 'Paperback')
    await expect(productPage.getImages().first()).toBeVisible()

    expect(await page.screenshot()).toMatchSnapshot('paperback.png')
  })
})
