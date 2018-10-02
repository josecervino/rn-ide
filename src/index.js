import * as monaco from "monaco-editor";
const fs = window.require("fs");
const { ipcRenderer, dialog } = require("electron");

self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "json") {
      return "../dist/json.worker.bundle.js";
    }
    if (label === "css") {
      return "../dist/css.worker.bundle.js";
    }
    if (label === "html") {
      return "../dist/html.worker.bundle.js";
    }
    if (label === "typescript" || label === "javascript") {
      return "../dist/ts.worker.bundle.js";
    }
    return "../dist/editor.worker.bundle.js";
  }
};

const editor = monaco.editor.create(document.getElementById("container"), {
  value: ["function x() {", '\tconsole.log("Whatup world!");', "}"].join("\n"),
  language: "javascript"
});

// In renderer process (web page)

// create save button
let saveButton = document.createElement("button");
saveButton.innerHTML = "save";
saveButton.onclick = saveText;
let body = document.getElementsByTagName("body")[0];
body.prepend(saveButton);

function saveText() {
  ipcRenderer.send("save-button-clicked", editor.getValue());
}

// create open button
let openButton = document.createElement("button");
openButton.innerHTML = "open";
openButton.onclick = openText;
body = document.getElementsByTagName("body")[0];
body.prepend(openButton);

function openText() {
  ipcRenderer.send("open-button-clicked");
}

// display the opened file in text editor
<<<<<<< HEAD
ipcRenderer.on('open-button-clicked', (event, arg) => {
	editor.setValue(arg)
})

// display selected file from menu in text editor
ipcRenderer.on('open-file', (event, arg) => {
	editor.setValue(arg)
	console.log(arg);
})

// listen for main process prompt to save file
ipcRenderer.on('save-file', (event, arg) => {
	ipcRenderer.send('save-file', editor.getValue())
})


=======
ipcRenderer.on("open-button-clicked", (event, arg) => {
  editor.setValue(arg);
});
>>>>>>> 79c3240a769fd9db92c58991276249e9b72b20d9

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// // import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById("root"));
// // registerServiceWorker();
