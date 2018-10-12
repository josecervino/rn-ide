import React from "react";
// import { RemoveTab } from "./RemoveTab";

function removeTab(filename) {
  console.log("filename", filename);
}
export default function AddTab(props) {
  console.log("mad props", props);

  return (
    <nav className="tabi">
      <ul>
        <li>
          <a className="tab_name">
            <span className="tabName">{props.name}</span>
            <span
              className="closeX"
              onClick={() => {
                removeTab(props.name);
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
