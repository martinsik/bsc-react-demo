import puppeteer, { Browser, Page } from 'puppeteer';

const defaultMessages = require('../locale/en.json');

const URL = `http://localhost:${process.env.PORT}`;

describe('App E2E', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--disable-dev-shm-usage'],
    });
    page = await browser.newPage();
  });

  afterAll(() => browser.close());

  it('should render the app', async () => {
    await page.goto(URL, { waitUntil: 'networkidle0' });

    const title = await page.evaluate(() => document.getElementsByTagName('h1').item(0).textContent);

    expect(title).toEqual(defaultMessages['notes.list.title']);

    const rowsCount = await page.evaluate(() => document.querySelectorAll('table tbody tr').length);

    expect(rowsCount).toEqual(2);
  });
});
