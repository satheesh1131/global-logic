import { test, expect } from '@playwright/test';
import Common from '../utils/common';
import { CupCake } from '../testData/testData';

const common = new Common();

//Locators
const numberOfParagraphLoc = `//input[@name="numberOfParagraphs"]`;
const shortRadioButtonLoc = `//input[@value="short"]`;
const startWithCupcakeIpsum = `//input[@name="startsWithCupcakeIpsum"]`;
const generateButton = `//button[@id="generate_button"]`;
const copyToClipboardButton = `//button[@id="copy_button"]`;


test.describe("CupCake", async()=>{
    test(`Validate the cup cake ipsum page`, async ({ page }) => {
        
        await test.step(`Navigate to cup cake ipsum page`, async()=> {
            await common.navigateToPage(page, CupCake.url);
            await page.waitForLoadState("domcontentloaded");
            expect(page).toHaveTitle(CupCake.title);
            console.log("Navigation to cup cake ipsum page is successfull");
        })

        await test.step(`Validate number of paragraph is 5`, async()=> {
            let numberOfParagraph = await common.getValue(page, numberOfParagraphLoc);
            expect(numberOfParagraph).toBe(CupCake.paragraph);
            console.log("Number of paragraph (5) is successfully validated");
        })

        await test.step(`Select paragraph length as short`, async()=> {
            await common.clickOnElemet(page, shortRadioButtonLoc);
            console.log("Short radio button is selected successfully");
        })

        await test.step(`Select 'Start with "Cupcake ipsum dolor sit amet"'`, async()=> {
            await common.checkInputbox(page, startWithCupcakeIpsum);
            console.log(`'Start with "Cupcake ipsum dolor sit amet"' selected successfully`);
        })

        await test.step(`Validate copy to clipbutton is not present`, async()=> {
            expect(await page.locator(copyToClipboardButton)).not.toBeVisible();
            console.log("Validation of copy to clipboard button not present is successful");
        })

        await test.step(`Click generate and validate the copy to clipboard button`, async()=> {
            await common.clickOnElemet(page, generateButton);
            await page.waitForLoadState("domcontentloaded");
            await common.waitToBeVisible(page, copyToClipboardButton, 20000);
            console.log("Validation of generate and copy to clipboard button verification is successful");
        })
    });
})