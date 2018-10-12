//create an object from the fs module
const fs = require("fs");
//create an object from electron module. the shell object allows us to open the selected file
const path = require("path");
const { shell } = require("electron");
const { dialog } = require("electron").remote;
const {ipcRenderer} = require('electron');

const FileRenderer = {

  populateTree: function() {
    dialog.showOpenDialog(
      {
        properties: ["openDirectory", "openFile"]
      },
      selectedFiles => {
        console.log('1. The following directory or files have been selected', selectedFiles);

        let path = selectedFiles[0];

        if(fs.lstatSync(path).isDirectory()) {
          
        }
        // check if the selected thing is a folder of a file
        // If it's a file, open it in the editor
        // If it's a folder,
          // Access the folder
            // Save initial array of contents to a variable
            // iterates through the contents variable
              // construct a path with the selected directory as path, the current value of the iteration, and a '\' to make possible folders accessible
              // check if the constructed path is a folder or not
                // If it's a folder, add a component/button to the React render variable with this same function embedded into its onClick
                // If it's a file, add a component/button to the React render variable with openFile() embedded in its onclick
      }
    )
  },

  //open the file with the default app
  openFile: function(path) {
    console.log('in the openFile renderer method, about to invoke ipcRenderer.send')
    ipcRenderer.send('open-file-in-editor', path);
  },
}

module.exports = FileRenderer;