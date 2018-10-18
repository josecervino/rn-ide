import React from "react";
import { connect } from "react-redux";
import { 
  getFileNames,
  deleteFileName,
  deleteModel,
  closeFile,
  setActiveModel, 
  setEditor } from "../../js/actions/action";
import AddTab from "./AddTab";

function CloseIcon() {
  return <p id="close">&#10006;</p>;
}   

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  onTabClick(filename) {
    let model = this.props.models[filename]
    this.props.setActiveModel(model)
  }

  handleClick(filename) {
    this.props.deleteFileName(filename) // this works properly
    this.props.deleteModel(filename) // this seems to be working

    let firstModel = this.props.models[this.props.filenames[0]]
    this.props.setActiveModel(firstModel)
    this.props.filenames ? this.props.setActiveModel(firstModel) : this.props.setActiveModel(null)
    
    // if closing the current tab
    if (filename === this.props.activeModel.uri.path) {
      if (!this.props.filenames.length) {
        this.props.setActiveModel(null)
      } else {
        let firstModel = this.props.models[this.props.filenames[0]]
        this.props.setActiveModel(firstModel)
        this.props.filenames ? this.props.setActiveModel(firstModel) : this.props.setActiveModel(null)
      }
    } else {
      let firstModel = this.props.models[this.props.filenames[0]]
        this.props.setActiveModel(firstModel)
        this.props.filenames ? this.props.setActiveModel(firstModel) : this.props.setActiveModel(null)
    }
  }

  render() {
    let filenames = this.props.filenames;
    if (!filenames || filenames.length === 0) {
      return (
        <AddTab
          name="filename"
          close={CloseIcon()}
          filepath=""
          allProps={this.props}
        />
      );
    } else {
      return (
        <div className="tabContainer">
          {filenames.map((filename, index) => (
            <AddTab
              key={index}
              filepath={filename}
              name={filename.replace(/^.*[\\\/]/, "")}
              close={CloseIcon()}
              allProps={this.props}
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
    closeFile: filename => dispatch(closeFile(filename)),
    setActiveModel: filename => dispatch(setActiveModel(filename)),
    deleteModel: filename => dispatch(deleteModel(filename))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab);

// export default Tab;
