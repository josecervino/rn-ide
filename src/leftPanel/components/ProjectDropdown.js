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
      showDropdown: false,
      toggleButton: true
    }
    this.handleDropdown = this.handleDropdown.bind(this);
    this.renderFolders = this.renderFolders.bind(this);
  };

  openFolder(currentPath, fileName) {
    console.log('inside openF');
    ipcRenderer.send('open-file-in-editor', currentPath, fileName);
  }

  handleDropdown(folderId) {
    console.log('inside handleDropdown')
    console.log(this.state.folderToggles[folderId])
    this.state.folderToggles[folderId] = !this.state.folderToggles[folderId];
    console.log(this.state.folderToggles[folderId])
  }

  renderSubFolders(folderPath, id = null) {
    let counter = 1;
    let options = this.props.pathContents ? this.props.pathContents : fs.readdirSync(folderPath); 

    const subFolderContents = options.map((option) => {
      let path = `${folderPath}/${option}`;
      counter += 1;

      if (fs.lstatSync(path).isFile()) {
        return (
          <ListItem button onClick={() => this.openFolder(path, option) } path={ path } name={ option }>
            <ListItemText inset primary={ option } />
          </ListItem>
        )
      }
      else {
        this.state.folderToggles[`${option}${counter}`] = false;
        let compId = `${option}${counter}`;
        return (
          <React.Fragment>
            <ListItem button id={ compId } onMouseOver={() => this.renderSubFolders(path, compId)} onClick={() => this.handleDropdown(compId)} path={ `${path}/`} name={ option }>
              <ListItemIcon>
                <ClosedFolder />
              </ListItemIcon>
              <ListItemText inset primary={ option } />
            </ListItem>
            { this.state.folderToggles[`${option}${counter}`] ? <ExpandLess/> : <ExpandMore /> }
              <Collapse in={ this.state.folderToggles[`${option}${counter}`] } timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button >
                    <ListItemText inset primary="FUCK YEAH BRO" />
                  </ListItem>
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
          subheadewir={<ListSubheader component="div"> RN-IDE </ListSubheader>}

          >
          { this.renderFolders() }
        </List>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedPath: state.leftPanelReducer.selectedPath,
    pathContents: state.leftPanelReducer.pathContents,
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
