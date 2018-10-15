import React from "react";
// import { RemoveTab } from "./RemoveTab";

function removeTab(filepath, closeFile) {
  console.log("filename", filepath);
  closeFile(filepath);
  console.log("running");
}

export default function AddTab(props) {
  // console.log("mad props", props);

  return (
    <nav className="tabi">
      <ul>
        <li>
          <a className="tab_name">
            <span className="tabName">{props.name}</span>
            <span
              className="closeX"
              onClick={() => {
                removeTab(props.filepath, props.allProps.closeFile);
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
