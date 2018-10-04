import React from 'react';
import Tree from './components/Tree';
import FileRenderer from '../../public/renderer/renderer'

// Add an ipcRenderer.on('open-button-clicked')

class TreeContainer extends React.Component {
  render() {
    return (
      <div>
        <div id="listed-files"></div>
	      <div id="display-files"></div>
        <input type="button" id="btn-updatefile" value="update file" onClick= {FileRenderer.userFile} />
      </div>
    )
  }
}

export default TreeContainer;