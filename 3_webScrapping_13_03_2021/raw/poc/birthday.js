let request = require("request");
let cheerio = require("cheerio");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard", cb);
// console.log("before");

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
    let bothbatsmantable = seltool(".Collapsible__contentOuter .Collapsible__contentInner .table.batsman")
        // console.log("total =", bothbatsmantable.length);
    for (let i = 0; i < bothbatsmantable.length; i++) {
        let batsmanelem = seltool(bothbatsmantable[i]).find("tbody tr .batsman-cell.text-truncate.out");
        for (let j = 0; j < batsmanelem.length; j++) {
            let link = seltool(batsmanelem[j]).find("a").attr("href");
            let name = seltool(batsmanelem[j]).text();
            printbirthday(link, name);
        }
        console.log("_____________________________________________________");
    }

}

function printbirthday(link, name) {
    request(link, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractbirthday(html, name);
        }
    }
}

function extractbirthday(html, name) {
    let seltool = cheerio.load(html);
    let birthdayelem = seltool(".ciPlayerinformationtxt span");
    let birthday = seltool(birthdayelem[1]).text();
    console.log(name + "was born on", birthday);
}
// console.log("after");