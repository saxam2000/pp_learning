let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");

let url = "https://github.com/topics";
request(url, cb);

function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        extractData(html);
    }
}

function extractData(html) {
    let seltool = cheerio.load(html);
    let topicslinkarr = [];
    // let topicsnamearr = [];
    let topicsname = seltool(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
    let topicsanchorarr = seltool(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < topicsanchorarr.length; i++) {
        // topiclink =
        topicslinkarr.push(seltool(topicsanchorarr[i]).attr("href"));
        topicname = seltool(topicsname[i]).text();
        topicsnamearr.push(topicname);
    }
    // for (let i = 0; i < topicsnamearr.length; i++) {
    //     topicname = seltool(topicsnamearr[i]).text();
    //     let topiclink = seltool("no-underline.d-flex.flex-column.flex-justify-center")
    // }
    printinfo(topicsnamearr, topicslinkarr, 0);

}

function printinfo(topicsnamearr, topicslinkarr, n) {
    if (n == topicslinkarr) {
        return;
    }
    request(topicslinkarr[n], cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            console.log(seltool(topicsnamearr[n]).text() + "---->");
            printrepo(html);
            printinfo(topicsnamearr, topicslinkarr, n + 1);
        }
    }
}

function printrepo(html) {
    let seltool = cheerio.load(html);
    let reposarr = seltool(".d-flex.flex-auto .text-bold");
    printreponame(reposarr, 0);
}

function printreponame(reposarr, i) {
    if (i == reposarr.length) {
        return;
    }
    console.log(reposarr[i].text());
    printreponame(repoarr, i + 1);
}