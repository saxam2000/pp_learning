let colorbtn = document.querySelectorAll(".filter_colorbox");
let body = document.body;
let cColor = "color4";
let task = "";
let taskArr = [];
let bothElementsArr = document.querySelectorAll(".icon-container");
let crossBtn = bothElementsArr[1];
let plusButton = bothElementsArr[0];
let deleteState = false;
let mainContainer = document.querySelector(".main_container")
if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));
    // UI
    for (let i = 0; i < taskArr.length; i++) {
        let { id, color, task } = taskArr[i];
        createTask(color, task, false, id);
    }
}
plusButton.addEventListener("click", openmodale);
crossBtn.addEventListener("click", setDeleteState)

function openmodale() {
    let modal_container = document.createElement("div");
    modal_container.setAttribute("class", "modal_container");

    let modalcontainercode = ` 
    <div class="task_message_panel">
        <textarea name="textarea" class=text_area id="" cols="30" rows="10" placeholder="Enter your task here"></textarea>
        <!-- <input type="text" name="text" placeholder="Enter your task here" class="text_area"> -->
    </div>
    <div class="colour_select_panel">
        <div class="colour_option">
            <div class="colour_select color1"></div>
        </div>
        <div class="colour_option">
            <div class="colour_select color2"></div>
        </div>
        <div class="colour_option">
            <div class="colour_select color3"></div>
        </div>
        <div class="colour_option">
            <div class="colour_select color4"></div>
        </div>
    
    </div>`;
    modal_container.innerHTML = modalcontainercode;
    body.appendChild(modal_container);
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
    let textArea = document.querySelector(".text_area");
    textArea.addEventListener("keydown", (e) => {
        if (e.key == "Enter" && textArea.value != "") {
            task = textArea.value;
            textArea.value = "";
            console.log(task + "----" + cColor);
            modal_container.remove();
            createTask(cColor, task, true);
        }
    })


}

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

}

function changeColor(e) {

    let colors = ["color1", "color2", "color3", "color4"];
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
    }
}

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