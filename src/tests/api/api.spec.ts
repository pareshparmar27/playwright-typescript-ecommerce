import { expect, test } from '@playwright/test'

/**
 * API test suite to check all users endpoints
 */
test.describe.parallel('API Test', () => {
  /**
   * GET endpoint to fetch all users details
   */
  test('GET - list users', async ({ request }) => {
    const response = await request.get('/api/users')
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(jsonResponse.data.length).toBeGreaterThan(0)
  })

  /**
   * GET endpoint to fetch single user details
   */
  test('GET - single user', async ({ request }) => {
    const response = await request.get('/api/users/2')
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(jsonResponse.data.id).toBe(2)
    expect(jsonResponse.data.first_name).toBe('Janet')
    expect(jsonResponse.data.last_name).toBe('Weaver')
  })

  /**
   * GET endpoint to check user details are not found with invalid id
   */
  test('GET - single user not found', async ({ request }) => {
    const response = await request.get('/api/users/23')
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(404)
  })

  /**
   * POST endpoint to create a new user
   */
  test('POST - create user', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: {
        name: 'John Snow',
        job: 'Leader',
      },
    })
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(201)
    expect(Number(jsonResponse.id)).toBeGreaterThan(0)
    expect(jsonResponse.name).toBe('John Snow')
    expect(jsonResponse.job).toBe('Leader')
  })

  /**
   * POST endpoint for successful new user registration
   */
  test('POST - register user successful', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      },
    })
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(Number(jsonResponse.id)).toBeGreaterThan(0)
    expect(jsonResponse.token.length).toBe(17)
  })

  /**
   * POST endpoint for unsuccessful new user registration
   */
  test('POST - register user unsuccessful', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: {
        email: 'sydney@fife',
      },
    })
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(400)
    expect(jsonResponse.error).toBe('Missing password')
  })

  /**
   * POST endpoint for successful user login
   */
  test('POST - login successful', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      },
    })
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(jsonResponse.token.length).toBe(17)
  })

  /**
   * POST endpoint for unsuccessful user login
   */
  test('POST - login unsuccessful', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
      },
    })
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(400)
    expect(jsonResponse.error).toBe('Missing password')
  })

  /**
   * PUT endpoint to update user details
   */
  test('PUT - update user', async ({ request }) => {
    const response = await request.put('/api/users/2', {
      data: {
        name: 'John Snow',
        job: 'Night watcher',
      },
    })
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(jsonResponse.name).toBe('John Snow')
    expect(jsonResponse.job).toBe('Night watcher')
  })

  /**
   * PATCH endpoint to partially update user details
   */
  test('PATCH - update user', async ({ request }) => {
    const response = await request.patch('/api/users/2', {
      data: {
        name: 'John Snow',
        job: 'Ruler of seven kingdoms',
      },
    })
    const jsonResponse = JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(jsonResponse.name).toBe('John Snow')
    expect(jsonResponse.job).toBe('Ruler of seven kingdoms')
  })

  /**
   * DELETE endpoint to delete user
   */
  test('DELETE - remove user', async ({ request }) => {
    const response = await request.delete('/api/users/2')

    expect(response.status()).toBe(204)
  })
})
