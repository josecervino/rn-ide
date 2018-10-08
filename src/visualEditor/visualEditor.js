import React, { Component } from "react";
import { connect } from "react-redux";
import * as monaco from "monaco-editor";

import { setInputValue } from '../js/actions/vizEditorActions';


class VisualEditor extends Component {

  constructor(props){
    super(props)
    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidMount(){

    // let selection =  this.props.editor.selection(1,1,1,9)

  }

  onChangeText (event) {
    let selection =  new monaco.Selection(1,1,1,this.props.range)
    console.log({selection});
    this.props.editor.setSelection(selection)
    console.log({event});
    this.props.setInputValue(event.target.value);
    // const range = {
    //   startLineNumber: 1,
    //   startColumn: 1,
    //   endLineNumber: 1,
    //   endColumn: 5,
    // }
    this.props.editor.executeEdits('input', [
     { range: new monaco.Range(1,1,1,(this.props.range + 1)), text: event.target.value }
   ]);


  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          onChange={this.onChangeText}
          value={this.props.inputVal}
          >

          </input>
        </div>
      )
    }
  }

  function mapStateToProps(state) {
    return {
      inputVal: state.vizEditorReducer.input,
      editor: state.editorReducer.editor,
      range: state.vizEditorReducer.range,
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      setInputValue: input => dispatch(setInputValue(input)),
    };
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(VisualEditor);