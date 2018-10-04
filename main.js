// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  Menu,
  shell,
  dialog,
  ipcMain
} = require("electron");
const fs = require("fs");

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

const saveFile = function(fileNames) {
  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
      console.log("You didn't save the file");
      return;
    }
    mainWindow.webContents.send("save-file");

    ipcMain.on("save-file", (event, arg) => {
      console.log("args", arg);
    });
  });
};

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
    label: app.getName(),
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

console.log("running main.js");

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

      // Change how to handle the file content
      console.log("The file content is : " + data);
    });
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

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
