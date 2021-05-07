let request = require("request");
let cheerio = require("cheerio");
request("https://www.amazon.in/Samsung-Galaxy-Electric-Blue-128GB-Storage/dp/B085J1J32G/ref=sr_1_1_sspa?dchild=1&keywords=mobile&qid=1615735716&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFaNjcwOUdJOUgyR1AmZW5jcnlwdGVkSWQ9QTA1ODM4MzdHTFpLNVI1QVlUVkEmZW5jcnlwdGVkQWRJZD1BMDAxOTA1MDE3TTU2WUc1T0U1NDgmd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl", cb);
// request("https:/ / www.amazon.in / New - Apple - iPhone - Mini - 128 GB / dp / B08L5VN68Y / ref = sr_1_2_sspa ? dchild = 1 & keywords = mobile & qid = 1615735716 & sr = 8 - 2 - spons & psc = 1 & spLa = ZW5jcnlwdGVkUXVhbGlmaWVyPUFaNjcwOUdJOUgyR1AmZW5jcnlwdGVkSWQ9QTA1ODM4MzdHTFpLNVI1QVlUVkEmZW5jcnlwdGVkQWRJZD1BMDM3MjI3MjNFVVpYTkY5S0I0WEUmd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl ", cb);
// request("https://www.amazon.in/Redmi-Prime-Storage-Display-Camera/dp/B08696XM8J/ref=sr_1_3?dchild=1&keywords=mobile&qid=1615735716&sr=8-3", cb)

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractData(html);
    }
}

function extractData(html) {
    let seltool = cheerio.load(html);
    let nameElem = seltool(".a-size-large.a-spacing-none");
    let name = nameElem.text().trim();
    let priceElem = seltool("#priceblock_ourprice");
    let price = priceElem.text();
    console.log(name, "is having best price", price);
    // console.log(price);
}