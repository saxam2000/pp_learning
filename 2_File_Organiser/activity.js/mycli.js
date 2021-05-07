let input = process.argv.slice(2);
let helpfileobj = require("./commands/help");
let viewfileobj = require("./commands/view");
let organizefileobj = require("./commands/organize");
// node mycli.js view<dirname> tree
// node mycli.js view<dirname> flat
// node mycli.js organize<dirname>
// node mycli.js help
let cmd = input[0];
switch (cmd) {
    case "view":
        viewfileobj.fn(input[1], input[2]);
        break;
    case "organize":
        organizefileobj.fn(input[1]);
        break;
    case "help":
        helpfileobj.fn();
        break;

    default:
        console.log("Ooops.....   wrong  command entered");
}