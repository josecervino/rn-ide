import React from 'react';
import { connect } from "react-redux";
import {
  getContents,
  setProjectPath
} from '../js/actions/leftPanelActions'

import ProjectDropdown from './components/ProjectDropdown';
import Button from '@material-ui/core/Button';

const { dialog } = require("electron").remote;

class LeftPanelContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  openFolder = () => {  // This probably shouldn't be here, all business logic is supposed to be in Redux. 
    dialog.showOpenDialog(
      {
        properties: ["openDirectory", "openFile", "multiSelections"]
      },
      selectedFiles => {
        let path = selectedFiles[0];

        if (!fs.lstatSync(path).isDirectory()) {
          let fileName = path.replace(/^.*[\\\/]/, "");
          ipcRenderer.send('open-file-in-editor', path, fileName);
        }
        else {
          // console.log('about to call getContents')
          this.props.getContents(path)
          // console.log('Props after .getContents, before setProjectPath:', this.props)
          this.props.setProjectPath(path) // Separated in case either needs to be used independently in the future
          // console.log('Props after getContents & setProjectPath:', this.props)
        }
      }
    )  // End of dialog box
  }

  render() {
    // console.log('About to render LeftPanelContainer', '|  Props:', this.props)
    if (this.props.selectedPath && this.props.pathContents.length >= 0) {
      return (
        <div id='left-panel-container'>
          <ProjectDropdown />
        </div>
      )
    }
    else {
      return (
        <div id='left-panel-container'>
          <Button 
            id='open-folder-button'
            variant="outlined" 
            color="primary" 
            onClick={ this.openFolder }
          >
            Open a Folder
          </Button>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    selectedPath: state.leftPanelReducer.selectedPath,
    pathContents: state.leftPanelReducer.pathContents
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getContents: (path) => dispatch(getContents(path)),
    setProjectPath: (path) => dispatch(setProjectPath(setProjectPath(path))),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPanelContainer);
