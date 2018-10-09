import React from "react";
import * as monaco from "monaco-editor";
const fs = window.require("fs");
const { ipcRenderer, dialog } = require("electron");

import { connect } from "react-redux";
import {
  getFileName,
  setEditor,
  setRange,
  setCoords
} from "../../js/actions/action";

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

class Editor extends React.Component {
  constructor (props){
    super(props)
    this.getRange = this.getRange.bind(this);
  }
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
        fontSize: 14,
        automaticLayout: true
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
      // for (let i = 0; i < text.length; i++){
      const space = '\t'
      const offset = space.repeat(range.startColumn);
      const endOffSet = space.repeat(range.startColumn - 1);
      const text = `<ActivityIndicatorIOS\n${offset}style={{\n${offset}alignItems: 'center',\n${offset}justifyContent: 'center',\n${offset}}}\n${offset}animating={true}\n${offset}size={'small'}\n${offset}color={'black'}\n${endOffSet}/>`
      const coord = {
        alignItems: { lineStart: 2, lineEnd: 2, colStart: 14, colEnd: 20 },
        justifyContent: { lineStart: 3, lineEnd: 3, colStart: 18, colEnd: 24 },
        animating: { lineStart: 5, lineEnd: 5, colStart: 12, colEnd: 16 },
        size: { lineStart: 6, lineEnd: 6, colStart: 8, colEnd: 13 },
        color: { lineStart: 7, lineEnd: 7, colStart: 9, colEnd: 14 },
      };
      this.props.setCoords(coord);
      // console.log({range});
      let id = { major: 1, minor: 1 };
      // const newRange =  new monaco.Range(
      //   range.startLineNumber + i,
      //   (range.startColumn),
      //   range.endLineNumber + i,
      //   (range.endColumn),
      // )
      let op = {
        identifier: id,
        range,
        text: text,
        forceMoveMarkers: true
      };
      // console.log({newRange});
      console.log({op});

      // this.props.setCoords(coord);
      monacoEditor.executeEdits("my-source", [op]);

      // range.startLineNumber = (range.startLineNumber + this.props.coords.alignItems.lineStart)
      // range.endLineNumber = (range.endLineNumber + this.props.coords.alignItems.lineEnd);
      // range.startColumn = (range.startColumn + this.props.coords.alignItems.colStart);
      // range.endColumn = (range.endColumn + this.props.coords.alignItems.colEnd);
      const updatedRange = this.getRange(range, coord)
      this.props.setRange(updatedRange);
    // }
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

  getRange (inputRange, coordinates) {
    const newRange = {}
    for (let item in coordinates){
      const range = { ...inputRange };
      range.startLineNumber = (range.startLineNumber + coordinates[item].lineStart)
      range.endLineNumber = (range.endLineNumber + coordinates[item].lineEnd);
      range.startColumn = (range.startColumn + coordinates[item].colStart);
      range.endColumn = (range.endColumn + coordinates[item].colEnd);
      newRange[item] = range;
    }
    return newRange;
  }

  render() {
    // console.log('editor', this.props.editor);
    return <div id="editor-container" />;
  }
}

function mapStateToProps(state) {
  return {
    editor: state.editorReducer.editor,
    filename: state.editorReducer.filename,
    range: state.editorReducer.currentRange,
    coords: state.editorReducer.coords,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setEditor: editor => dispatch(setEditor(editor)),
    getFileName: filename => dispatch(getFileName(filename)),
    setRange: range => dispatch(setRange(range)),
    setCoords: coords => dispatch(setCoords(coords))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);

// export default Editor;
