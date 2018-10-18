const {
  app,
  BrowserWindow,
  Menu,
  shell,
  dialog,
  ipcMain
} = require('electron');
const fs = require('fs');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require('electron-devtools-installer'); // Adding Redux & React dev tools to Electron

//  CREATING THE WINDOW -----------------------------

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1200, height: 800 });

  // and load the index.html of the app.
  mainWindow.loadFile('./dist/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
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
const openFile = function() {
  const options = {
    title: 'Select Directory',
    properties: [
      'openFile',
      // 'openDirectory',
      'multiSelections',
    ],
  };

  dialog.showOpenDialog(options, async (fileNames) => {
    console.log('inside openFile dialog')
    if (fileNames === undefined) {
      console.log(`You didn't save the file`);
      return;
    }

    let allFileNamesAndData = [];

    // should check for all existing models first, then only create if
    // the model doesn't already exist
    // ----
    // let allModels = allFileNamesAndData.reduce((acc, fileNameAndData) => {
    //   if (!acc[fileNameAndData[0]]) {
    //     let model = monaco.editor.createModel(
    //     fileNameAndData[1],
    //     'javascript',
    //     monaco.Uri.from({ path: fileNameAndData[0] }))
    //     acc[model.uri.path] = model
    //   }
    //   return acc
    // }, {})
    // this.props.addModels(allModels) 

    // let allFilePaths = Object.keys(allModels)
    // this.props.getFileNames(allFilePaths);
    // this.props.editor.setModel(allModels[allFilePaths[0]])


    fileNames.forEach(fileName => {
      allFileNamesAndData.push(new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf-8', (err, fileContents) => {
          if (err) {
            console.log('An error occurred reading the file : ', err.message);
            reject(err)
          } 
          else { 
            resolve([fileName, fileContents])
          } 
          // console.log('allFileNamesAndData so far: ', allFileNamesAndData);
        })
      }))
    })
    
    
    allFileNamesAndData = await Promise.all(allFileNamesAndData)

    console.log('main.js open-file:', allFileNamesAndData)
    
    mainWindow.webContents.send('open-file', allFileNamesAndData);
  });
};

function openFileFromTree(path, fileName) {
  console.log('inside openFileClick');
  console.log('openFileClick filename:', path);
    // open file in text editor
    fs.readFile(path, 'utf-8', (err, data) => {
      console.log('data in openFileClick:', data);
      if (err) {
        console.log('main.js error found', err);
        return;
      }
      console.log('About to invoke mainWindow.webContents.send()');
      let fileNameAndData = [[path, data]];
      // passing in file with root as fileName
      mainWindow.webContents.send('open-file', fileNameAndData);
      
      // Change how to handle the file content
      console.log("The file content is : " + data);
      return data;
    });
};

const saveAs = function(fileNames) {
  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
      console.log(`You didn't save the file`);
      return;
    }
    saveFile(fileName);
  });
};

const saveFile = function(fileName) {
  mainWindow.webContents.send('save-file');
  // console.log('filename line 148 is: ', fileName);
  ipcMain.on('save-file', (event, fileContents, currentFileName) => {
    // save data from text editor to file
    // console.log('in main save-file, 151: ', fileContents);
    // console.log('in main save-file, currentFileName is: ', currentFileName);
    fs.writeFile(fileName ? fileName : currentFileName, fileContents, err => {
      // console.log('in write file, file name is:', fileName);
      // console.log('');
      // console.log('line 156, {fileName}:', { fileName });
      // console.log({ currentFileName });
      if (err) {
        console.log('An error occurred creating the file ', err.message);
      }
      console.log('File successfully saved.');
    });
  });
};

//  MENU TEMPLATE FUNCITONS -----------------------------

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click: () => {
          openFile();
        },
        accelerator: 
          process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+Shift+O'
      },
      {
        label: 'Save as...',
        click: (e) => {
          saveAs(e);
        }
      },
      {
        label: 'Save',
        click: () => {
          saveFile();
        },
        accelerator: 
          process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+Shift+S'
      },
      {
        label: 'Inject!',
        click: () => {
          injectText();
        }
      }
    ]
  },

  {
    label: 'Edit',
    submenu: [
      {
        label: 'Open!',
        click: () => {
          openFile();
        }
      },
      {
        label: 'Save as',
        click: () => {
          saveFile();
        }
      },
      {
        label: 'Save',
        click: () => {
          save();
        }
      }
    ]
  },

  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          require('electron').shell.openExternal('https://electronjs.org');
        }
      }
    ]
  }
];

if (process.platform === 'darwin') {
  menuTemplate.unshift({
    label: app.getName(''),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  });

  // Edit menu
  menuTemplate[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
    }
  );

  // Window menu
  menuTemplate[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ];
}

//  EVENT LISTENERS -----------------------------

// In main process.
// listener for save button

ipcMain.on('save-button-clicked', (event, arg) => {
  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
      console.log(`You didn't save the file`);
      return;
    }

    // save data from text editor to file
    fs.writeFile(fileName, arg, err => {
      if (err) {
        console.log('An error occurred creating the file ' + err.message);
      }
      console.log('File successfully saved.');
    });
  });
});

// listener for open button
ipcMain.on('open-button-clicked', event => {
  dialog.showOpenDialog(fileNames => {
    if (fileNames === undefined) {
      console.log(`You didn't save the file`);
      return;
    }

    // open file in text editor
    fs.readFile(fileNames[0], 'utf-8', (err, data) => {
      if (err) {
        alert('An error ocurred reading the file :' + err.message);
        return;
      }
      event.sender.send('open-button-clicked', data);
    });
  });
});

ipcMain.on('open-file-in-editor', (event, path, fileName) => {
  console.log('inside open-file-in-editor')
  openFileFromTree(path, fileName);
})

//   mainWindow.webContents.send('open-file', data);

//   // Change how to handle the file content
//   console.log('The file content is : ' + data);
// });
// });

//  APP FUNCITONS -----------------------------

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('ready', () => {
  [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(extension => {
    // Adding the React & redux dev tools
    installExtension(extension)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
