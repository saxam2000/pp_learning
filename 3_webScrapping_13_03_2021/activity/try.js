let request = require("request");
let cheerio = require("cheerio");
let url = "https://github.com/topics";
let fs = require("fs");
let path = require("path");

function dircreator(reponame) {
    let folderpath = path.join(__dirname, reponame);
    if (!fs.existsSync(folderpath)) {
        fs.mkdirSync(folderpath);
    }
}

function filecreator(topicname, name) {
    let filepath = path.join(__dirname, topicname, name + ".json");
    if (!fs.existsSync(filepath)) {
        fs.openSync(filepath, "w");
    }
}
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
    //repostories link array....................................
    let anchors = seltool(".no-underline.d-flex.flex-column.flex-justify-center")
    for (let i = 0; i < anchors.length; i++) {
        let topiclink = seltool(anchors[i]).attr("href");
        let fulltopiclink = "https://github.com/" + topiclink;
        //link of the repositories
        // console.log(fullrepolink)
        let topicname = topiclink.split("/").pop();
        // console.log(topicname);
        extracttopicpage(fulltopiclink, topicname); //will get topic pages
    }
}

function extracttopicpage(topiclink, topicname) {
    request(topiclink, cb)

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractrepos(html, topicname);

        }
    }
}

function extractrepos(html, topicname) {
    let seltool = cheerio.load(html);
    //create directory
    dircreator(topicname);
    console.log(topicname + "          ttttttttttttttttttttttttttttttttt")
    let reposnames = seltool("a.text-bold"); //array of repositories of particular topic
    for (let i = 0; i < 6; i++) {
        let reponame = seltool(reposnames[i]).text().trim(); //repo name....
        let repolink = seltool(reposnames[i]).attr("href"); // everyy repository link

        console.log(reponame);
        // create file
        filecreator(topicname, reponame);
        issuespagelink = "https://github.com/" + repolink + "/issues"; //issues page link
        extractissues(issuespagelink, topicname, reponame);
    }
    console.log("~~~~~~~~~~~~~~~~~");

    function extractissues(link, topicname, filename) {
        request(link, cb)

        function cb(err, response, html) {
            if (err) {
                console.log(err);
            } else {
                putissues(html, topicname, filename);
            }
        }
    }

    function putissues(html, topicname, filename) {
        let arr = [];
        let seltool = cheerio.load(html);
        let anchorarr = seltool('a[data-hovercard-type="issue"]');
        for (let i = 0; i < anchorarr.length; i++) {
            let name = seltool(anchorarr[i]).text()
            let link = "https://github.com" + seltool(anchorarr[i]).attr("href");
            arr.push({
                name: name,
                link: link
            })
        }
        // console.table(arr);
        let filepath = path.join(__dirname, topicname, filename + ".json");
        fs.writeFileSync(filepath, JSON.stringify(arr));
    }
    // issuesarray.length
    // for (let i = 0; i < 2; i++) {
    //     let issue = seltool(issuesarray[i]);
    //     let issuename = issue.text();
    //     console.log(issuename + "iiiiiiiiiiiiiiii");
    //     let issuelink = issue.attr("href");
    //     let issuefullLink = "https://github.com" + issuelink;
    //     // console.log(issuefullLink);
    // }

}