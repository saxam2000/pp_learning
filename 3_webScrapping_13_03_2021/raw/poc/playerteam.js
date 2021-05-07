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
    let teamname = seltool(".row.no-gutters.align-items-center .header-title.label ");
    let bothbatsmantable = seltool(".Collapsible__contentOuter .Collapsible__contentInner .table.batsman")
        // console.log("total =", bothbatsmantable.length);
    for (let i = 0; i < bothbatsmantable.length; i++) {
        let playerrow = seltool(bothbatsmantable[i]).find("tbody tr");
        for (let j = 0; j < playerrow.length; j = j + 2) {
            playercol = seltool(playerrow[j]).find("td");
            let name = seltool(playercol[0]).text();
            let team = seltool(teamname[i]).text();
            let t = team.split("INNINGS");

            console.log(`${name} belongs to ${t[0]}`);
        }
        console.log("_____________________________________________________");
    }

}
// console.log("after");