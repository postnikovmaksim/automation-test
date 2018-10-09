const puppeteer = require('puppeteer');
const { assert } = require('chai');
const createUser = require('../services/userServices/createUser');
const cookieHelper = require('../helper/cookieHelper');
const goodService = require('../apiServices/stockServices/goodServices');
const contractServices = require('../apiServices/contractServices/contractServices');
const retailReportStep = require('../main/retailReport/formDocument/retailReportFormSteps');

describe('First Test', async () => {
    let browser;
    let page;
    let cookie;

    before(async () => {
        browser = await puppeteer.launch({
            headless: false,
            args: ["--ash-host-window-bounds=1920x1080", "--window-size=1920,1048", "--window-position=0,0"],
            defaultViewport: { width: 1920, height: 1080 }
        });
        page = await browser.newPage();
        await createUser.createUsn({ page });
        cookie = await cookieHelper.getCookie({ page });
    });

    it('test', async () => {
        const defaultGood = await goodService.createGood({ cookie });
        const defaultContract = await contractServices.createContract({ cookie });
        await retailReportStep.create({ page });

        const retailReport = await retailReportStep.getInfoFromTableByNumber({});
        assert.equal(retailReport, {}, 'Данные, по отчету о рознице, отличаются от ожидаемых')
    });


    it('test', async () => {
        const defaultGood = await goodService.createGood({ cookie });
        assert.typeOf(defaultGood, 'object', 'Товар по-умолчанию не создался');
    });

    it('test', async () => {
        const defaultContract = await contractServices.createContract({ cookie });
        assert.typeOf(defaultContract, 'object', 'Контракт по-умолчанию не создался');
    });

    it('createRetailStock', async () => {
        await page.goto('https://www.moedelo.org/Stock/');

        const stockDropdownSelector = 'input[value="Все склады"]';
        await page.waitForSelector(stockDropdownSelector);
        await page.click(stockDropdownSelector);

        const settingStockSelector = 'div[class*=settingButton]';
        await page.waitForSelector(settingStockSelector);
        await page.click(settingStockSelector);

        const addStockSelector = '[class*="bottomBlock"]~[class*="linkText"]';
        await page.waitForSelector(addStockSelector);
        await page.click(addStockSelector);

        const nameStockXpath = '((//div[contains(@class, "stockModal")]//div[contains(@class, "row")])[2]//input)[1]';
        await(await page.$x(nameStockXpath))[0].type('Розничный склад');

        const typeStockXpath = '((//div[contains(@class, "stockModal")]//div[contains(@class, "row")])[2]//input)[2]';
        const typeStockInput = (await page.$x(typeStockXpath))[0];
        await typeStockInput.click();

        const retailTypeStockXpath = '//*[contains(@class, "qa-listItem")]//*[contains(text(), "Розничный")]';
        const retailTypeStockInput = (await page.$x(retailTypeStockXpath))[0];
        await retailTypeStockInput.click();
    });

    after(async () => {
        return browser.close();
    });
});
