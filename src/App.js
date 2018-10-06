import React, { Component } from "react";
import "./App.css";
import TreeContainer from "./filetree/TreeContainer";
import EditorContainer from "./editor/editorContainer";
import TabContainer from "./tab/TabContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="tab">
          <TabContainer />
        </div>

        <div className="editor">
          <EditorContainer />
        </div>

        <div className="tree">
          <TreeContainer />
        </div>

        <div className="footer">
          <p> Footer. </p>
        </div>
      </div>
    );
  }
}

export default App;
