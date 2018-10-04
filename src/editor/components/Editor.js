import React from 'react';
import * as monaco from "monaco-editor";
const fs = window.require("fs");
const { ipcRenderer, dialog } = require("electron");
import { connect } from "react-redux";
import {
  addTodo,
  // monaco,
  setEditor
} from "../../js/actions/action"

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

    this.props.setEditor(monacoEditor);

    // // display selected file from menu in text editor
    ipcRenderer.on('open-file', (event, arg) => {
    	this.props.editor.setValue(arg)
    	console.log(arg);
    })

    // listen for main process prompt to save file
    ipcRenderer.on('save-file', (event, arg) => {
    	ipcRenderer.send('save-file', this.props.editor.getValue())
    })
  }

  render() {
    // console.log('editor', this.props.editor);
    return (
        <div id='editor-container'>
        </div>
    )
  }
}

function mapStateToProps(state){

    return {
        editor: state.editorReducer.editor,
    }
}
function mapDispatchToProps (dispatch) {

return  {
    setEditor: (editor) => dispatch(setEditor(editor)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Editor);

// export default Editor;
