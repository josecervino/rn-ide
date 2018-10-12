import React, { Component } from "react";
import "./App.css"; 
import LeftPanelContainer from './leftPanel/LeftPanelContainer';
import EditorContainer from './editor/editorContainer';


class App extends Component {
  render() {
    return (
      <div className="App">

        <div className='editor'>
          <EditorContainer />
        </div>

        <div className='left-panel'>
          <LeftPanelContainer />
        </div>

        <div className='footer'>
          <p> Footer. </p>
        </div>
      </div>
    );
  }
}

export default App;
