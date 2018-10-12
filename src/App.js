import React, { Component } from "react";
import "./App.css"; 
import LeftPanelContainer from './leftPanel/LeftPanelContainer';
import EditorContainer from './editor/editorContainer';
import VisualEditor from './visualEditor/VisualEditor';
import TabContainer from "./tab/TabContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="tab">
          <TabContainer />
        </div>

        <div className='gui'>
          <VisualEditor />
        </div>

        <div className='editor'>
          <EditorContainer />
        </div>

        <div className='left-panel'>
          <LeftPanelContainer />
        </div>

        <div className="footer">
          <p> Footer. </p>
        </div>

      </div>
    );
  }
}

export default App;
