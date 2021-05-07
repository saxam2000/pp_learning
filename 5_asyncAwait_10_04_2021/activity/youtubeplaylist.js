let puppeteer = require("puppeteer");
let fs = require("fs");
// no of videos done
// views done
// watch time -> get 
// list of videos -> in an excel
// initial page data get 
// handle -> loader

console.log("Before");
// let arr=document.querySelectorAll("#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer")
// let newarr=[]
// newarr.push(arr[0].innerText,arr[1].innerText)
(async function() {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let newPage = await browserInstance.newPage();
        await newPage.goto("https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph");
        await getList(newPage);


    } catch (err) {
        console.log(err);
    }

})();
async function getList(ntab) {
    let arr = await ntab.evaluate(consolefn);
    console.log(arr);
    console.log(arr[0]);
    let totalvideosinpage = arr[0].split(" ")[0];
    console.log(totalvideosinpage);
    let videocount = Number(totalvideosinpage);
    console.log("afjkla", videocount);

    let pCurrentVideoCount = await scrolltobottom(ntab, "#video-title");
    while (videocount - 50 > pCurrentVideoCount) {

        pCurrentVideoCount = await scrolltobottom(ntab, "#video-title");
    }
    let timeDurArr = await ntab.evaluate(getStats, ".style-scope ytd-thumbnail-overlay-time-status-renderer", "#video-title");
    console.table(timeDurArr);


    function consolefn() {
        let infoarr = document.querySelectorAll("#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer")
        let numberofvideos = infoarr[0].innerText;

        let totalviews = infoarr[1].innerText;
        let newArr = [];
        newArr.push(numberofvideos, totalviews)
        return newArr;
        // console.log(numberofvideos, totalviews);

    }
}
async function scrolltobottom(page, title) {
    function getlengthConsolefn(title) {
        window.scrollBy(0, window.innerHeight);
        let titleElemArr = document.querySelectorAll(title);
        console.log("titleLength", titleElemArr.length);
        if (titleElemArr.length == 899) {
            console.log(titleElemArr);
        }
        return titleElemArr.length;
    }
    return page.evaluate(getlengthConsolefn, title);
}

function getStats(durationSelect, title) {
    let dElemarr = document.querySelectorAll(durationSelect);
    let titleElemarr = document.querySelectorAll(title);
    let nameNdurArr = [];
    for (let i = 0; i < dElemarr.length; i++) {
        let duration = dElemarr[i].innerText;
        let title = titleElemarr[i].innerText;
        nameNdurArr.push({ duration, title });
    }
    return nameNdurArr;
}