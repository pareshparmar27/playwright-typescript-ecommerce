import { test, expect, Page } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

let homePage: HomePage
let page: Page

/**
 * Home test suite to check products are present as per choosen categories
 */
test.describe('Home Test', () => {
  /**
   * Launch application before all tests
   */
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.goto('/')
    homePage = new HomePage(page)
  })

  /**
   * Searches for shoes related products
   */
  test('Search shoes under apparel & accessories category', async () => {
    await homePage.search('Apparel & accessories', 'Shoes')
    expect(await homePage.getSubCategoryHeading()).toBe('Shoes')
    expect(await homePage.getProductCount()).toBeGreaterThan(0)
  })

  /**
   * Searches for eyes related products
   */
  test('Search eyes products under makeup category', async () => {
    await homePage.search('Makeup', 'Eyes')
    expect(await homePage.getSubCategoryHeading()).toBe('Eyes')
    expect(await homePage.getProductCount()).toBeGreaterThan(0)
  })

  /**
   * Searches for sun cream related products
   */
  test('Search sun cream under skincare category', async () => {
    await homePage.search('Skincare', 'Sun')
    expect(await homePage.getSubCategoryHeading()).toBe('Sun')
    expect(await homePage.getProductCount()).toBeGreaterThan(0)
  })

  /**
   * Searches for perfume related products
   */
  test('Search womens perfume under fragrance category', async () => {
    await homePage.search('Fragrance', 'Women')
    expect(await homePage.getSubCategoryHeading()).toBe('Women')
    expect(await homePage.getProductCount()).toBeGreaterThan(0)
  })

  /**
   * Searches for body & shower related products
   */
  test('Search body & shower under men category', async () => {
    await homePage.search('Men', 'Body & Shower')
    expect(await homePage.getSubCategoryHeading()).toBe('Body & Shower')
    expect(await homePage.getProductCount()).toBeGreaterThan(0)
  })

  /**
   * Searches for shampooes related products
   */
  test('Search shampoos under hair care category', async () => {
    await homePage.search('Hair Care', 'Shampoo')
    expect(await homePage.getSubCategoryHeading()).toBe('Shampoo')
    expect(await homePage.getProductCount()).toBeGreaterThan(0)
  })

  /**
   * Searches for audio cd related products
   */
  test('Search audio cd under books category', async () => {
    await homePage.search('Books', 'Audio CD')
    expect(await homePage.getSubCategoryHeading()).toBe('Audio CD')
    expect(await homePage.getProductCount()).toBeGreaterThan(0)
  })
})
