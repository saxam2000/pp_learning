let request = require("request");
let cheerio = require("cheerio");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary", cb);
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
    let commentryArr = seltool(".col-14.col-md-15.col-lg-14  .match-comment-wrapper .match-comment-long-text");
    console.log(commentryArr.length);
    let lbc = seltool(commentryArr[0]).text();
    console.log(lbc);

}
console.log("after");