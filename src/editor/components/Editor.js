import React from 'react';
import * as monaco from 'monaco-editor';
import { connect } from 'react-redux';
import { getFileNames, setEditor, setActiveModel, addModels } from '../../js/actions/action';

const { ipcRenderer, dialog } = require('electron');

class Editor extends React.Component {
  componentDidMount() {
    self.MonacoEnvironment = {
      getWorkerUrl: function(moduleId, label) {
        if (label === 'json') {
          return '../dist/json.worker.bundle.js';
        }
        if (label === 'css') {
          return '../dist/css.worker.bundle.js';
        }
        if (label === 'html') {
          return '../dist/html.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
          return '../dist/ts.worker.bundle.js';
        }
        return '../dist/editor.worker.bundle.js';
      }
    };  

    const monacoEditor = monaco.editor.create(
      document.getElementById("editor-container"),
      {
        value: ['function x() {\n\tconsole.log("Whatup world!"); \n}'].join(
          '\n'
        ),
        language: 'javascript',
        theme: 'vs-dark',
        dragAndDrop: true,
        fontFamily: 'monaco',
        fontSize: 14,
        automaticLayout: true
      }
    );
    this.props.setEditor(monacoEditor)
    // listen for main process msg to inject text
    ipcRenderer.on("inject-text", (event, arg) => {
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
      monacoEditor.executeEdits('my-source', [op]);
      ipcRenderer.send('save-file', this.props.editor.getValue())
    });

    // // display selected file from menu in text editor
    ipcRenderer.on('open-file', (event, allFileNamesAndData) => {
      let allModels = allFileNamesAndData.reduce((acc, fileNameAndData) => {
        if (!acc[fileNameAndData[0]]) {
          let model = monaco.editor.createModel(
          fileNameAndData[1],
          'javascript',
          monaco.Uri.from({ path: fileNameAndData[0] }))
          acc[model.uri.path] = model
        }
        return acc
      }, {})
      this.props.addModels(allModels) 

      let allFilePaths = Object.keys(allModels)
      this.props.getFileNames(allFilePaths);
      this.props.editor.setModel(allModels[allFilePaths[0]])
    });
  
    // listen for main process prompt to save file
    ipcRenderer.on("save-file", (event, arg) => {
      ipcRenderer.send(
        'save-file',
        this.props.editor.getValue(),
        this.props.filenames
      );
    }); 
  }

  render() {
    return <div id="editor-container" />;
  }
}

function mapStateToProps(state) {
  return {
    editor: state.editorReducer.editor,
    filenames: state.editorReducer.filenames,
    activeModel: state.editorReducer.activeModel
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setEditor: editor => dispatch(setEditor(editor)),
    getFileNames: filenames => dispatch(getFileNames(filenames)),
    setActiveModel: filename => dispatch(setActiveModel(filename)),
    addModels: models => dispatch(addModels(models))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

// export default Editor;
