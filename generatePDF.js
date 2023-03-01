import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log('>>>>>>>>> page', page);
  
  await page.goto('http://localhost:1234/');
  await page.emulateMediaType('screen');
  await page.pdf({
    path: './react.pdf', // path (relative to CWD) to save the PDF to.
    printBackground: true,// print background colors
    width: '612px', // match the css width and height we set for our PDF
    height: '792px',
  });
  await browser.close();
})()