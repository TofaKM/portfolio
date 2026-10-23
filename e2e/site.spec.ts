import { expect, test } from '@playwright/test'

const pages = ['/', '/about', '/projects', '/skills', '/certifications', '/cv', '/contact']

test.describe('pages', () => {
  for (const path of pages) {
    test(`${path} loads with one h1 and its own title`, async ({ page }) => {
      const res = await page.goto(path)
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page).toHaveTitle(/Tofa Kimani/)
    })
  }

  test('unknown pages return 404', async ({ page }) => {
    const res = await page.goto('/no-such-page')
    expect(res?.status()).toBe(404)
  })
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('content is visible, not left hidden by animations', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.getByRole('heading', { name: /Agri-Link/ })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'What people say' })).toBeVisible()
  })
})

test.describe('theme', () => {
  test('the toggle switches theme and remembers it', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const before = await html.getAttribute('data-theme')
    expect(before === 'light' || before === 'dark').toBe(true)

    await page.getByRole('button', { name: /Switch to (dark|light) mode/ }).click()
    const after = before === 'dark' ? 'light' : 'dark'
    await expect(html).toHaveAttribute('data-theme', after)

    await page.reload()
    await expect(html).toHaveAttribute('data-theme', after)
  })
})

test.describe('contact form', () => {
  test('shows field errors when sent empty', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: 'Send Message' }).click()
    await expect(page.getByText('Please enter your name.')).toBeVisible()
    await expect(page.getByText('Please enter your email address.')).toBeVisible()
    await expect(page.getByText('Please choose a subject.')).toBeVisible()
    await expect(page.getByLabel('Your Name')).toBeFocused()
  })

  test('a valid message reaches the API and failures fall back to email', async ({ page }) => {
    // No Gmail credentials in test runs, so the API answers "not set up"
    // (or "too many" if the rate limit was hit by earlier runs) — either way
    // the visitor must see an error with the direct email address.
    await page.goto('/contact')
    await page.getByLabel('Your Name').fill('Playwright Test')
    await page.getByLabel('Email Address').fill('test@example.com')
    await page.getByLabel('Subject').selectOption('hi')
    await page.getByLabel('Message').fill('An automated end-to-end test of the contact form.')
    await page.waitForTimeout(3200) // the API ignores forms filled faster than 3 s

    const response = page.waitForResponse('**/api/contact')
    await page.getByRole('button', { name: 'Send Message' }).click()
    expect([200, 429, 503]).toContain((await response).status())

    // Scoped to the form: Next's route announcer also has role=alert.
    const alert = page.locator('form').getByRole('alert')
    const sent = page.getByText('Message Sent!')
    await expect(alert.or(sent)).toBeVisible()
    if (await alert.isVisible()) await expect(alert).toContainText('mwangitofa@gmail.com')
  })
})

test.describe('navigation', () => {
  test('the floating page menu moves between pages', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Open page menu' }).click()
    const menu = page.locator('#quick-pages')
    await expect(menu).toBeVisible()
    await menu.getByRole('link', { name: 'Skills' }).click()
    await expect(page).toHaveURL(/\/skills$/)
    await expect(page.locator('h1')).toHaveText('Skills & Expertise')
    await expect(menu).toBeHidden()
  })

  test('Escape closes the page menu', async ({ page }) => {
    await page.goto('/about')
    await page.getByRole('button', { name: 'Open page menu' }).click()
    await expect(page.locator('#quick-pages')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('#quick-pages')).toBeHidden()
  })
})
