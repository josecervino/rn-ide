import React from 'react';
import PropTypes from 'prop-types';  // Allows us to TypeCheck our state models
import { connect } from "react-redux";
import {
  getContents,
  setProjectPath
} from '../../js/actions/leftPanelActions'

const {ipcRenderer} = require('electron');

import { withStyles } from '@material-ui/core/styles';  // Exported with component using a created "styles" variable to apply to the component
import ListSubheader from '@material-ui/core/ListSubheader';  // Adds a title to the top of the menu
import List from '@material-ui/core/List';  // "div" of the entire list component
import ListItem from '@material-ui/core/ListItem';  // "div" for individual list items within component
import ListItemIcon from '@material-ui/core/ListItemIcon';  // "div" for selected icon to use for the menu
import ListItemText from '@material-ui/core/ListItemText';  // Designates text you want to add for the list item
import Collapse from '@material-ui/core/Collapse';  // Nested List functionality
import ClosedFolder from '@material-ui/icons/Folder';  // Imported Closed Folder icon
import OpenFolder from '@material-ui/icons/FolderOpen';  // Imported Open Folder Icon
import Menu from '@material-ui/icons/MoreHoriz';  // Menu button for files & folders
import ExpandLess from '@material-ui/icons/MoreHoriz';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { promisify } from 'util';
import { worker } from 'cluster';


class ProjectDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folderToggles: {},
      folderContents: {},
      showDropdown: false,
      toggleButton: true
    }
    this.handleDropdown = this.handleDropdown.bind(this);
    this.renderSubFolders = this.renderSubFolders.bind(this);
  };

  openFile(currentPath, fileName) {
    ipcRenderer.send('open-file-in-editor', currentPath, fileName);
  }

  handleDropdown(path, folderId) {
    this.state.folderToggles[folderId] = !this.state.folderToggles[folderId];
    console.log('folder toggle:', this.state.folderToggles);

    let folderContents = this.renderSubFolders(path, folderId);
    let folder = Document.getElementById(folderId).append;
    // console.log(folderContents, folder)
    folder.innerHTML = folder.innerHTML + folderContents;  // not working, shouldn't be doing it this way
  }

  renderSubFolders(folderPath = this.props.selectedPath, id = null) {
    let counter = 1;
    let options;

    if (folderPath === this.props.selectedPath) {
      options = this.props.pathContents;
    }
    else {
      options = fs.readdirSync(folderPath);
    }

    console.log(options);

    const subFolderContents = options.map((option) => {

      let path = `${folderPath}/${option}`;
      counter += 1;

      if (fs.lstatSync(path).isFile()) {
        return (
          <ListItem button onClick={() => this.openFile(path, option) } path={ path } name={ option }>
            <ListItemText primary={ option } />
          </ListItem>
        )
      }
      else {
        this.state.folderToggles[`${option}${counter}`] = false;
        let compId = `${option}${counter}`;
        return (
          <React.Fragment>
            <ListItem button 
              id={ compId } 
              onClick={() => this.handleDropdown(compId)} 
              path={ `${path}/`} 
              name={ option }
            >
              <ListItemIcon>
                <ClosedFolder />
              </ListItemIcon>
              <ListItemText inset primary={ option } />
            </ListItem> 
            <Collapse 
              in={ this.state.folderToggles[`${option}${counter}`] } 
              timeout="auto" 
              unmountOnExit
            >
              <List component='div' id={ `${compId}-2` } disablePadding>
              </List>
            </Collapse>

          </React.Fragment>
        )
      }
    });

    return (
      <React.Fragment>
        { subFolderContents }
      </React.Fragment>
    )
  }

  render() {
    return (
        <List          
          component="nav"
          subheader={<ListSubheader component="div"> { this.props.folderName } </ListSubheader>}
        >
          { this.renderSubFolders() }
        </List>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedPath: state.leftPanelReducer.selectedPath,
    pathContents: state.leftPanelReducer.pathContents,
    folderName: state.leftPanelReducer.folderName
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setProjectPath: (path) => dispatch(setProjectPath(setProjectPath(path))),
    getContents: (path) => dispatch(getContents(path)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDropdown);
