let fs = require('fs');
let path = require("path");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organisefun(dir) {
    let toOrganizeDirPath = dir;
    let organizedFilePath = path.join(toOrganizeDirPath, "organised_files");
    console.log("file organised");
    filecreator(organizedFilePath);
    for (let key in types) {
        let innerdirpath = path.join(organizedFilePath, key);
        filecreator(innerdirpath);

    }
    let otherpath = path.join(organizedFilePath, "others");
    filecreator(otherpath);
    orgfiles(toOrganizeDirPath, organizedFilePath);
}

function filecreator(dirpath) {
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath);
    }

}

function getcontent(dirpath) {
    return fs.readdirSync(dirpath);
}

function isfileornot(dirpath) {
    return fs.lstatSync(dirpath).isFile();

}

function getfoldername(dirpath) {
    let starr = dirpath.split(".");
    let ext = starr.pop();
    // console.log(ext);
    for (let key in types) {
        for (let i = 0; i < types[key].length; i++) {
            if (types[key][i] == ext) {
                return key;
            }
        }
    }
    return "others";
}

function copytodest(dirpath, destfolderpath) {
    let originalname = path.basename(dirpath);
    let destfilepath = path.join(destfolderpath, originalname);
    fs.copyFileSync(dirpath, destfilepath);
}

function orgfiles(dirpath, organizedFilePath) {
    let isfile = isfileornot(dirpath);
    if (isfile == true) {

        //identify des folder
        // console.log(dirpath);
        let destfoldername = getfoldername(dirpath);
        console.log(dirpath + "-->" + destfoldername);
        let destfolderpath = path.join(organizedFilePath, destfoldername);
        copytodest(dirpath, destfolderpath);
    } else {
        // recursion
        let content = getcontent(dirpath);
        for (let i = 0; i < content.length; i++) {
            let childpath = path.join(dirpath, content[i]);
            orgfiles(childpath, organizedFilePath);

        }
    }
}
module.exports = {
    fn: organisefun
}