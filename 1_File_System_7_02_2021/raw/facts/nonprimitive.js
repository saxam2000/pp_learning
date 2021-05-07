let arr;
arr = [1, 1.1, "string", true, null, [1, 2, 3, 4, 3], function sayhi() {
    console.log("this is under say hi")
    return "sayhifinction "
}]
arr.pop();
arr.push("last element")
arr.shift()
arr.unshift("first element")
for (let i = 0; i < arr.length; i++) {
    console.log("In position", i, arr[i]);
}
console.log("after execution of program");