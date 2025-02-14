import { test, expect } from '@playwright/test';
import Common from '../utils/common';
import { MarkSheet } from '../testData/testData';

const common = new Common();

//Locators
const formLoc = `//div[@class="result"]//form`;
const titleText = `//form//label[text()="Title"]`;
const missRadioButton = `//input[@value="miss"]`;
const firstNameTextbox = `//form//label[text()="First name"]//following-sibling::input`;
const lastNameTextbox = `//form//label[text()="Last name"]//following-sibling::input`;
const emailTextbox = `//form//label[text()="Email"]//following-sibling::input`;
const phoneNumberTextbox = `//form//label[text()="Phone number"]//following-sibling::input`;
const passwordTextbox = `//form//label[text()="Password"]//following-sibling::input`;
const confirmPasswordTextbox = `//form//label[text()="Confirm your password"]//following-sibling::input`;
const countryDD = `//form//label[text()="Country"]//following-sibling::select`;
const agreeCheckbox = `//form//input[@type="checkbox"]`;
const signupButton = `//button[contains(text(),"Sign")]`;

test.describe("Marksheet", async()=>{
    test(`Validate the mark sheet page complete signup form`, async ({ page }) => {
        
        await test.step(`Navigate to mark sheet page`, async()=> {
            await common.navigateToPage(page, MarkSheet.url);
            await page.waitForLoadState("domcontentloaded");
            expect(await page.locator(formLoc)).toBeVisible();
            await common.waitToBeVisible(page, titleText, 20000);
            console.log("Navigation to mark sheet page is successfull");
        })

        await test.step(`Select miss radio button`, async()=> {
            await common.clickOnElemet(page, missRadioButton);
            console.log("Miss radio button is selected");
        })

        await test.step(`Fill first and last name`, async()=> {
            await common.inputText(page, firstNameTextbox, MarkSheet.firstName);
            await common.inputText(page, lastNameTextbox, MarkSheet.lastName);
            console.log("First and last name is filled successfully");
        })

        await test.step(`Fill email and phone number`, async()=> {
            await common.inputText(page, emailTextbox, MarkSheet.email);
            await common.inputText(page, phoneNumberTextbox, MarkSheet.phoneNumber);
            console.log("Email and phone number filled successfully");
        })

        await test.step(`Fill password and confirm password`, async()=> {
            await common.inputText(page, passwordTextbox, MarkSheet.password);
            await common.inputText(page, confirmPasswordTextbox, MarkSheet.confirmPassword);
            console.log("Password and confirm password filled successfully");
        })

        await test.step(`Select country dropdown and agree checkbox`, async()=> {
            await common.selectOption(page, countryDD, MarkSheet.country);
            await common.checkInputbox(page, agreeCheckbox);
            console.log("Country dropdown and agreement checkbox selected successfully");
        })

        await test.step(`Validate sign up lands on error page(403)`, async()=> {
            await common.clickOnElemet(page, signupButton);
            await page.waitForLoadState('networkidle');
            await page.route(MarkSheet.resultUrl, async (route)=> {
                const response = await route.continue();
                expect(await response.status()).toBe(403);
            })
            console.log("Validation of 403 response status is successful");
        })
    });
})