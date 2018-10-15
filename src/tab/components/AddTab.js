import React from "react";

export default function AddTab(props) {
  return (
    <nav className="tabi">
      <ul>
        <li>
          <a className="tab_name">
            <span className="tabName" onClick={props.onTabClick} >
              {props.name} 
            </span>
            <span className="closeX" onClick={props.onClick} >
              {props.close.props.children}
            </span>
          </a>
        </li>
      </ul>
    </nav>  
  );
}
