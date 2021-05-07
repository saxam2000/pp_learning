let fs = require("fs");

function viewfun(path, mode) {
    if (mode == "flat") {
        viewFlat(path);
    } else if (mode == "tree") {
        viewtree(path, "");
    } else {
        console.log("wrong mode entered.......");
    }
}
module.exports = {
    fn: viewfun
}


function isfileornot(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}

function getcontent(dirpath) {
    return fs.readdirSync(dirpath);
}

function viewFlat(dirpath) {
    let isfile = isfileornot(dirpath);
    if (isfile == true) {
        console.log(dirpath + "*");
    } else {
        console.log(dirpath);
        let content = getcontent(dirpath); //this will return an array containing all  content inside  of currrent dirpath
        for (let i = 0; i < content.length; i++) {
            let childpath = dirpath + "\\" + content[i];
            viewFlat(childpath);
        }
    }
}


function viewtree(dirpath, indentation) {
    let isfile = isfileornot(dirpath);
    if (isfile == true) {
        let starr = dirpath.split("\\");
        let toprint = starr.pop();
        console.log(indentation, toprint + "*");
    } else {
        let starr = dirpath.split("\\");
        let toprint = starr.pop();
        console.log(indentation, toprint);
        let content = getcontent(dirpath);
        for (let i = 0; i < content.length; i++) {
            let childpath = dirpath + "\\" + content[i];
            viewtree(childpath, indentation + "-\t");
        }
    }

}