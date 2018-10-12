const {
  app,
  BrowserWindow,
  Menu,
  shell,
  dialog,
  ipcMain
} = require("electron");
const fs = require("fs");
const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer'); // Adding Redux & React dev tools to Electron

//  CREATING THE WINDOW -----------------------------

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadFile("./dist/index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

// inject text
const injectText = function(text) {
  mainWindow.webContents.send('inject-text', text);
};

//  FILE FUNCTIONS -----------------------------
// create menu 
const openFile = function(fileNames) {
  dialog.showOpenDialog(fileNames => {
    if (fileNames === undefined) {
      console.log("You didn't save the file");
      return;
    }

    // open file in text editor

    fs.readFile(fileNames[0], "utf-8", (err, data) => {
      if (err) {
        alert("An error ocurred reading the file :" + err.message);
        return;
      }
      mainWindow.webContents.send("open-file", data, fileNames[0]);

      // Change how to handle the file content
      console.log("The file content is : " + data);
    });
  });
};

function openFileFromTree(fileName) {
  console.log('inside openFileClick');
  console.log('openFileClick filename:', fileName);
    // open file in text editor
    fs.readFile(fileName, 'utf-8', (err, data) => {
      console.log('data in openFileClick:', data);
      if (err) {
        console.log('main.js error found', err);
        return;
      }
      console.log('About to invoke mainWindow.webContents.send()');

      // passing in file with root as fileName
      mainWindow.webContents.send('open-file', data, fileName);
      
      // Change how to handle the file content
      console.log("The file content is : " + data);
      return data;
    });
};

const saveAs = function(fileNames) {
  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
      console.log("You didn't save the file");
      return;
    }
    saveFile(fileName);
  });
};

const saveFile = function(fileName) {
  mainWindow.webContents.send("save-file");

  ipcMain.on("save-file", (event, arg, currentFileName) => {
    // save data from text editor to file
    fs.writeFile(fileName ? fileName : currentFileName, arg, err => {
      console.log({ fileName });
      console.log({ currentFileName });
      if (err) {
        console.log("An error occurred creating the file " + err.message);
      }
      console.log("File successfully saved.");
    });
  });
};




//  MENU TEMPLATE FUNCITONS -----------------------------

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Open!",
        click: () => {
          openFile();
        }
      },
      {
        label: "Save as...",
        click: () => {
          saveAs();
        }
      },
      {
        label: "Save",
        click: () => {
          saveFile();
        }
      },
      {
        label: 'Inject!',
        click: () => { injectText(); }
      }
    ]
  },

  {
    label: "Edit",
    submenu: [
      {
        label: "Open!",
        click: () => {
          openFile();
        }
      },
      {
        label: "Save as",
        click: () => {
          saveFile();
        }
      },
      {
        label: "Save",
        click: () => {
          save();
        }
      }
    ]
  },

  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteandmatchstyle" },
      { role: "delete" },
      { role: "selectall" }
    ]
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" }
    ]
  },
  {
    role: "window",
    submenu: [{ role: "minimize" }, { role: "close" }]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click() {
          require("electron").shell.openExternal("https://electronjs.org");
        }
      }
    ]
  }
];

if (process.platform === "darwin") {
  menuTemplate.unshift({
    label: app.getName(''),
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services", submenu: [] },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  });

  // Edit menu
  menuTemplate[1].submenu.push(
    { type: "separator" },
    {
      label: "Speech",
      submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
    }
  );

  // Window menu
  menuTemplate[3].submenu = [
    { role: "close" },
    { role: "minimize" },
    { role: "zoom" },
    { type: "separator" },
    { role: "front" }
  ];
}



//  EVENT LISTENERS -----------------------------

// In main process.
// listener for save button

ipcMain.on("save-button-clicked", (event, arg) => {
  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
      console.log("You didn't save the file");
      return;
    }

    // save data from text editor to file
    fs.writeFile(fileName, arg, err => {
      if (err) {
        console.log("An error occurred creating the file " + err.message);
      }
      // console.log("File successfully saved.");
    });
  });
});

// listener for open button
ipcMain.on("open-button-clicked", event => {
  dialog.showOpenDialog(fileNames => {
    if (fileNames === undefined) {
      console.log("You didn't save the file");
      return;
    }

    // open file in text editor
    fs.readFile(fileNames[0], "utf-8", (err, data) => {
      if (err) {
        alert("An error ocurred reading the file :" + err.message);
        return;
      }
      event.sender.send("open-button-clicked", data);
    });
  });
});

ipcMain.on('open-file-in-editor', (event, path) => {
  openFileFromTree(path);
})



//  APP FUNCITONS -----------------------------

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

app.on('ready', () => {
  [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => { // Adding the React & redux dev tools
    installExtension(extension)
        .then((name) => console.log(`Added Extension: ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.