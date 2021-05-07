// let path = require("path");
// let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
let url = "https://github.com/topics";
// let html = request(url)
request(url, cb)

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractdata(html)
    }
}

function extractdata(html) {
    let seltool = cheerio.load(html);
    let namearray = seltool(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
    // let topic = seltool(".h0-mktg");
    // console.log(topic.text());

    for (let i = 0; i < namearray.length; i++) {

        // console.log(namearray[i].text());
        let name = seltool(namearray[i]); // ab yeh name ke andar aa gya /....... ab name liye text() function chl jayega
        console.log(name.text()); //aa gya yeh smjh?

    }
}