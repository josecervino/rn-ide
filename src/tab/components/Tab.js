import React from "react";
import { connect } from "react-redux";
import { getFileName } from "../../js/actions/action";
import { func } from "prop-types";

function CloseIcon() {
  return <p id="close">&#10006;</p>;
}

function removeTab(filepath) {
  if (filepath === "") {
    console.log("empty path");
  } else {
    console.log("remove tab", filepath);
  }
}
function TabContainer(props) {
  return (
    <nav className="tabi">
      <ul>
        <li>
          <a className="tab_name">
            <span className="tabName">{props.name}</span>
            <span
              className="closeX"
              onClick={() => {
                if (props.filepath === "") {
                  console.log("empty path");
                } else {
                  console.log("remove tab", props.filepath);
                }
              }}
            >
              {props.close.props.children}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

class Tab extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let filename = this.props.filename;
    if (!filename || filename.length === 0) {
      return (
        <TabContainer name="filename" close={CloseIcon()} filepath="" id="x" />
      );
    } else {
      return (
        <div className="tabContainer">
          {filename.map((ele, index) => (
            <TabContainer
              key={index}
              filepath={ele}
              name={ele.replace(/^.*[\\\/]/, "")}
              close={CloseIcon()}
            />
          ))}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    // reduxState: state,
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
