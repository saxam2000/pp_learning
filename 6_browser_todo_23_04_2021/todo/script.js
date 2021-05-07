let input = document.querySelector(".input_box"); //input box is pointed in input
let ul = document.querySelector(".task_list");
input.addEventListener("keydown", function(e) {
        if (e.key == "Enter") {
            let list = document.createElement("li");
            list.setAttribute("class", "task");
            let task = input.value;
            list.innerText = task;
            list.addEventListener("dblclick", function(e) {
                console.log("e ->", e);
                list.remove();
            })
            ul.appendChild(list);
            input.value = "";


        }







    })
    // list.setAttribute("class", "task");
    // ul.appendChild(list);
    // input.value = "";

// if (e.key == "Enter") {
//     let task = input.value;
//     console.log(task);
//     let list = document.createElement("li");
//     list.innerText = task;
//     list.addEventListener("dblclick", function(e) {
//         console.log("e ->", e);
//         list.remove();
// }