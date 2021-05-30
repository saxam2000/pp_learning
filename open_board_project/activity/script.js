let board = document.getElementById("board");

let eraser = document.querySelector(".eraser");
let red = document.querySelector(".red");
let green = document.querySelector(".green");
let blue = document.querySelector(".blue");
let size = document.querySelector(".size");
let sizeIcon = document.querySelector(".sizeicon");
let slider = document.getElementById("myRange");
let rangeSelectBox = document.querySelector(".rangeSelectBox");
let rangeSliderValue = document.querySelector(".rangeSliderValue");
let rangeVisible = false;
let hover = false;
let undoStack = [];
let redoStack = [];
toolfillcolor = "white"

let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
eraser.addEventListener("click", changeToolColor);
blue.addEventListener("click", changeToolColor);
red.addEventListener("click", changeToolColor);
green.addEventListener("click", changeToolColor);
let toolColor = "red";

rangeSliderValue.innerText = 50;

board.addEventListener("click", function() {
    let arr = (rangeSelectBox.classList[1]);
    console.log(arr);
    if (rangeSelectBox.classList[1] != "hide") {
        rangeSelectBox.classList.add("hide");
    }
})
slider.addEventListener("input", function(e) {

        // console.log(e);
        tool.lineWidth = (this.value / 100) * 15;
        rangeSliderValue.innerText = Number.parseInt(this.value);
    })
    // slider.oninput = function() {
    //     // output.innerHTML = this.value;
    // }


sizeIcon.addEventListener("click", function() {
    if (rangeVisible) {
        rangeSelectBox.classList.add("hide");
    } else {
        rangeSelectBox.classList.remove("hide");
    }

    rangeVisible = !rangeVisible;
    console.log("size click");
})

// size.onmouseover = function(e) {
//     // hover = true;
//     // if (isDraw) {
//     //     let x = e.clientX;
//     //     console.log(x);
//     //     let y = cordinateOfY(e.clientY);
//     //     tool.lineTo(x, y);
//     //     tool.stroke();

//     //     isDraw = false;
//     // }
// }
// size.onmouseout = function(e) {
//     hover = false;
//     // if (isDraw) {
//     //     let x = e.clientX;
//     //     let y = cordinateOfY(e.clientY);
//     //     tool.beginPath();
//     //     tool.moveTo(x, y);

//     // }
// }

function changeToolColor(e) {
    let colorBox = e.currentTarget;
    tool.strokeStyle = colorBox.classList[1];
    toolColor = colorBox.classList[1];
}


// height width
board.height = window.innerHeight;
board.width = window.innerWidth;

let tool = board.getContext("2d");
tool.lineCap = "round"
tool.lineWidth = 10;

tool.strokeStyle = "pattern";
let isDraw = false;
board.addEventListener("mousedown", function(e) {
    if (hover) {
        e.preventDefault();
        return;
    }
    let x = e.clientX;
    let y = cordinateOfY(e.clientY);
    tool.beginPath();
    tool.moveTo(x, y);
    isDraw = true;

})
board.addEventListener("mousemove", function(e) {
    if (hover) {
        e.preventDefault();
        return;
    }
    let x = e.clientX;
    let y = cordinateOfY(e.clientY);
    if (isDraw == true) {
        tool.lineTo(x, y);
        tool.stroke();
    }


});
board.addEventListener("mouseup", function(e) {
    if (hover) {
        e.preventDefault();
        return;
    }
    let x = e.clientX;
    let y = cordinateOfY(e.clientY);
    tool.lineTo(x, y);
    tool.stroke();
    isDraw = false;
    add();

})

function cordinateOfY(element) {

    let cobj = board.getBoundingClientRect()
        // console.log(cobj);
    return element - cobj.top;

}
let firstUndo = true;
let firstredo = true;

undo.addEventListener("click", function() {
    if (undoStack.length == 0) {
        tool.clearRect(0, 0, board.width, board.height);
        return;
    }
    if (firstUndo == true) {
        firstRedo = true;
        redoStack.push(undoStack.pop());
        firstUndo = false;
    }
    let tmpImg = new Image();
    tmpImg.src = undoStack.pop();
    console.log(tmpImg.src);
    redoStack.push(tmpImg.src);
    tool.fillStyle = "white";
    tool.clearRect(0, 0, board.width, board.height);

    tmpImg.onload = function() {
        tool.drawImage(tmpImg, 0, 0);
    };
    // tool.drawImage(tmpImg, 0, 0);
    console.log("undo click");

})

redo.addEventListener("click", function() {
    if (redoStack.length == 0) {
        return;
    }
    if (firstRedo == true) {
        firstUndo = true;
        undoStack.push(redoStack.pop());
        firstRedo = false;
    }
    let tmpImg = new Image();
    tmpImg.src = redoStack.pop();
    console.log(tmpImg.src);
    undoStack.push(tmpImg.src);
    tool.fillStyle = "white";
    tool.clearRect(0, 0, board.width, board.height);

    tmpImg.onload = function() {
        tool.drawImage(tmpImg, 0, 0);
    };
    console.log("redo click");

})

function add() {
    let imglink = board.toDataURL("image/png");
    undoStack.push(imglink);
    if (undoStack.length > 20) {
        undoStack.shift();
    }
    let img = document.createElement("img");
    img.setAttribute("src", imglink);
    document.body.appendChild(img);
    console.log(undoStack);

}