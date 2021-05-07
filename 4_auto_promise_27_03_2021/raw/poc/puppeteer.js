let puppeteer = require("puppeteer");
let browserPromise = puppeteer.launch({ headless: false });
let gtab;
// browserPromise
//     .then(function(browser) {
//         let newTabPromise = browser.newPage();
//         newTabPromise.then(function(newTab) {
//             gtab = newTab;
//             let goToGooglePromise = newTab.goto("https://www.google.com");
//             goToGooglePromise.then(function() {
//                 let textwillBeTypedPromise = gtab.type("input[aria-label='Search']", "pepcoding", {
//                     delay: 100
//                 })
//                 textwillBeTypedPromise.then(function() {
//                     let enterWillBePressed = gtab.keyboard.press("Enter");
//                     enterWillBePressed.then(function() {
//                         console.log("Reached to pepcoding");
//                     })
//                 })
//             })
//         })
//     })

browserPromise
    .then(function(browser) {
        let newTabPromise = browser.newPage();
        return newTabPromise
    })
    .then(function(newTab) {
        gtab = newTab;
        let goToGooglePromise = newTab.goto("https://www.google.com");
        return goToGooglePromise
    })
    .then(function() {
        let textwillBeTypedPromise = gtab.type("input[aria-label='Search']", "pepcoding", {
            delay: 100
        })
        return textwillBeTypedPromise
    })
    .then(function() {
        let enterWillBePressed = gtab.keyboard.press("Enter");
        return enterWillBePressed
    })
    .then(function() {
        console.log("Reached to pepcoding");
    })