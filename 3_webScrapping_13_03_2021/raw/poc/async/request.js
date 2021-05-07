let request = require("request");
let cheerio = require("cheerio");
request("https://www.google.com", cb);
console.log("before");

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractData(html);
    }
}

function extractData(html) {
    let seltool = cheerio.load(html);
    let elem = seltool("#SIvCob");
    console.log(elem.text());

}
console.log("after");