import { test } from "@playwright/test"

//test.beforeAll(() => {}) //rarely used

test.beforeEach(async ({ page }) => {
    await page.goto("/")
})

test.describe("test suite 1", () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Charts').click()
    })
    test("the first test", async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test("navigate to datepicker page", async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})

test.describe("test suite 2", () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })
    test("the first test", async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test("navigate to datepicker page", async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})

// test.afterAll(() => {}) not a good practice
