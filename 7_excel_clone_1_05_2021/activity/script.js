let addbuttonContainer = document.querySelector(".add_sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let arid = 0;
let acid = 0;
let selectedcell;
let sheetidx = 0;
let fontsizeselect = document.querySelector(".font-size");
let alignmentbtns = document.querySelectorAll(".alignment-container .align-btn")

let colourselect = document.querySelector("#color");
let bgcolourselect = document.querySelector("#bg-color");
let boldbtn = document.querySelector(".bold");
let italicbtn = document.querySelector(".italic");
let underlinebtn = document.querySelector(".underline");
let fontfamilyselect = document.querySelector(".font-family");
let sheetDB = workSheetDB[0];

////////////////////////// alignment buttons events//////////////////////////////////////////
for (let i = 0; i < alignmentbtns.length; i++) {
    alignmentbtns[i].addEventListener("click", function d() {
        // console.log("hello")
        for (let j = 0; j < alignmentbtns.length; j++) {
            alignmentbtns[j].classList.remove("active-btn");
        }
        alignmentbtns[i].classList.add("active-btn");
        console.log(alignmentbtns[i].classList[1]);
        let cellObject = sheetDB[arid][acid];
        cellObject.halign = alignmentbtns[i].classList[1];
        selectedcell.style.textAlign = alignmentbtns[i].classList[1];
    })
}

firstSheet.addEventListener("click", handleActiveSheet);

addbuttonContainer.addEventListener("click", function() {
    console.log("add button clicked");
    let sheetArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetArr[sheetArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = ` Sheet ${ idx + 1 }`;
    sheetList.appendChild(NewSheet);
    //remove active sheet class from all sheets
    sheetArr.forEach(function(sheet) {
        sheet.classList.remove("active-sheet");
    });

    //get latestAdded sheet
    let newSheetArr = document.querySelectorAll(".sheet");
    // add active sheet class to latest added sheet
    newSheetArr[newSheetArr.length - 1].classList.add("active-sheet");
    // initialise new sheetdb database
    initCurrentSheetDb();
    let newSheetIdx = idx + 1;
    sheetDB = workSheetDB[idx];

    // initialise new page with new values
    initUI();
    NewSheet.addEventListener("click", handleActiveSheet);
})


function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function(sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }
    let sheetIdx = MySheet.getAttribute("sheetIdx");
    sheetDB = workSheetDB[sheetIdx - 1];
    //set  UI from clicked sheet according to database
    setUI(sheetDB);
}

//............................select event for cells............................./////////////////////
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handleCell() {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        addressBar.setAttribute("rid", rid);
        addressBar.setAttribute("cid", cid);
        acid = cid;
        arid = rid;
        let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
        selectedcell = cell;

        //make changed in  top ui according to clicked cell
        let cellObject = sheetDB[rid][cid];
        if (cellObject.bold == true) {
            boldbtn.classList.add("active-btn");
        } else {
            boldbtn.classList.remove("active-btn");
        }
        if (cellObject.italic == true) {
            italicbtn.classList.add("active-btn");
        } else {
            italicbtn.classList.remove("active-btn");
        }
        if (cellObject.underline == true) {
            underlinebtn.classList.add("active-btn");
        } else {
            underlinebtn.classList.remove("active-btn");
        }

        for (let i = 0; i < alignmentbtns.length; i++) {
            alignmentbtns[i].classList.remove("active-btn");
        }
        if (cellObject.halign == "left") {
            alignmentbtns[0].classList.add("active-btn");
        } else if (cellObject.halign == "center") {
            alignmentbtns[1].classList.add("active-btn");
        } else if (cellObject.halign == "right") {
            alignmentbtns[2].classList.add("active-btn");
        }
        fontfamilyselect.value = cellObject.fontFamily;
        fontsizeselect.value = cellObject.fontSize;
        bgcolourselect.value = cellObject.bgColor;
        console.log(bgcolourselect.value);
        colourselect.value = cellObject.fontColor;


    });
}
Allcells[0].click();

//>>>>>>>>>>>>>>>>>>>>>font family drop down event management<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
fontfamilyselect.addEventListener("change", function() {
    console.log(fontfamilyselect.value);
    let cell = document.querySelector(`.col[rid ="${arid}"][cid = "${acid}"]`);
    console.log(cell.getAttribute("rid"));
    cell.style.fontFamily = fontfamilyselect.value;
    let cellObject = sheetDB[arid][acid];
    cellObject.fontFamily = fontfamilyselect.value;
    console.log("font-family changed");
})

//>>>>>>>>>>>>>>>>>>>>>font size drop down event management<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
fontsizeselect.addEventListener("change", function() {
    let cellObject = sheetDB[arid][acid];

    console.log(selectedcell.getAttribute("rid"));
    selectedcell.style.fontSize = fontsizeselect.value + "px";
    console.log("font-size changed");
    cellObject.fontSize = fontsizeselect.value;
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>colour container<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
colourselect.addEventListener("change", function() {
    selectedcell.style.color = colourselect.value;
    let cellObject = sheetDB[arid][acid];
    cellObject.fontColor = colourselect.value;

})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>background  colour container<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
bgcolourselect.addEventListener("change", function() {
    selectedcell.style.backgroundColor = bgcolourselect.value;
    let cellObject = sheetDB[arid][acid];
    cellObject.bgColor = bgcolourselect.value;

})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>bold button event<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
boldbtn.addEventListener("click", function() {
    let cellObject = sheetDB[arid][acid];
    if (selectedcell.style.fontWeight == "bold") {
        selectedcell.style.fontWeight = "normal";
        boldbtn.classList.remove("active-btn");
        cellObject.bold = false;

    } else {
        selectedcell.style.fontWeight = "bold";
        cellObject.bold = true;
        boldbtn.classList.add("active-btn");
    }

})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>italic button event<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
italicbtn.addEventListener("click", function() {
    let cellObject = sheetDB[arid][acid];
    if (selectedcell.style.fontStyle == "italic") {
        italicbtn.classList.remove("active-btn");
        cellObject.italic = false;
        selectedcell.style.fontStyle = "normal";

    } else {
        cellObject.italic = true;
        italicbtn.classList.add("active-btn");
        selectedcell.style.fontStyle = "italic";
    }
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>underline button event<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
underlinebtn.addEventListener("click", function() {
    let cellObject = sheetDB[arid][acid];
    if (selectedcell.style.textDecoration == "underline") {
        underlinebtn.classList.remove("active-btn");
        cellObject.underline = false;
        selectedcell.style.c = "none";

    } else {
        cellObject.underline = true;
        underlinebtn.classList.add("active-btn");
        selectedcell.style.textDecoration = "underline";
    }
})



function initUI() {
    for (let i = 0; i < Allcells.length; i++) {
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily = "Arial";
        Allcells[i].style.fontSize = "16px";
        Allcells[i].style.fontColor = "black";
        Allcells[i].style.color = "black";
        Allcells[i].style.backgroundColor = "#ffffff";
        Allcells[i].style.textAlign = "left";
        Allcells[i].innerText = "";
    }
    Allcells[0].click();

}



//add event on every cell so it can update value in its corresponding databasefor(let i = 0; i < Allcells.length; i++) {
for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("keypress", function handleCell(e) {
        let address = addressBar.value;
        // let { rid, cid } = getRIdCIdfromAddress(address);
        let cellObject = sheetDB[arid][acid];
        // let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        cellObject.value += e.key;
    });
}

function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, fontFamily, fontSize, halign, value, fontColor, bgColor } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.innerText = value;
            cell.style.fontStyle = italic;
            cell.style.textDecoration = underline;
            cell.style.fontSize = fontSize;
            cell.style.fontFamily = fontFamily;
            cell.style.textAlign = halign;
            cell.style.backgroundColor = bgColor;
            cell.style.fontColor = fontColor;

        }
    }
    Allcells[0].click();
}