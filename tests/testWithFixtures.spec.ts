import { test } from "./test-options"
import { PageManager } from "../page-objects/pageManager"
import {faker} from "@faker-js/faker"

// test.beforeEach(async ({ page }) => {
//     await page.goto("/")
// })
test('parameterised methods', async ({ pageManager }) => {

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    //await pm.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
})