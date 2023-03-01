import puppeteer from 'puppeteer';
import { getDownloadsDir } from './util.js';

const downloadsDirectory = getDownloadsDir();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:1234/');
  await page.emulateMediaType('screen');
  await page.pdf({
    path: `${downloadsDirectory}/react.pdf`, // path (relative to CWD) to save the PDF to.
    printBackground: true,// print background colors
    // match width and height of a normal A4 page
    width: '1500px',
    height: '1750px',
    margin: {
      top: '75px',
      right: '75px',
      bottom: '75px',
      left: '75px'
    }
  });
  await browser.close();
})()