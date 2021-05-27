let colorbtn = document.querySelectorAll(".filter_colorbox");
let body = document.body;
let modal_container = document.querySelector(".modal_container");
let show = false;
let showhide = document.querySelector(".showHide");
let enterButton = document.querySelector(".enterButton");
let textArea = document.querySelector(".text_area");
let cColor = "color4";
let colors = ["color1", "color2", "color3", "color4"];
let info = document.querySelector(".info");
let task = "";
let taskArr = [];
let bothElementsArr = document.querySelectorAll(".icon-container");
let crossBtn = bothElementsArr[1];
let plusButton = bothElementsArr[0];
let deleteState = false;
let mainContainer = document.querySelector(".main_container");
let trashBtn = document.querySelector(".trash");
if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));
    // UI
    for (let i = 0; i < taskArr.length; i++) {
        let { id, color, task } = taskArr[i];
        createTask(color, task, false, id);
    }
}
updateInfo();

modal_container.addEventListener("click", function() {
    console.log("heel")
        // showhide.classList.remove("show");
        // showhide.classList.add("hide");
})
mainContainer.addEventListener("click", function() {
    mainContainer.style.opacity = "1";
    if (showhide.classList[1] == "show") {
        showhide.classList.remove("show");
        showhide.classList.add("hide");
    }


})

function updateInfo() {
    info.innerText = `you have ${taskArr.length} task left`;
}

trashBtn.addEventListener("click", function() {
    if (taskArr.length > 0) {
        if (confirm("Are you sure...?")) {
            taskArr = [];
            localStorage.setItem("allTask", JSON.stringify(taskArr));
            updateInfo();
            let allTickets = mainContainer.childNodes;
            for (let i = allTickets.length - 1; i > 0; i--) {
                allTickets[i].remove();
            }
        }
    }
})

// event listeners on filter button
//  tickets with that color will be visible
for (let i = 0; i < colorbtn.length; i++) {
    colorbtn[i].addEventListener("click", function() {
        let selectedColor = colorbtn[i].classList[0];
        console.log(selectedColor);
        let allTasks = mainContainer.querySelectorAll(".task_filter");
        // console.log(allTasks);
        for (let j = 0; j < allTasks.length; j++) {
            // if (allTasks[j].childNodes[0].classList.add("hide"));

            if (selectedColor == "white") {
                allTasks[j].parentNode.style.display = "block";

            } else if (allTasks[j].classList[1] != selectedColor) {
                // console.log(j);
                allTasks[j].parentNode.style.display = "none";
            } else {

                allTasks[j].parentNode.style.display = "block";
            }

        }
    })
}




// console.log(taskArr);

//  plus button listener
plusButton.addEventListener("click", openmodale);



function openmodale() {
    showhide.classList.remove("hide");
    showhide.classList.add("show");
    mainContainer.style.opacity = "0.3";

    let modal_color = document.querySelectorAll(".colour_select");
    //initial selected color
    modal_color[3].classList.add("selected_border");


    //Events management for color boxes in modale
    for (let i = 0; i < modal_color.length; i++) {
        modal_color[i].addEventListener("click", function() {
            modal_color.forEach((color) => {
                    //remove border from every colorbox
                    color.classList.remove("selected_border");
                })
                // add border to clicked color box
            modal_color[i].classList.add("selected_border");
            cColor = modal_color[i].classList[1];
            // console.log(cColor);
        });
    }
    //textArea selectn and event management
    textArea.addEventListener("keydown", (e) => {
        if (e.key == "Enter" && textArea.value != "") {
            task = textArea.value;
            textArea.value = "";
            console.log(task + "----" + cColor);
            showhide.classList.remove("show");
            showhide.classList.add("hide");
            mainContainer.style.opacity = "1";

            createTask(cColor, task, true);
        }
    })


}
enterButton.addEventListener("click", function() {
    if (textArea.val != "") {
        task = textArea.value;
        textArea.value = "";
        console.log(task + "----" + cColor);
        showhide.classList.remove("show");
        showhide.classList.add("hide");
        mainContainer.style.opacity = "1";

        createTask(cColor, task, true);
    }

})


function createTask(color, task, flag, id) {
    // color area click-> among colors
    let taskContainer = document.createElement("div");

    let uifn = new ShortUniqueId();
    let uid = id || uifn();
    taskContainer.setAttribute("class", "task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color}"></div>
    <div class="task_desc_container">
    <h3 class="uid">#${uid}</h3>
    <div class="task_desc" contenteditable="true" >${task}</div>
    </div>
    </div >`;
    mainContainer.appendChild(taskContainer);
    let taskFilter = taskContainer.querySelector(".task_filter");
    if (flag == true) {
        // console.log(uid);
        let obj = { "task": task, "id": `${uid}`, "color": color };
        taskArr.push(obj);
        let finalArr = JSON.stringify(taskArr);
        localStorage.setItem("allTask", finalArr);
    }
    taskFilter.addEventListener("click", changeColor);
    taskContainer.addEventListener("click", deleteTask);
    let taskDesc = taskContainer.querySelector(".task_desc");
    taskDesc.addEventListener("keypress", editTask);
    updateInfo();

}

function changeColor(e) {

    let taskFilter = e.currentTarget;
    let cColor = taskFilter.classList[1];
    let idx = colors.indexOf(cColor);
    let newColorIdx = (idx + 1) % 4;
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(colors[newColorIdx]);
    let uidElem = taskFilter.parentNode.querySelector(".uid");
    let uid = uidElem.innerText.split("#")[1];
    for (let i = 0; i < taskArr.length; i++) {
        let { id } = taskArr[i];
        console.log(id, uid);
        if (id == uid) {

            taskArr[i].color = colors[newColorIdx]
            let finalTaskArr = JSON.stringify(taskArr);
            localStorage.setItem("allTask", finalTaskArr);

            break;
        }
    }

}

//   delete button listener
crossBtn.addEventListener("click", setDeleteState);


// alter delete State

function setDeleteState(e) {
    let crossBtn = e.currentTarget;
    // console.log(crossBtn.parent)
    if (deleteState == false) {
        crossBtn.classList.add("active");
    } else {
        crossBtn.classList.remove("active");
    }
    deleteState = !deleteState;

}

function deleteTask(e) {
    let taskContainer = e.currentTarget;
    if (deleteState) {
        // local storage search -> remove
        let uidElem = taskContainer.querySelector(".uid");
        let uid = uidElem.innerText.split("#")[1];
        for (let i = 0; i < taskArr.length; i++) {
            let { id } = taskArr[i];
            console.log(id, uid);
            if (id == uid) {
                taskArr.splice(i, 1);
                let finalTaskArr = JSON.stringify(taskArr);
                localStorage.setItem("allTask", finalTaskArr);
                taskContainer.remove();
                break;
            }
        }
        updateInfo();
    }
}


// update task in local Storage ..... Local Storage
function editTask(e) {
    let taskDesc = e.currentTarget;
    let uidElem = taskDesc.parentNode.children[0];
    let uid = uidElem.innerText.split("#")[1];
    for (let i = 0; i < taskArr.length; i++) {
        let { id } = taskArr[i];
        console.log(id, uid);
        if (id == uid) {
            taskArr[i].task = taskDesc.innerText
            let finalTaskArr = JSON.stringify(taskArr);
            localStorage.setItem("allTask", finalTaskArr);

            break;
        }
    }
}