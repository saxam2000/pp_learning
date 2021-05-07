let fs = require("fs");
console.log("before");
let token = fs.promises.readFile("f1.txt");
console.log(token);
token
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    })
console.log("after");