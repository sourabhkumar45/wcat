const { lstat, lstatSync } = require("fs");

let fs = require("fs");
let path = require("path");

let dirname = process.cwd();

function isFileOrNot(src) {
  return fs.lstatSync(src).isFile();
}
function searchFile(fileName) {
  if (isFileOrNot(path.join(dirname, fileName)) == true) {
    try {
      let data = fs.readFileSync(path.join(dirname, fileName), "utf-8");
      return data;
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("😤 Can't read a folder!! Enter a file name");
  }
}
module.exports = {
  fun: searchFile,
};
