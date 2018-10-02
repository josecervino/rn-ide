// // button to trigger the creation of a file
// {/* <input type="button" id="btn-createfile" value="new file" /> */}
// //  button to read the contents of a files
// {/* <input type="button" id="btn-readfile" value="read file" /> */}
// {/* <input type="button" id="btn-updatefile" value="update file" /> */}
// {/* <input type="button" id="btn-removefile" value="select and delete file"> */}

// <script>
//   //file system module
const fs = require("fs");

//   //Dialogs module
//   const { dialog } = require("electron").remote;

//   //event listener for visualization of the dialog anf the creation of file
//   document.getElementById("btn-createfile").addEventListener("click", () => {
//     let content = "hello, this is the content of the new file"
//     //display a save file dialog from the module --the callback receives the path where the file should be created
//     dialog.showSaveDialog((filename) => {
//       //if the callback doesnt receive any argument, it means that the user probably cancelled the creation of a file
//       if (filename === undefined) {
//         console.log('the user clicked a button but didnt create a file');
//         return;
//       }
//       //use the filesystem module to create the file in the provided path that the dialog returned
//       //the content of the file is expected as the second argument
//       fs.writeFile(filename, content, (err) => {
//         if (err) {
//           console.log('An error occured with creation of the file' + err.message);
//           return;
//         }
//         alert("file successfully created");
//       })
//     })
//   }, false)

// </script>
//  <script>
//   //filesystem module
//   const fs = require("fs");
//   //dialogs module
//   const { dialog } = require("electron").remote;

//   //add an event listener to handle the visualization of the dialog
//   document.getElementById("btn-readfile").addEventListener("click", () => {
//     //open the file dialog to select a file
//     //the callback receives an array with selected files (only a file by default but it can be modified to select multiple files)
//     dialog.showOpenDialog((fileNames) => {
//       if (fileNames === undefined) {
//         console.log('No files were selected');
//         return;
//       }
//       //use the readfile method of the filesystem module
//       //you need to specify the encoding in the second parameter(usually utf-8)
//       // the callback receives as a first argument the content of the file
//       fs.readFile(fileNames[0], "utf-8", (err, data) => {
//         if (err) {
//           console.log('cannot read files');
//           return;
//         }
//         console.log('the contents of the file is');
//         console.log(data);

//       })
//     })
//   })
// </script>

//  <script>
//   //require in the fs module
//   const fs = require("fs");
//   // dialogs module
//   const { dialog } = require("electron").remote;

//   document.getElementById("btn-updatefile").addEventListener("click", () => {
//     let newContent = 'this is the new content of an existent file 123245';
//     //display the open file dialog to select a file
//     //using the writefile method of the filesystem you can replace the content of an existing file
//     dialog.showOpenDialog((fileNames) => {
//       if (fileNames === undefined) {
//         console.log('No file selected');
//         return;
//       }
//       fs.writeFile(fileNames[0], newContent, (err, data) => {
//         if (err) {
//           console.log('cannot update file', err);
//           return;
//         }
//         alert('the file has been updated');
//       })
//     })
//   }, false);
// </script>
// <script>
//   //filesystem module
//   const fs = require("fs");
//   //dialogs module
//   const { dialog } = require("electron").remote;
//   document.getElementById("btn-removefile").addEventListener("click", () => {
//     dialog.showOpenDialog((fileNames) => {
//       if (fileNames === undefined) {
//         console.log('selected file does not exist');
//         return;
//       }
//       //check if file exists
//       if (!fs.existsSync(fileNames[0])) {
//         console.log('the file in ' + fileNames[0] + "doesnt exist");
//         return;
//       }
//       //delete the file using the unlink method
//       fs.unlink(fileNames[0], (err) => {
//         if (err) {
//           console.log('cannot delete file', err);
//           return;
//         }
//         alert("file successfully deleted !");
//       })
//     })
//   }, false)
// </script>

import React, { Component } from "react";

export class Panel extends Component {
  constructor() {
    super();
    this.stae = {
      files: ""
    };
    this.readFolder = this.readFolder.bind(this);
  }

  readFolder(path) {
    fs.readdir(path, (err, files) => {
      "use strict";
      if (err) throw err;
      //the files parameter is an array of the files and folders in the path we passed. So we loop through the array, printing each file and folder
      for (let file of files) {
        this.setState({
          files: file
        });
        //the += after innerHTML means we are appending to the existing content
        // document.getElementById("display-files").innerHTML += `<li>${file}</li>`;
      }
    });
  }

  render() {
    return <div>{this.state.files}</div>;
  }
}
