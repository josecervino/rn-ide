import React from 'react';
import ProjectDropdown from './components/ProjectDropdown';
// import FileRenderer from '../../public/renderer/renderer'

//  IMPORTED FROM RENDERER.JS  -----------------
const fs = require("fs");
// const path = require("path");
const { shell } = require("electron");
const { dialog } = require("electron").remote;
const {ipcRenderer} = require('electron');
//----------------------------------------------

class LeftPanelContainer extends React.Component {
  render() {
    return (
      <div id='left-panel-container'>
        <ProjectDropdown />
      </div>
    )
  }
}

export default LeftPanelContainer;