const fs = require("fs");
const path = require("path");
const { shell } = require("electron");
const { dialog } = require("electron").remote;
const {ipcRenderer} = require('electron');

const initialState = {
  selectedPath: null,
  pathContents: null,
  folderName: null,
  id: null,
  name: null,
  path: null,
};

const leftPanelReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'GET_CONTENTS':
      let options = fs.readdirSync(action.payload);
      return {
        ...state,
        pathContents: options
      };
    
    case 'SET_PROJECT_PATH':
      return {
        ...state,
        selectedPath: action.payload.payload,
        folderName: action.payload.payload.replace(/^.*[\\\/]/, ""),
      }

    default:
      return state;
  }
};

export default leftPanelReducer;