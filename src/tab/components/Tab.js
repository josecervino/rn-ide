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
            <span> {props.name}</span>
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

  handleClick() {
    console.log("click me");
  }
  render() {
    let filename = this.props.filename;
    if (!filename || filename.length === 0) {
      return <TabContainer name="filename" onclick={this.handleClick()} />;
    } else {
      return (
        <div className="tabContainer">
          {filename.map((ele, index) => (
            <TabContainer
              key={index}
              name={ele.replace(/^.*[\\\/]/, "")}
              onclick={this.handleClick()}
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
