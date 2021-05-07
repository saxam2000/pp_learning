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
    let cards = seltool(".match-score-block");
    let anchorarr = seltool(".match-cta-container a[data-hover='Scorecard']")
    for (let i = 0; i < cards.length; i++) {
        let teams = seltool(cards[i]).find(".match-info.match-info-FIXTURES .teams .team .name-detail");


        let team1 = seltool(teams[0]).text();
        let team2 = seltool(teams[1]).text();
        console.log("team1 ->" + team1 + "  team 2 -> " + team2);
        let scorecontentlink = seltool(anchorarr[i]).attr("href");
        let fullLink = "https://www.espncricinfo.com/" + scorecontentlink;
        printmanofmatch(fullLink);
    }
}

function printmanofmatch(link) {
    request(link, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractscorecard(html);
        }
    }
}

function extractscorecard(html) {
    let scoreseltool = cheerio.load(html);
    let name = scoreseltool(".best-player-name");
    console.log("Man of the match ->" + name.text());
}