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
    // {this.props.runMonaco}
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

    // // listen for main process prompt to save file
    ipcRenderer.on('save-file', (event, arg) => {
    	ipcRenderer.send('save-file', this.props.editor.getValue())
    })
  }
  render() {
    console.log('editor', this.props.editor);
    return (
        <div id='editor-container'>
          <p>{this.props.getEditor}</p>
          <p>{this.props.todo}</p>

          <p>Test text</p>
          <button onClick={this.props.toggleTodo}>Click Me</button>
        </div>
    )
  }
}

function mapStateToProps(state){
  console.log('the state',state.editorReducer.newEditor);
    return {
        getEditor: state.editorReducer.newEditor,
        todo: state.editorReducer.nextTodoId,
        editor: state.editorReducer.editor,
    }
}
function mapDispatchToProps (dispatch) {
  console.log('add todo in mapDispatchToProps', addTodo);
return  {
    toggleTodo: () => dispatch(addTodo()),
    setEditor: (editor) => dispatch(setEditor(editor))
    // runMonaco: () => dispatch(monaco())

  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Editor);

// export default Editor;
