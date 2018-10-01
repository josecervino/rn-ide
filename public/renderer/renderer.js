//create an object from the fs module
const fs = require("fs");
//create an object from electron module. the shell object allows us to open the selected file
const { shell } = require("electron");
const { dialog } = require("electron").remote;

function userFile() {
  dialog.showOpenDialog(
    {
      properties: ["openDirectory", "openFile"]
    },
    selectedFiles => {
      let path = selectedFiles[0];
      if (!fs.lstatSync(path).isDirectory()) {
        //get the filename
        var filename = path.replace(/^.*[\\\/]/, "");
        if (document.getElementById(path)) {
          return;
        } else {
          //append the filename to the DOM when it is clicked on open it
          document.getElementById(
            "display-files"
          ).innerHTML += `<li id=${path} onclick="openFile(this.id)"><i class="fa fa-file"></i>${filename}</li>`;
        }
      } else {
        //if the path has a directory, call the readfolder function
        readFolder(path + "/");
      }
    }
  );
}

function readFolder(path) {
  //check if its file if so open
  fs.readdir(path, (err, files) => {
    console.log("this is showing the path correctly", path);

    ("use strict");
    if (err) throw err;
    document.getElementById(
      "listed-files"
    ).innerHTML = `<ol id="display-files"></ol>`;
    for (let file of files) {
      fs.stat(path + "/" + file, (err, stats) => {
        console.log("file", stats);
        // when we double click on a folder or file, we need to obtain the path and name so that we can use it to take action. the easiest way to obtain the path and name for each file and folder is to store that information in the element itself as an ID. this is possible since we cannot have two files with the same name in a folder. theID variable below is created by concatinatin the path with the file name and a / at the end.

        let theID = `${path}${file}/`;
        if (err) throw err;
        if (!stats.isDirectory()) {
          if (document.getElementById(theID)) {
            return;
          } else {
            document.getElementById(
              "display-files"
            ).innerHTML += `<li id=${theID} onclick="openFile(this.id)"><i class="fa fa-file"></i>${file}</li>`;
          }
          // add and onclick event to each item. with Folders, call the same function(recursion) to read the contents of the folder
          // if it is a file, call the openFile function to open the file with the default app
        } else {
          console.log("i am running");

          document.getElementById(
            "display-files"
          ).innerHTML += `<li id=${theID} ondblclick="readFolder(this.id)"><i class="fa fa-folder-open"></i>${file}</li>`;
        }
      });
    }
  });
}
//open the file with the default app
function openFile(path) {
  shell.openItem(path);
}
