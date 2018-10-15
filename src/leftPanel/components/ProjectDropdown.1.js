import React from 'react';
import PropTypes from 'prop-types';  // Allows us to TypeCheck our state models
import { connect } from "react-redux";
import {
  getContents,
  setProjectPath
} from '../../js/actions/leftPanelActions'

const fs = require("fs");
const {ipcRenderer} = require('electron');

// import ChangeHistory from '@material-ui/icons/change_history'


class ProjectDropdown extends React.Component {

  static displayName = 'ProjectDropdown';   // Used for error handling, dead code, to be removed in production

// SETTING STATE UP, STATIC & LOCAL ------------------------------------------------------

  // static propTypes = {  // STANDARD PROJECT-DROPDOWN FOLDER MODEL
  //   openDirection: PropTypes.oneOf(['down', 'right']), // Direction of dropdown caret
  //   displayText: PropTypes.string,  // Text displayed for element
  //   hasCaret: PropTypes.bool,  // Boolean that adds caret or not 
  //   options: PropTypes.arrayOf(PropTypes.shape(ProjectDropdown.shape)) // Array of submenu contents, file and folder names
  // };

  // static defaultProps = {  // Default props for every ProjectDropdown component, which is why it isn't explicitly required in propTypes
  //   hasCaret: true,
  //   openDirection: 'down'
  // };

  shape = {  // FILE MODEL
    id: PropTypes.string.isRequired,  // Unique id for each element
    name: PropTypes.string.isRequired,  // Name of file/folder
    path: PropTypes.string,  // Path of file or folder
    options: PropTypes.arrayOf(Prop.Type.shape(ProjectDropdown.shape).isRequired).isRequired  // Array of nested submenus
  };

  constructor(props) {  // [ISSUE] Props is not being passed down from parent component
    super(props);

    this.state = {  // Setting a local state per duplicate ProjectDropdown component
      selectedPath: this.props.selectedPath.payload,
      folderName: this.props.selectedPath.payload.replace(/^.*[\\\/]/, ""),
      showDropdown: false, // To toggle entire dropdown interface - use is questionable
      selectedIds: [],  // Array of submenus hovered over (loaded)
      toggleButton: true
    }
    this.printProps = this.printProps.bind(this);
  };

// STATE SET-UP BY THIS POINT  ------------------------------------------------------
// ----------------------------------------------------------------------------------
// SETTING UP RECURSIVE RENDER & STATE MANIPULATION FUNCTIONS -----------------------

  printProps() {
    console.log('ProjectDropdown props upon loading:', this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.options !== nextProps.options ||this.state.showDropdown !== nextState.showDropdown ||this.state.selectedIds !== nextState.selectedIds; 
  };

  handleDropdownToggle = () => {  // Flips the state of a dropdown from it's current state, erases interior ids
    let nextState = !this.state.showDropdown;

    this.setState({
      showDropdown: nextState,
      selectedIds: []
    })
  };

  handleDropdownClose = () => {  // Changes state, explicitely sets showDropdown to false, erases interior ids
    this.setState({
      showDropdown: false,
      selectedIds: []
    })
  };

  handleSelectedId = (selected, depthLevel) => {  // Resetting selectedIds to selected input at the set depth level
    return () => {
      const updatedArray = this.state.selectedIds.slice(0);  // Copying array, setting it to a copy of the previous content array

      updatedArray[depthLevel] = selected;  // Set selected dropdown and its options array to the dropdown's depthLevel

      this.setState({
        slectedIds: updatedArray
      })
    }
  };

  renderDisplay() {
    // const classes = classNames({
    //   'dropdown__dispay': true,
    //   'dropdown__display--with-caret': this.props.hasCaret  // non-existent props
    // })

    // <Icon 
    //     classes={ ['dropdown__display-caret'] }
    //     glyph={ iconChevronDown }
    //     size={ 'small' }
    //   />

    // Passes in above classes constant as className, renders a caret if applicable & the display name
    // return (  // [ISSUE] Add folder methods and link/path
    //   <div className={ classes }>
    //     { this.props.hasCaret ? caret : null }
    //     { this.props.displayText }
    //   </div>
    // )

    console.log('Props:', this.props)
    console.log('State:', this.state)

    return (
      <div>
        {  }
        { this.state.folderName }
      </div>
    )
  }

  // Recursive call to render subMenu's
  renderSubMenu(options, depthLevel = 0) {
    if (this.state.showDropdown !== true) {  // if the submenu has already been rendered, don't render it
      return null;
    } 

    const classes = ['dropdown__options'];
    classes.push(`dropdown__options--${this.props.openDirection}--align`);  // Adding direction of caret to classes constant above

    const menuOptions = options.map(option => {  // map through current options, options being the paths or names in/from the parent folder
      // option = current value in options array

      const display = (option.link  // [ISSUE] Need attached link to display if it's a folder
        ? <a href={ option.link }>{ option.name }</a>
        : <span>{ option.message }</span>
        );  // what we display in out map return, dynamically populated by options element properties

      let subMenu;  // Where we store recursive renders

      if ((this.state.selectedIds[depthLevel] === option.id) && hasOptions) {
          const newDepthLevel = depthLevel + 1;

          subMenu = this.renderSubMenu(option.options, newDepthLevel);  // We go into the array of contents the selected folder has, passing the next depthLevel as a base
      }

      return (
        <li
          key={ option.id }
          onMouseEnter={ this.handleSelectedId(option.id, depthLevel) }
        >
          { display }
          { subMenu }
        </li>
      );
    });

    return (
      <div className={ classNames.apply(null, classes) }>
        <ul>
          { menuOptions }
        </ul>
      </div>
    );
  }
  
// FUNCTIONS & METHODS SET-UP BY THIS POINT  ----------------------------------------
// ----------------------------------------------------------------------------------
// STANDARD RENDER FUNCTION ---------------------------------------------------------

  render() {
    return (
      <div
        onClick={ this.handleDropdownToggle }  // Sets toggle in state to false, clears cache of contents
      >
        { this.renderDisplay() }
      </div>
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


// return (
//   <div id='left-panel-container'>
//     { this.printProps() }
//     <input 
//       id='open-folder-button'
//       type='button' 
//       onClick={ this.printProps }
//       value='Open a Folder 2'
//     ></input>
//   </div>
// );


// render() {
//   return (
//     <div
//       className='dropdown dropdown--nested'
//       onClick={ this.handleDropdownToggle }  // Sets toggle in state to false, clears cache of contents
//     >
//       { this.renderDisplay() }
//       {/* { this.renderSubMenu(this.props.options) } */}
//     </div>
//   );
// }