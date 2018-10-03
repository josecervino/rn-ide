import React from 'react';
import * as monaco from "monaco-editor";
const fs = window.require("fs"); 
const { ipcRenderer, dialog } = require("electron");

 
 class Editor extends React.Component {
   componentDidMount() {
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

  const monacoEditor = monaco.editor.create(document.getElementById("editor-container"), {
          value: ["function x() {", '\tconsole.log("Whatup world!");', "}"].join("\n"),
          language: "javascript"
      });

    console.log('GrandChild did mount.');

  }
   render() {
    return (
      <div id='editor-container'></div>
    )
  }
}

export default Editor;
