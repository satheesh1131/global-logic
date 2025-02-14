import { test, expect } from '@playwright/test';
import Common from '../utils/common';
import { BoardGameGeek } from '../testData/testData';

const common = new Common();

//Locators
const titleTextbox = `//input[@id="advsearch-title"]`;
const minYearTextbox = `//input[@id="advsearch-yearpublished-min"]`;
const maxYearTextbox = `//input[@id="advsearch-yearpublished-max"]`;
const minPlayTimeDD = `//select[@id="advsearch-min-playing-time"]`;
const maxPlayTimeDD = `//select[@id="advsearch-max-playing-time"]`;
const submitBtn = `//input[@value="Submit"]`;
const link = `//div[@id="results_objectname1"]//a`;


test.describe("BoardGameGeek", async()=>{
    test(`Validate the link printed for 'Harry Potter and the Sorcerer's Stone Trivia Game'`, async ({ page }) => {
        
        await test.step(`Navigate to board game geek website`, async()=> {
            await common.navigateToPage(page, BoardGameGeek.url);
            await page.waitForLoadState("domcontentloaded");
            console.log("Navigation to page is successfull");
        })

        await test.step(`Search for the 'Harry Potter and the Sorcerer's Stone Trivia Game'`, async()=> {
            await common.waitToBeVisible(page, titleTextbox, 20000);
            await common.inputText(page, titleTextbox, BoardGameGeek.game);
            console.log("Title text is filled successfully");
        })

        await test.step(`Fill max and min year published`, async()=> {
            await common.inputText(page, minYearTextbox, BoardGameGeek.minYear);
            await common.inputText(page, maxYearTextbox, BoardGameGeek.maxYear);
            console.log("Min and Max year is filled successfully");
        })

        await test.step(`Select max and min playtime`, async()=> {
            await common.selectOption(page, minPlayTimeDD, BoardGameGeek.minPlayTime);
            await common.selectOption(page, maxPlayTimeDD, BoardGameGeek.maxPlayTime);
            console.log("Min and Max play time is selected successfully");
        })

        await test.step(`Submit and validate the game link`, async()=> {
            await common.clickOnElemet(page, submitBtn);
            console.log("Submit button clicked successfully");
            await common.waitToBeVisible(page, link, 20000);
            let linkText = await common.getText(page, link);
            console.log(`Retrieved Link Text: ${linkText}`);
        })
    });
})


