import React from "react";
import { connect } from "react-redux";
import { getFileName, closeFile } from "../../js/actions/action";
import AddTab from "./AddTab";

function CloseIcon() {
  return <p id="close">&#10006;</p>;
}

function removeTab(filename) {
  // closeFile();
  // console.log("filename", filename);
}

// function AddTab(props) {
//   console.log("mad props", props);

//   return (
//     <nav className="tabi">
//       <ul>
//         <li>
//           <a className="tab_name">
//             <span className="tabName">{props.name}</span>
//             <span
//               className="closeX"
//               onClick={() => {
//                 removeTab(props.name);
//               }}
//             >
//               {props.close.props.children}
//             </span>
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// }

class Tab extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("tab props", this.props);

    let filename = this.props.filename;
    if (!filename || filename.length === 0) {
      return <AddTab name="filename" close={CloseIcon()} filepath="" />;
    } else {
      return (
        <div className="tabContainer">
          {filename.map((ele, index) => (
            <AddTab
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
    filename: state.editorReducer.filename,
    closeFile: state.editorReducer.closeFile,
    model: state.editorReducer.model
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getFileName: filename => dispatch(getFileName(filename)),
    closeFile: filename => dispatch(closeFile(filename))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tab);

// export default Tab;
