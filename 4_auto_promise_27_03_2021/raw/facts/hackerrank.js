let puppeteer = require("puppeteer");
let { codes } = require("./code")
let browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
});
let gtab;
browserPromise.then(function(browser) {
        let newTabPromise = browser.newPage();
        return newTabPromise;
    }).then(function(newTab) {
        gtab = newTab;
        let gotohackerrankloginpromise = newTab.goto("https://www.hackerrank.com/auth/login");
        return gotohackerrankloginpromise
    }).then(function() {
        let emailIdTypedPromise = gtab.type('input[placeholder="Your username or email"]', "molaxi3342@whyflkj.com", { delay: 10 })
        return emailIdTypedPromise

    }).then(function() {
        let passwordinputPromise = gtab.type('input[placeholder="Your password"]', "Shaktimaan12345@", { delay: 10 })
        return passwordinputPromise;
    }).then(function() {
        let enterWillBePressed = gtab.keyboard.press("Enter");
        let getnextelementpromise = gtab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled", { visible: true });
        let p1 = Promise.all([enterWillBePressed, getnextelementpromise]);
        return enterWillBePressed;

    })
    .then(function() {
        let ipkitWillBeClicked = waitandclick(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
        return ipkitWillBeClicked;
    })
    .then(function() {
        let seechalangeWillBeClicked = waitandclick(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled");
        return seechalangeWillBeClicked;

    })
    .then(function() {
        return gtab.url();
    }).then(function(url) {
        console.log(url);
        let questionObj = codes[0];
        QuestionSolver(url, questionObj.soln, questionObj.qname);
    })

function waitandclick(selector) {
    return new Promise(function(resolve, reject) {
        let selectorWaitPromise = gtab.waitForSelector(selector, { visible: true });
        selectorWaitPromise.then(function() {
            let selectorClickPromise = gtab.click(selector);
            return selectorClickPromise
        }).then(function() {
            resolve();
        })

    })
}

function QuestionSolver(modulepageurl, code, questionName) {
    return new Promise((resolve, reject) => {
        //page visit
        let reachedPageUrlPromise = gtab.goto(modulepageurl);
        reachedPageUrlPromise
            .then(() => {

                function browserconsolefn(questionName) {
                    let allH4Elem = document.querySelectorAll("h4");
                    let textArr = [];
                    for (let i = 0; i < allH4Elem.length; i++) {
                        let myQuestion = allH4Elem[i].innerText.split("\n")[0];
                        textArr.push(myQuestion);
                    }
                    let idx = textArr.indexOf(questionName);
                    console.log(idx);
                    allH4Elem[idx].click();
                }
                let pageclickPromise = gtab.evaluate(browserconsolefn, questionName);
                return pageclickPromise;
            })
    })
}