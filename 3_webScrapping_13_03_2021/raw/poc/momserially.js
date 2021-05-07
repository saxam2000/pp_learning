let request = require("request");
let cheerio = require("cheerio");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results", cb)

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractData(html);
    }
}

function extractData(html) {
    let seltool = cheerio.load(html);
    // let teams = seltool(".match-info.match-info-FIXTURES .teams .team .name-detail");
    // let cards = seltool(".match-score-block");
    let anchorarr = seltool("a[data-hover='Scorecard']")
    let linkarr = [];
    for (let i = 0; i < anchorarr.length; i++) {
        // let teams = seltool(cards[i]).find(".match-info.match-info-FIXTURES .teams .team .name-detail");


        // let team1 = seltool(teams[0]).text();
        // let team2 = seltool(teams[1]).text();
        // console.log("team1 ->" + team1 + "  team 2 -> " + team2);
        let scorecontentlink = seltool(anchorarr[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com/" + scorecontentlink;
        linkarr[i] = fullLink;
    }
    extractplayernameserially(linkarr, 0);
}

function extractplayernameserially(link, i) {
    if (i == link.length) {
        return;
    }
    request(link[i], cb)

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {

            printplayername(html);
            extractplayernameserially(link, i + 1);
        }
    }
}


function printplayername(html) {
    let scoreseltool = cheerio.load(html);
    let name = scoreseltool(".best-player-name");
    console.log("Man of the match ->" + name.text());
}