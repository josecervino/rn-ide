import React from "react";
import { connect } from "react-redux";
import { getFileName } from "../../js/actions/action";

//pass the title props from the state into this component
function TabContainer(props) {
  return (
    <nav className="tabi">
      <ul>
        <li>
          <a>
            <span> place Holder</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
class Tab extends React.Component {
  render() {
    return (
      <div className="tabContainer">
        <TabContainer />
        <TabContainer />
        <TabContainer />
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log("state", state);

  console.log("filename", state.editorReducer.filename);
  return {
    editor: state.editorReducer.editor,
    filename: state.editorReducer.filename
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setEditor: editor => dispatch(setEditor(editor)),
    getFileName: filename => dispatch(getFileName(filename))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab);

// export default Tab;
