import React from "react";
import { connect } from "react-redux";
import { 
  getFileNames,
  deleteFileName,
  deleteModel,
  setActiveModel, 
  setEditor } from "../../js/actions/action";
import AddTab from "./AddTab";

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  onTabClick(filename) {
    let model = this.props.models[filename]
    this.props.setActiveModel(model)
    console.log('SWITCHED TABS: ACTIVE MODEL IS: ', this.props.activeModel);
  }

  handleClick(filename) {
    this.props.deleteFileName(filename)
    this.props.deleteModel(filename)

    // if closing the current tab
    if (filename === this.props.activeModel.uri.path) {
      // if current tab is the last tab - this seems brittle way to determine
     if (this.props.filenames.length === 1) {
        this.props.setActiveModel(null)
        // if there are other tabs open, reset model to some other, arbitrarily-chosen model
      } else {
        let firstModel = this.props.models[this.props.filenames[0]]
        // this is not actually setting - getting blank 
        this.props.setActiveModel(firstModel)
      }
    }
  }

  CloseIcon() {
    return <p id="close">&#10006;</p>;
  }   

  render() {
    let filenames = this.props.filenames;
    if (!filenames || filenames.length === 0) {
      return (
        <AddTab 
          name="filename" 
          close={this.CloseIcon()} 
          filepath="" 
        />
      )
    } else {
      return (
        <div className="tabContainer">
          {filenames.map((filename, index) => (
            <AddTab
              key={index}
              filepath={filename}
              name={filename.replace(/^.*[\\\/]/, "")}
              close={this.CloseIcon()}
              onClick={() => this.handleClick(filename)}
              onTabClick={() => this.onTabClick(filename)}
            />
          ))}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    editor: state.editorReducer.editor,
    filenames: state.editorReducer.filenames,
    models: state.editorReducer.models,
    activeModel: state.editorReducer.activeModel, 
    deleteModel: state.editorReducer.deleteModel,
    deleteFileName: state.editorReducer.deleteFileName,
    model: state.editorReducer.model
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditor: editor => dispatch(setEditor(editor)),
    getFileNames: filenames => dispatch(getFileNames(filenames)),
    deleteFileName: filename => dispatch(deleteFileName(filename)),
    setActiveModel: filename => dispatch(setActiveModel(filename)),
    deleteModel: filename => dispatch(deleteModel(filename))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab);

// export default Tab;
