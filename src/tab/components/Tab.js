import React from "react";
import { connect } from "react-redux";
import { getFileNames, setActiveModel, setEditor } from "../../js/actions/action";

//pass the title props from the state into this component
function TabContainer(props) {
  return (
    <nav className="tabi" onClick={props.onClick} >
      <ul>
        <li>
          <a>
            <span> {props.name} </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, filename) {
    this.props.setActiveModel(filename)
  }

  render() {
    let filenames = this.props.filenames;
    if (!filenames || filenames.length === 0) {
      return <TabContainer name="filenames" onClick={(e) => this.handleClick(e)} />;
    } else {
      return (
        <div className="tabContainer">
          {filenames.map((filename, index) => (
            <TabContainer
              key={index}
              name={filename.replace(/^.*[\\\/]/, "")}
              onClick={(e) => this.handleClick(e, filename)}
            />
          ))}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    editor: state.editorReducer.editor,
    filenames: state.editorReducer.filenames,
    activeModel: state.editorReducer.activeModel 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditor: editor => dispatch(setEditor(editor)),
    getFileNames: filenames => dispatch(getFileNames(filenames)),
    setActiveModel: filename => dispatch(setActiveModel(filename))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab);

// export default Tab;
