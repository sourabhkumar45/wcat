#! /usr/bin/env node
let fs = require("fs");
let path = require("path");
let find = require("./search.js");

let input = process.argv.slice(2);
let dirname = process.cwd();

function type() {
  if (input[0] == "-s" || input[0] == "-b" || input[0] == "-n") return input[0];
}

function funForS() {
  // -s and -b or -s or -n
  if (input[0] == "-s") {
    if (input.length == 2) {
      let data = find.fun(input[1]);

      data = data.replace(/(\r\n|\n\r|\n\n|\r\r)/gm, "");
      fs.writeFileSync(path.join(dirname, input[1]), data, "utf-8");

      console.log(data);
    } else if (input.length == 3 && (input[1] == "-b" || input[1] == "-n")) {
      let data = find.fun(input[2]);
      data = data.replace(/(\r\n|\n\r|\n\n|\r\r)/gm, "");
      fs.writeFileSync(path.join(dirname, input[2]), data, "utf-8");

      let i = 1;
      data = find.fun(input[2]);
      let temp = data.toString().split("\n");

      temp.forEach(function (line) {
        let newline = i + "  " + line;
        console.log(newline);
        i++;
      });
    } else if (input.length == 4 && (input[2] == ">>" || input[2] == ">")) {
      let data = find.fun(input[1]);
      data = data.replace(/(\r\n|\n\r|\n\n|\r\r)/gm, "");
      if (input[2] == ">>")
        fs.appendFileSync(path.join(dirname, input[3]), data, "utf-8");
      else if (input[2] == ">")
        fs.writeFileSync(path.join(dirname, input[3]), data, "utf-8");
    }
  }
}
function funForB() {
  if (input.length == 2 || (input.length == 3 && input[1] == "-n")) {
    let data = find.fun(input[1]);
    let temp = data.toString().split("\n");
    let i = 1;

    temp.forEach(function (line) {
      if (line.charAt(0) != "\n" || line.charAt(0) != "\r") {
        console.log(i + " " + line);
        i++;
      } else console.log(line);
    });
  } else if (input.length == 4 && (input[1] == ">" || input[1] == ">>")) {
    let data = find.fun(input[1]);
    let temp = data.toString().split("\n");
    let i = 1;

    temp.forEach(function (line) {
      let t = line;
      if (line.charAt(0) != "\n" || line.charAt(0) != "\r") {
        t = i + " " + line;
        i++;
      }
      if (input[1] == ">")
        fs.writeFileSync(path.join(dirname, input[2]), t, "utf-8");
      else if (input[1] == ">>")
        fs.appendFileSync(path.join(dirname, input[2]), t, "utf-8");
    });
  }
}

function funForN() {
  if (input.length == 2 || (input.length == 3 && input[1] == "-b")) {
    let i = 1;
    let data = find.fun(input[1]);
    let temp = data.toString().split("\n");

    temp.forEach(function (line) {
      let newline = i + "  " + line;
      console.log(newline);
      i++;
    });
  } else if (input.length == 4 && (input[2] == ">" || input[2] == ">>")) {
    let data = find.fun(input[1]);
    if (input[1] == ">>") {
      fs.appendFileSync(path.join(dirname, input[3]), data, "utf-8");
      console.log("Appended the content of", input[1], "to", input[3]);
    } else if (input[1] == ">") {
      fs.writeFileSync(path.join(dirname, input[3]), data, "utf-8");
      console.log("copied the content of", input[1], "to", input[3]);
    }
  }
}
if (input != undefined) {
  if (input.length == 1) {
    let data = find.fun(input[0]);
    console.log(data);
  } else {
    if (type() == "-s") {
      funForS();
    } else if (type() == "-b") {
      funForB();
    } else if (type() == "-n") {
      funForN();
    } else {
      if (input[1] == ">>" && input.length == 3) {
        let data = find.fun(input[0]);
        console.log("Appended the content of", input[0], "to", input[2]);
        fs.appendFileSync(path.join(dirname, input[2]), data, "utf-8");
      } else if (input[1] == ">" && input.length == 3) {
        let data = find.fun(input[0]);
        console.log("copied the content of", input[0], "to", input[2]);
        fs.writeFileSync(path.join(dirname, input[2]), data, "utf-8");
      } else {
        for (let i = 0; i < input.length; i++) {
          let data = find.fun(input[i]);
          console.log(data);
        }
      }
    }
  }
}
