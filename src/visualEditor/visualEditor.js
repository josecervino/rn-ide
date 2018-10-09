import React, { Component } from "react";
import { connect } from "react-redux";
import * as monaco from "monaco-editor";

import { setInputValue, setSelection } from '../js/actions/vizEditorActions';
import { setRange } from '../js/actions/action';


class VisualEditor extends Component {

  constructor(props){
    super(props)
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);
  }

  componentDidMount(){

    // let selection =  this.props.editor.selection(1,1,1,9)

  }

  onChangeText (event) {
    // console.log(this.props.range);
    const range = { ...this.props.range };
    // let selection =  new monaco.Selection(this.props.range)
    // console.log({selection});
    // this.props.editor.setSelection(selection)
    // console.log({event});
    this.props.setInputValue(event.target.value);
    // const range = {
    //   startLineNumber: 1,
    //   startColumn: 1,
    //   endLineNumber: 1,
    //   endColumn: 5,
    // }
    // range.startLineNumber = (event.target.value.length > 1 ? range.startLineNumber : (range.startLineNumber + this.props.coords.alignItems.lineStart))
    // range.endLineNumber = (event.target.value.length > 1 ? range.endLineNumber : (range.endLineNumber + this.props.coords.alignItems.lineEnd));
    // range.startColumn = (event.target.value.length > 1 ? range.startColumn : (range.startColumn + this.props.coords.alignItems.colStart));
    // range.endColumn = (event.target.value.length > 1 ? range.endColumn : (range.endColumn + this.props.coords.alignItems.colEnd));


    this.props.editor.executeEdits('input', [
      { range: range, text: event.target.value }
    ]);
    console.log({range});
    const newRange = { ...range };
    newRange.endColumn = (newRange.startColumn + event.target.value.length);
    console.log({newRange});
    this.props.setRange(newRange);
  }

  onChangeSelection (event) {
    this.props.setSelection(event.target.value);
    // console.log(this.props.selection);
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          onChange={this.onChangeText}
          value={this.props.inputVal}
        />
        <select value={this.props.selection} onChange={this.onChangeSelection}>
          <option value="center">Center</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    inputVal: state.vizEditorReducer.input,
    editor: state.editorReducer.editor,
    range: state.editorReducer.currentRange,
    selection: state.vizEditorReducer.selection,
    coords: state.editorReducer.coords,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setInputValue: input => dispatch(setInputValue(input)),
    setRange: range => dispatch(setRange(range)),
    setSelection: selection => dispatch(setSelection(selection)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualEditor);
