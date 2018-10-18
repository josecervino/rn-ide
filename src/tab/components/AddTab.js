import React from "react";
import * as monaco from "monaco-editor";

function removeTab(filepath, closeFile, allProps) {
  closeFile(filepath); // delete filename and model
  
  let stateModelToDelete = allProps.models[filepath]
  let allModels = monaco.editor.getModels() 

  // find model to be deleted from non-state monaco editor
  // and dispose 
  let monacoModelToDelete = allModels.find(model => {
    return model === stateModelToDelete
  })

  monacoModelToDelete.dispose()

  // if closing current tab 
  if (filepath === allProps.activeModel.uri.path) {
    // check if last tab aka filenames.length === 1 
    if (allProps.filenames.length === 1) {
      allProps.editor.setModel(null)

    } else { // if more than one tab is open 
      let allModels = allProps.models 
      let randomModel;
      for (let key in allProps.models) {
        if (key != filepath) randomModel = allModels[key]
        else randomModel = null
      }

      if (randomModel) {
        allProps.setActiveModel(randomModel)
        allProps.editor.setModel(randomModel)
      }
    }
  }
}

export default function AddTab(props) {
  console.log("mad props", props);

  return (
    <nav className="tabi">
      <ul>
        <li>
          <a className="tab_name">

            <span className="tabName" onClick={props.onTabClick} >
              {props.name}
            </span>
            <span
              className="closeX"
              onClick={() => {
                removeTab(props.filepath, props.allProps.closeFile, props.allProps);
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
