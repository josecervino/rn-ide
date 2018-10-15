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
  console.log('reached reducer')
  switch (action.type) {

    case 'GET_CONTENTS':
      // console.log('Inside GET_CONTENTS case');
      // console.log('GET_CONTENTS payload:', action.payload)
      let options = fs.readdirSync(action.payload);
      return {
        ...state,
        pathContents: options
      };
    
    case 'SET_PROJECT_PATH':
      // console.log('Inside SET_PROJECT_PATH case');
      console.log('SET_PROJECT_PATH payload:', action.payload.payload)
      return {
        ...state,
        selectedPath: action.payload.payload
      }

    default:
      return state;
  }
};

export default leftPanelReducer;