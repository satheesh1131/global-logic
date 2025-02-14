import { test, expect } from '@playwright/test';
import Common from '../utils/common';
import { OpenSourceDemo } from '../testData/testData';

const common = new Common();

//Locators
const userNameTextbox = `//input[@name="username"]`;
const passwordTextbox = `//input[@name="password"]`;
const loginButton = `//button[contains(@class,"login-button")]`;
const dashboardTitle = `//h6[text()="Dashboard"]`;
const adminButton = `//span[text()="Admin"]`;
const recordRows = `//div[@class="oxd-table-row oxd-table-row--with-border"]`;
const resultRecordFoundLoc = `//div[@class="orangehrm-horizontal-padding orangehrm-vertical-padding"]//span[@class="oxd-text oxd-text--span"]`;
const profileLoc = `//p[@class="oxd-userdropdown-name"]`;
const aboutLink = `//a[text()="About"]`;
const supportLink = `//a[text()="Support"]`;
const changePasswordLink = `//a[text()="Change Password"]`;
const logoutLink = `//a[text()="Logout"]`;
const loginFormLoc = `//div[@class="orangehrm-login-form"]`;


test.describe("OpenSource-Demo", async()=>{
    test(`Validate the Open source demo page`, async ({ page }) => {
        
        await test.step(`Navigate to open source demo page`, async()=> {
            await common.navigateToPage(page, OpenSourceDemo.url);
            await page.waitForLoadState("domcontentloaded");
            console.log("Navigation to open source demo page is successfull");
        })

        await test.step(`Login using given username and password and validate landing page is dashboard`, async()=> {
            await common.inputText(page, userNameTextbox, OpenSourceDemo.username);
            await common.inputText(page, passwordTextbox, OpenSourceDemo.password);
            await common.clickOnElemet(page, loginButton);
            await common.waitToBeVisible(page, dashboardTitle, 20000);
            console.log("Login successful");
        })

        await test.step(`Validate records are loaded and print the results in admin tab`, async()=> {
            await common.clickOnElemet(page, adminButton);
            await common.waitToBeVisible(page, recordRows, 20000);
            let resultText = await common.getText(page, resultRecordFoundLoc);
            console.log(`Number of record found: ${resultText}`);
        })

        await test.step(`Validate about, support, change password and logout option under profile menu`, async()=> {
            await common.clickOnElemet(page, profileLoc);
            await common.waitToBeVisible(page, aboutLink, 5000);
            await common.waitToBeVisible(page, supportLink, 5000);
            await common.waitToBeVisible(page, changePasswordLink, 5000);
            await common.waitToBeVisible(page, logoutLink, 5000);
            console.log("Profile menu validated successfully");
        })

        await test.step(`Logout and validate the login page redirection`, async()=> {
            await common.clickOnElemet(page, logoutLink);
            await page.waitForLoadState("domcontentloaded");
            await common.waitToBeVisible(page, loginFormLoc, 20000);
            console.log("Validation of logout and login form is successful");
        })
    });
})