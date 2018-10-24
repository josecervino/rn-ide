import React from 'react';
import * as monaco from 'monaco-editor';
import { connect } from 'react-redux';
// import { getFileNames, setEditor, setActiveModel, addModels } from '../../js/actions/action';

// import { connect } from "react-redux";
import {
  getFileName,
  setEditor,
  setRange,
  setCoords,
  setActiveModel,
  addModels,
  getFileNames,
  setItemRange
} from "../../js/actions/action";

import {
  setInputValue
} from '../../js/actions/vizEditorActions';

// const line1 = '<ActivityIndicatorIOS '
// const line2 = 'style={{ '
// const line3 = `alignItems: 'center', `
// const line4 = `justifyContent: 'center', `
// const line5 = '}} '
// const line6 = 'animating={true} '
// const line7 = `size={'small'}`
// const line8 = `color={'black'}`
// const line9 = '/>'
//
// const text = [line1, line2, line3, line4,line5, line6, line7, line8, line9];
// const fs = window.require('fs');
const { ipcRenderer, dialog } = require('electron');

class Editor extends React.Component {

  constructor (props){
    super(props)
    this.getRange = this.getRange.bind(this);
    this.setDecorationChange = this.setDecorationChange.bind(this);
    this.setInjectListener = this.setInjectListener.bind(this);
  }

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
    this.setInjectListener(monacoEditor);

    // // display selected file from menu in text editor
    ipcRenderer.on('open-file', (event, allFileNamesAndData) => {
      let allModels = allFileNamesAndData.map((fileNameAndData) => {
        return monaco.editor.createModel(
          fileNameAndData[1],
          'javascript',
          monaco.Uri.from({ path: fileNameAndData[0] })
        )}
      )
      this.props.addModels(allModels)
      this.props.editor.setModel(allModels[0])

      let allFilePaths = allModels.map((model) => {
        return model.uri.path
      })
      this.props.getFileNames(allFilePaths);
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
      ipcRenderer.send(
        'save-file',
        this.props.editor.getValue(),
        this.props.filenames
      );
    });
  }

  getRange (inputRange, coordinates, input) {
    const newRange = {}
    for (let item in coordinates){
      const range = { ...inputRange };
      range.startLineNumber = (range.startLineNumber + coordinates[item].lineStart)
      range.endLineNumber = (range.endLineNumber + coordinates[item].lineEnd);
      range.startColumn = (range.startColumn + coordinates[item].colStart);
      range.endColumn = (range.endColumn + coordinates[item].colEnd);
      newRange[item] = { range };

      const decoration = this.props.activeModel.deltaDecorations([],
        [
          { range: range, options: { inlineClassName: 'myInlineDecoration' }},
        ]);
      newRange[item] = { ...newRange[item], decoration, input: '' };
    }
    return newRange;
  }

  setDecorationChange(){
    this.props.activeModel.onDidChangeDecorations((decorationEvent)=> {

      const {
        range,
        activeModel,
        setItemRange,
        currentInput,
        setInputValue,
      } = this.props;

      // console.log({range});
      for (let i=0; i<range.length; i++){
        for (let item in range[i]){
          // console.log('range in set decoration', range[i][item]);
          const id = range[i][item].decoration[0];

          const decorationRange = activeModel.getDecorationRange(id)
          const oldRange = range[i][item].range

          if (decorationRange.endColumn !== range[i][item].range.endColumn && decorationRange.startLineNumber === range[i][item].range.startLineNumber){
            // console.log({oldRange});
            // console.log({decorationRange});
            const currVal = activeModel.getValueInRange(decorationRange);
            if (range[i][item].input !== currVal ){
              console.log('index in setDecorationChange', i);
              console.log('input in setDecorationChange', range[i][item].input);
              console.log({currVal});
              setInputValue(item, currVal, i);
            }
            // console.log({i});
            setItemRange(item, decorationRange, i)
          }
        }
      }
    })
  }

  setInjectListener(monacoEditor){
    ipcRenderer.on("inject-text", (event, arg) => {
      // console.log({arg});
      this.setDecorationChange()

      let selection = this.props.editor.getSelection();
      let range = new monaco.Range(
      selection.startLineNumber,
      selection.startColumn,
      selection.endLineNumber,
      selection.endColumn
    );

      const space = '\t'
      const offset = space.repeat(range.startColumn);
      const endOffSet = space.repeat(range.startColumn - 1);

      let text = ''
      let coord = {}
      switch (arg){
        case 'indicator':
          // console.log({arg});
          text = `<ActivityIndicatorIOS\n${offset}style={{\n${offset}alignItems: 'center',\n${offset}justifyContent: 'center',\n${offset}}}\n${offset}animating={true}\n${offset}size={'small'}\n${offset}color={'black'}\n${endOffSet}/>`
          coord = {
            alignItems: { lineStart: 2, lineEnd: 2, colStart: 14, colEnd: 20 },
            justifyContent: { lineStart: 3, lineEnd: 3, colStart: 18, colEnd: 24 },
            animating: { lineStart: 5, lineEnd: 5, colStart: 12, colEnd: 16 },
            size: { lineStart: 6, lineEnd: 6, colStart: 8, colEnd: 13 },
            color: { lineStart: 7, lineEnd: 7, colStart: 9, colEnd: 14 },
          };
          break;
        default:
          text = '';
          coord = {};
      }

      this.props.setCoords(coord);

      let id = { major: 1, minor: 1 };

      let op = {
        identifier: id,
        range,
        text: text,
        forceMoveMarkers: true
      };

      monacoEditor.executeEdits("my-source", [op]);
      // const input = {
      //   alignItems: '',
      //   justifyContent: '',
      //   animating: '',
      //   size: '',
      //   color: '',
      // }
      const updatedRange = this.getRange(range, coord)
      // console.log({updatedRange});
      this.props.setRange(updatedRange);
      ipcRenderer.send('save-file', this.props.editor.getValue())
    })
  }

  render() {
    return <div id="editor-container" />;
  }
}

function mapStateToProps(state) {
  return {
    editor: state.editorReducer.editor,
    filename: state.editorReducer.filename,
    range: state.editorReducer.currentRange,
    coords: state.editorReducer.coords,
    filenames: state.editorReducer.filenames,
    activeModel: state.editorReducer.activeModel,
    // currentInput: state.editorReducer.currentRange,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setEditor: editor => dispatch(setEditor(editor)),
    getFileName: filename => dispatch(getFileName(filename)),
    setRange: range => dispatch(setRange(range)),
    setCoords: coords => dispatch(setCoords(coords)),
    getFileNames: filenames => dispatch(getFileNames(filenames)),
    setActiveModel: filename => dispatch(setActiveModel(filename)),
    addModels: models => dispatch(addModels(models)),
    setItemRange: (item, range, currComp) => dispatch(setItemRange(item, range, currComp)),
    setInputValue: (item, input, currComp) => dispatch(setInputValue(item, input, currComp)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

// export default Editor;
