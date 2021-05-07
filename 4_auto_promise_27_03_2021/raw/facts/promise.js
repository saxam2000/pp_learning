// let prom = new Promise((resolve, reject) => {
//     resolve("yayy.....");
// })
// const handlepromise = (resolvedvalue) => {
//     console.log(resolvedvalue)
// }

// prom.then(handlepromise)
let fs = require("fs");

function promisifiedreadfile(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                reject(err);
            } else resolve(data);
        })
    })
}
console.log("before")
let frp = promisifiedreadfile("f1.txt");
frp
    .then(data => console.log(data))
    .catch(err => console.log(err));
// setTimeout(() => console.log(frp), 5000);
console.log("after")