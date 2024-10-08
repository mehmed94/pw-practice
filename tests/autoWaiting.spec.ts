import { expect, test } from "@playwright/test";

test.beforeEach(async({page}, testInfo)=> {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)//override
})
test('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    //await successButton.click()
    // all text content does not wait

    // const text = await successButton.textContent()
    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    // wait for element
    //await page.waitForSelector('.bg-success')

    //wait for particular information
    // await page.waitForResponse('http://www.uitestingplayground.com/ajaxdata')

    // wait for network calls to be completed - not recommended
    await page.waitForLoadState('networkidle')

    //await page.waitForTimeout(10000) //manual wait

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
    
})

test('timeouts', async({page}) => {
    //test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()


})