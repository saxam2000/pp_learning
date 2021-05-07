let puppeteer = require("puppeteer");
let { codes } = require("./code");
let { email, password } = require("./secrets");
let browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
})
let gtab;
let purl;
browserPromise
    .then(function(browser) {
        let newtabPromise = browser.newPage();
        return newtabPromise;
    })
    .then(function(npage) {
        gtab = npage;
        let gotoHackerRankLogInPromise = gtab.goto("https://www.hackerrank.com/auth/login");
        return gotoHackerRankLogInPromise;
    })
    .then(() => {
        let EmailWillTypedPromise = gtab.type('input[placeholder="Your username or email"]', email, { delay: 10 });
        EmailWillTypedPromise.then(() => {
            let passwordWillBeTypedPromise = gtab.type('input[placeholder="Your password"]', password, { delay: 10 });
            passwordWillBeTypedPromise.then(() => {
                let EnterWillBePressedPromise = gtab.keyboard.press("Enter")
                return EnterWillBePressedPromise;
            })
        })
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
        let url = gtab.url();
        purl = url;
        return url;
    }).then(function(url) {
        let quesobj = codes[0];
        console.log(url + "\n" + purl);
        let questionWillBeSolvedPromise = questionSolver(purl, quesobj.qname, quesobj.soln)
        return questionWillBeSolvedPromise;
    }).then(function(url) {
        let quesobj = codes[1];

        let questionWillBeSolvedPromise = questionSolver(purl, quesobj.qname, quesobj.soln)
        console.log(url);
        return questionWillBeSolvedPromise;
    }).then(function(url) {
        let quesobj = codes[2];

        let questionWillBeSolvedPromise = questionSolver(url, quesobj.qname, quesobj.soln)
        return questionWillBeSolvedPromise;
    }).then(function(url) {
        let quesobj = codes[3];

        let questionWillBeSolvedPromise = questionSolver(url, quesobj.qname, quesobj.soln)
        return questionWillBeSolvedPromise;
    })
    .then(function(url) {
        return gtab.goto(url);
    }).then(function() {
        resolve();
    })

function waitandclick(selector) {
    return new Promise(function(resolve, reject) {

        let waitforselector = gtab.waitForSelector(selector);
        waitforselector.then(function() {
            let elementclickedPromise = gtab.click(selector);
            elementclickedPromise.then(function() {
                resolve("clicked");
            })

        })
    })
}

function questionSolver(url, ques, code) {
    return new Promise(function(resolve, request) {
        let pageReachedPromise = gtab.goto(url);
        pageReachedPromise
            .then(function() {
                let queswillbeclickedpromise = gtab.evaluate(browserconsolefn, ques);
                return queswillbeclickedpromise;

                function browserconsolefn(ques) {
                    let h4Array = document.querySelectorAll("h4");
                    let quesname = []
                    for (let i = 0; i < h4Array.length; i++) {
                        quesname.push(h4Array[i].innerText.split("\n")[0]);
                    }
                    let idx = quesname.indexOf(ques);
                    console.log("hello")
                    console.log(idx);
                    h4Array[idx].click();
                }
            }).then(function() {
                //print ans to the editor
                //print ans to custom  input
                //select all from custom input
                //cut  all from custom input
                //click on editor window
                //select all in editor window
                //paste in editor window
                let customInputCheckboxPromise = waitandclick(".custom-input-checkbox");
                return customInputCheckboxPromise;
            })
            .then(function() {
                let printAnsToCustomEditorInput = gtab.type(".custominput", code);
                return printAnsToCustomEditorInput;
            })
            .then(function() {
                let ctrlPressAndHold = gtab.keyboard.down("Control");
                return ctrlPressAndHold;
            }).then(function() {
                let apressed = gtab.keyboard.press("a");
                return apressed;
            }).then(function() {
                let xpressed = gtab.keyboard.press("x");
                return xpressed;
            })
            .then(function() {
                let cursormovedtoide = gtab.click(".monaco-editor.no-user-select.vs");
                return cursormovedtoide;
            })
            .then(function() {
                let apressed = gtab.keyboard.press("a");
                return apressed;
            }).then(function() {
                let vpressed = gtab.keyboard.press("v");
                return vpressed;
            })
            .then(function() {
                let ctrlrelease = gtab.keyboard.up("Control");
                return ctrlrelease;
            }).
        then(function() {
            let submitWillBeClickedPromise = gtab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
            return submitWillBeClickedPromise;
        }).then(function() {
            resolve(url);
        })
    })
}