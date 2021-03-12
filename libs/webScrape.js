const CONFIG = require('../config')
let axios = require("axios");
let cheerio = require("cheerio");
const NanoLeaf = require("./nanoLeaf");
let nanoLeaf = new NanoLeaf();
let lastValue;

function scrapeCrypto() {
    try {
      axios
        .get(CONFIG.stockUrl, {
          headers: {
            "Cache-Control": "no-cache",
          },
        })
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          const priceElement = $(".QzVHcLdwl2CEuEMpTUFaj");
          let price = priceElement.text();
          let index = price.indexOf("$");
          let stockName = $(".css-10dsbjj").first().text();
          price = price.substr(index + 1);
          price = parseFloat(price);
          console.log(price);
          if (price >= lastValue) {
            nanoLeaf.changeLight("Green");
            console.log(stockName + " Going To The Moon!");
            lastValue = price;
          } else {
            nanoLeaf.changeLight("Red");
            console.log(stockName + " Sad Stonk");
            lastValue = price;
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

function start() {
    setInterval(scrapeCrypto, CONFIG.timer);
}

module.exports = start
