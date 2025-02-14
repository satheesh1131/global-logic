

class Common {

    /**
     * Function to click on given element
     * @param {Object} page 
     * @param {String} locator 
     * @param {String} errorMessage 
     */
    async clickOnElemet(page, locator, errorMessage){
        try{
            let element = await page.locator(locator).first();
            await element.click();
        }catch(e){
            let error = errorMessage ? errorMessage : String(e);
            console.error(error);
            throw e;
        }
    }

     /**
     * Function to check on given input checkbox element
     * @param {Object} page 
     * @param {String} locator 
     * @param {String} errorMessage 
     */
     async checkInputbox(page, locator, errorMessage){
        try{
            let element = await page.locator(locator).first();
            await element.check();
        }catch(e){
            let error = errorMessage ? errorMessage : String(e);
            console.error(error);
            throw e;
        }
    }

    /**
     * Function to fill given text in the given element
     * @param {Object} page 
     * @param {String} locator 
     * @param {String} value 
     * @param {String} errorMessage 
     */
    async inputText(page, locator, value, errorMessage){
        try{
            let element = await page.locator(locator).first();
            await element.fill(value);
        }catch(e){
            let error = errorMessage ? errorMessage : String(e);
            console.error(error);
            throw e;
        }
    }

    /**
     * Function to select given option
     * @param {Object} page 
     * @param {String} locator 
     * @param {String} value 
     * @param {String} errorMessage 
     */
    async selectOption(page, locator, value, errorMessage) {
        try{
            let element = await page.locator(locator).first();
            await element.selectOption(value);
        }catch(e){
            let error = errorMessage ? errorMessage : String(e);
            console.error(error);
            throw e;
        }
    }

    /**
     * Function to navigate to given url
     * @param {Object} page 
     * @param {String} url 
     * @param {String} errorMessage 
     */
    async navigateToPage(page, url, errorMessage) {
        try{
            await page.goto(url);
        }catch(e){
            let error = errorMessage ? errorMessage : String(e);
            console.error(error);
            throw e;
        }
    }

    /**
     * Function to wait for given element to be visible for given timeout
     * @param {Object} page 
     * @param {String} locator 
     * @param {Number} timeout 
     * @param {String} errorMessage 
     */
    async waitToBeVisible(page, locator, timeout, errorMessage){
        try{
            await page.waitForSelector(locator, {state: 'visible', timeout});
        }catch(e){
            let error = errorMessage ? errorMessage : String(e);
            console.error(error);
            throw e;
        } 
    }

    /**
     * Function to get the text of the given element
     * @param {Object} page 
     * @param {String} locator 
     * @param {String} errorMessage 
     */
    async getText(page, locator, errorMessage){
        try{
            let element = await page.locator(locator).first();
            return element.textContent();
        }catch(e){
            let error = errorMessage ? errorMessage : String(e);
            console.error(error);
            throw e;
        } 
    }

    /**
     * Function to get the value of the given element
     * @param {Object} page 
     * @param {String} locator 
     * @param {String} errorMessage 
     */
    async getValue(page, locator, errorMessage){
        try{
            let element = await page.locator(locator).first();
            return element.getAttribute('value');
        }catch(e){
            let error = errorMessage ? errorMessage : String(e);
            console.error(error);
            throw e;
        } 
    }
}

module.exports = Common;