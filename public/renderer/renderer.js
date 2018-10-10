//create an object from the fs module
const fs = require("fs");
//create an object from electron module. the shell object allows us to open the selected file
const path = require("path");
const { shell } = require("electron");
const { dialog } = require("electron").remote;
const {ipcRenderer} = require('electron');

const FileRenderer = {

  userFile: function() {
    dialog.showOpenDialog(
      {
        properties: ["openDirectory", "openFile"]
      },
      selectedFiles => {
        console.log('selectedFiles structure:', selectedFiles);
        let path = selectedFiles[0];
        if (!fs.lstatSync(path).isDirectory()) {
          //get the filename
          var filename = path.replace(/^.*[\\\/]/, "");
          if (document.getElementById(path)) {
            return;
          } else {
            //append the filename to the DOM when it is clicked on  to open it
            document.getElementById(
              "display-files"
            ).innerHTML += `<li id=${path} onclick="FileRenderer.openFile(this.id)"><i class="fa fa-file"></i>${filename}</li>`; //Files are appended to the DOM
          }

        } else {
          //if the path has a directory, call the readfolder function
          console.log('readFolder fork in folder about to be invoked.')
          FileRenderer.readFolder(path + "/");
        }
      }
    );
  },

  readFolder: function(path) {
    //check if it is a file, if so open
    fs.readdir(path, (err, files) => {
      // console.log("this is showing the path correctly", path);
      ("use strict");

      if (err) throw err;

      document.getElementById("listed-files").innerHTML = `<ol id="display-files"></ol>`;

      console.log('files structure:', files);
      for (let file of files) {
        fs.stat(path + "/" + file, (err, stats) => {
          // when we double click on a folder or file, we need to obtain the path and name so that we can use it to take action. the easiest way to obtain the path and name for each file and folder is to store that information in the element itself as an ID. this is possible since we cannot have two files with the same name in a folder. theID variable below is created by concatinatin the path with the file name and a / at the end.

          let theID = `${path}${file}/`;
          // [ISSUE] DOESN'T HANDLE SPACES UPON 2ND CALL FROM RENDERED FOLDER ONCLICK

          if (err) throw err;
          if (!stats.isDirectory()) {
            if (document.getElementById(theID)) {
              return;
            } else {
              theID = `${path}${file}`;
              document.getElementById(
                "display-files"
              ).innerHTML += `<li id=${theID} onclick="FileRenderer.openFile(this.id)"><i class="fa fa-file"></i>${file}</li>`;
            }
            // add and onclick event to each item. with Folders, call the same function(recursion) to read the contents of the folder
            // if it is a file, call the openFile function to open the file with the default app
          } else {
            document.getElementById(
              "display-files"
            ).innerHTML += `<li id=${theID} ondblclick="FileRenderer.readFolder(this.id)"><i class="fa fa-folder-open"></i>${file}</li>`;
          }
        });
      }
    });
  },

  //open the file with the default app
  openFile: function(path) {
    console.log('in the openFile renderer method, about to invoke ipcRenderer.send')
    ipcRenderer.send('open-file-in-editor', path);
  },

  openFileResponder(...args) {
    
  } 
}

module.exports = FileRenderer;