import { expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'
import { test } from '../../fixture/my-test'

let homePage: HomePage
let loginPage: LoginPage

/**
 * Login test suite to check login functionality with valid and invalid credentails
 */
test.describe('Login Test', () => {
  /**
   * Launch application before each test and clicks on login button
   */
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    await homePage.doClick('Login')
  })

  /**
   * Login functionality check with valid credentials to ensure user is successfuly logged in
   */
  test('Successful login', async ({ username, password }) => {
    await loginPage.doLogin(username, password)
    expect(
      await homePage.isTextPresent(homePage.menuText, 'Welcome back test')
    ).toEqual(true)
  })

  /**
   * Login functionality check with invalid credentials to ensure user gets an error message
   */
  test('Unsuccessful login', async ({ username, password }) => {
    await loginPage.doLogin(username, 'password123')
    expect(
      await loginPage.isTextPresent(
        loginPage.alertError,
        'Error: Incorrect login or password provided.'
      )
    ).toEqual(true)
  })
})
