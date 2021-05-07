let puppeteer = require("puppeteer");
let fs = require("fs");
let links = ["https://www.amazon.in", "https://www.flipkart.com", "https://paytmmall.com"];
let pName = process.argv[2];

console.log("Before");
(async function() {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let amazonArr = await getListingFromAmazon(links[0], browserInstance, pName);
        console.log("Amazon");
        console.table(amazonArr);
        let fkarr = await getListingFromFk(links[1], browserInstance, pName);
        console.log("flipKart");
        console.table(fkarr);
        let pmarr = await getListingFromPm(links[2], browserInstance, pName);
        console.log("Paytm");
        console.table(pmarr);
    } catch (err) {
        console.log(err);
    }
})();

//  product Name,url of amazon home page
// output-> top 5 matching product -> price Name print 



async function getListingFromAmazon(link, browserInstance, pName) {
    let ntab = await browserInstance.newPage();
    await ntab.goto(link);
    await waitandclick("#twotabsearchtextbox", ntab);
    await ntab.type("#twotabsearchtextbox", pName);
    await ntab.keyboard.press("Enter");
    await ntab.waitForSelector(".a-price-whole", { visible: true })
        // .a-size-medium.a-color-base.a-text-normal
        //.a-price-whole
    function consolefn(nameselector, priceselector) {
        let priceArr = document.querySelectorAll(priceselector);
        let nameArr = document.querySelectorAll(nameselector);
        let details = [];
        for (let i = 0; i < 5; i++) {
            let price = priceArr[i].innerText;
            let name = nameArr[i].innerText;
            details.push({
                price,
                name
            })
        }
        return details;
    }
    console.log(pName);
    return ntab.evaluate(consolefn, ".a-size-medium.a-color-base.a-text-normal", ".a-price-whole");
}

async function getListingFromFk(link, browserInstance, pName) {
    let ntab = await browserInstance.newPage();
    await ntab.goto(link);
    await ntab.click("._2KpZ6l._2doB4z");
    await waitandclick("._3704LK", ntab);
    await ntab.type("._3704LK", pName);
    await ntab.keyboard.press("Enter");
    await ntab.waitForSelector("._30jeq3", { visible: true })
    await ntab.waitForSelector("._4rR01T", { visible: true })
        // .a-size-medium.a-color-base.a-text-normal
        //.a-price-whole
    function consolefn(nameselector, priceselector) {
        let priceArr = document.querySelectorAll(priceselector);
        let nameArr = document.querySelectorAll(nameselector);
        let details = [];
        for (let i = 0; i < 5; i++) {
            let price = priceArr[i].innerText;
            let name = nameArr[i].innerText;
            details.push({
                price,
                name
            })
        }
        return details;
    }
    console.log(pName);
    return ntab.evaluate(consolefn, "._4rR01T", "._30jeq3._1_WHN1");
}

async function getListingFromPm(link, browserInstance, pName) {
    let ntab = await browserInstance.newPage();
    await ntab.goto(link);
    await ntab.waitForTimeout(3000);
    await waitandclick("#searchInput", ntab);
    await waitandclick("input[placeholder='Search for a Product, Brand or Category']", ntab);
    await ntab.type("#searchInput", pName);
    await waitandclick("#searchInput", ntab);
    await waitandclick(".iconSearch._2Ysz", ntab);
    await ntab.keyboard.press("Enter");
    // await waitandclick(".iconSearch._2Ysz", ntab);
    await ntab.keyboard.press("Enter");
    await ntab.waitForSelector(".UGUy", { visible: true })

    function consolefn(nameselector, priceselector) {
        let priceArr = document.querySelectorAll(priceselector);
        let nameArr = document.querySelectorAll(nameselector);
        let details = [];
        let i = 0;
        while (i < 5) {
            if (priceArr[i] != undefined && nameArr[i] != undefined) {
                i++;
                let price = priceArr[i].innerText;
                let name = nameArr[i].innerText;
                details.push({
                    price,
                    name
                })
            }
        }
        return details;
    }
    console.log(pName);
    return ntab.evaluate(consolefn, ".UGUy", "._1kMS");


    console.log(pName);
}

async function waitandclick(selector, gtab) {
    await gtab.waitForSelector(selector);
    let elementclickedPromise = gtab.click(selector);
    return elementclickedPromise;

}