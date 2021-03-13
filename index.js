const puppeteer = require('puppeteer');
var player = require('play-sound')(opts = {})

async function checkStock () {
  const date = new Date();
  const fullDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${date.getHours()}:${date.getMinutes()}`;

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  page.setViewport({
    width: 1440,
    height: 768
  });

  await page.goto("https://www.walmart.ca/en/ip/playstation5-digital-edition/6000202198823");
  const name = await page.$eval('[data-automation="cta-button"]', el => el.innerText)

  if (name !== 'Out of stock') {
    console.log("In stock! Run run! \n\nhttps://www.walmart.ca/en/ip/playstation5-digital-edition/6000202198823");

    player.play('./alarm.mp3', function (err) {
      if (err) throw err;
    });
  } else {
    console.log(`${fullDate} - ${name}`);
    await browser.close();
    setTimeout(checkStock, 60000);
  }
}

checkStock();
