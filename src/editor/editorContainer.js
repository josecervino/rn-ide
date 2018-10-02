import React from 'react';
import Editor from './components/Editor';

class EditorContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <p>This is the EditorContainer Component.</p>
        <Editor />
      </React.Fragment>
    )
  }
}

export default EditorContainer;