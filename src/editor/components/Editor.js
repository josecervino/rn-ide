import React from "react";
import * as monaco from "monaco-editor";
const fs = window.require("fs");
const { ipcRenderer, dialog } = require("electron");

import { connect } from "react-redux";
import { getFileName, setEditor } from "../../js/actions/action";

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

    const monacoEditor = monaco.editor.create(
      document.getElementById("editor-container"),
      {
        value: ["function x() {", '\tconsole.log("Whatup world!");', "}"].join(
          "\n"
        ),
        language: "javascript",
        theme: 'vs-dark',
        dragAndDrop: true,
        fontFamily: "monaco",
        fontSize: 14
      }
    );

    this.props.setEditor(monacoEditor);

    // listen for main process msg to inject text
    ipcRenderer.on('inject-text', (event, arg) => {
      let selection = this.props.editor.getSelection();
      let range = new monaco.Range(
        selection.startLineNumber, 
        selection.startColumn, 
        selection.endLineNumber, 
        selection.endColumn
      );
      let id = { major: 1, minor: 1 };             
      let op = {
        identifier: id, 
        range: range, 
        text: "<Icon \n\tname='JoelReduxMaster' />", 
        forceMoveMarkers: true
      };
      monacoEditor.executeEdits("my-source", [op]);
      ipcRenderer.send('save-file', this.props.editor.getValue())
    })

    // // display selected file from menu in text editor
    ipcRenderer.on("open-file", (event, arg, filename) => {
      this.props.getFileName(filename);

      this.props.editor.setValue(arg);
      console.log(arg);
    });

// FILE TREE EDITOR DEVELOPMENT
//     function openText() {
//       ipcRenderer.send("open-button-clicked");
//     }
//     //display the opened file in text editor
//     ipcRenderer.on('open-button-clicked', (event, arg) => {
//       monacoEditor.setValue(arg)
//     })

//   }

//    render() {
//     return (
//       <div id='editor-container'></div>
//     )
    
    // listen for main process prompt to save file
    ipcRenderer.on("save-file", (event, arg) => {
      console.log("filename", this.props.filename);

      ipcRenderer.send(
        "save-file",
        this.props.editor.getValue(),
        this.props.filename
      );
    });
  }

  render() {
    // console.log('editor', this.props.editor);
    return <div id="editor-container" />;
  }
}

function mapStateToProps(state) {
  return {
    editor: state.editorReducer.editor,
    filename: state.editorReducer.filename
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setEditor: editor => dispatch(setEditor(editor)),
    getFileName: filename => dispatch(getFileName(filename))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

// export default Editor;
