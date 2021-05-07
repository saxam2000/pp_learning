let path = require("path");
let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
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

    let anchors = seltool(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < anchors.length; i++) {
        let link = seltool(anchors[i]).attr("href");
        let fullLink = "https://github.com" + link;

        extractrepodata(fullLink);
    }

    function extractrepodata(fullLink) {
        request(fullLink, cb)

        function cb(err, response, html) {
            if (err) {
                console.log(err);
            } else {
                getrepolinks(html);
            }
        }
    }

    function getrepolinks(html) {
        let seltool = cheerio.load(html);
        let topicNameElem = seltool(".h1-mktg");
        let repolinks = seltool("a.text-bold");
        let topicname = topicNameElem.text().trim();
        console.log(topicname);
        dirCreator(topicname);
        for (let i = 0; i < 7; i++) {
            let repoPageLink = seltool(repolinks[i]).attr("href");
            console.log(repoPageLink);
            let filename = repoPageLink.split("/").pop();
            filecreator(topicname, filename);
            let fullLinkIssue = "https://github.com" + repoPageLink + "/issues";
            getissueslink(fullLinkIssue, topicname, filename);

        }
        console.log("~~~~~~~~~~~~~~~~~~~~~");
    }
}

function getissueslink(fullLink, topicname, filename) {
    console.log(fullLink);
    request(fullLink, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractIssues(html, topicname, filename);
        }
    }
}

function extractIssues(html, topicname, filename) {
    let arr = [];
    let seltool = cheerio.load(html);
    let anchorarr = seltool('a[data-hovercard-type="issue"]');
    for (let i = 0; i < anchorarr.length; i++) {
        let name = seltool(anchorarr[i]).text()
        let link = "https://github.com" + seltool(anchorarr[i]).attr("href");
        console.log(link);
        arr.push({
            Name: name,
            Link: link
        })
    }
    let filepath = path.join(__dirname, topicname, filename + ".json")
    fs.writeFileSync(filepath, JSON.stringify(arr));
    console.table(arr);

}

function dirCreator(topicname) {
    let folderpath = path.join(__dirname, topicname);
    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);
    }
}

function filecreator(topicname, filename) {
    let filepath = path.join(__dirname, topicname, filename + ".json");
    if (!fs.existsSync(filepath)) {
        fs.openSync(filepath, "w");
    }
}