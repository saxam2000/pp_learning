let request = require("request");
let cheerio = require("cheerio");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard", cb);
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
    let bothbowlertable = seltool(".table.bowler");
    let hwicket = 0;
    let hwtname = "";
    for (let i = 0; i < bothbowlertable.length; i++) {
        let playerrow = seltool(bothbowlertable[i]).find("tbody tr");
        for (let j = 0; j < playerrow.length; j++) {
            playercol = seltool(playerrow[j]).find("td");
            let name = seltool(playercol[0]).text();
            let wicket = seltool(playercol[4]).text();
            if (wicket >= hwicket) {
                hwicket = wicket;
                hwtname = name;
            }
        }
        console.log("name", hwtname, "   wicket", hwicket);
        console.log("_____________________________________________________");
    }

}
console.log("after");