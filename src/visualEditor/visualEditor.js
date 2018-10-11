import React, { Component } from "react";
import { connect } from "react-redux";
import * as monaco from "monaco-editor";

import { setInputValue, setSelection } from '../js/actions/vizEditorActions';
import { setRange } from '../js/actions/action';


class VisualEditor extends Component {

  constructor(props){
    super(props)
    this.onChangeAlignItems = this.onChangeAlignItems.bind(this);
    this.onChangeJustifyContent = this.onChangeJustifyContent.bind(this);
    this.onChangeAnimating = this.onChangeAnimating.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeSelection = this.onChangeSelection.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  componentDidMount(){

    // let selection =  this.props.editor.selection(1,1,1,9)

  }

  onChangeAlignItems (event) {
    this.changeText(event, 'alignItems')
    // console.log(this.props.range);
    // const range = { ...this.props.range.alignItems };
    // // let selection =  new monaco.Selection(this.props.range)
    // // console.log({selection});
    // // this.props.editor.setSelection(selection)
    // // console.log({event});
    // this.props.setInputValue(event.target.value);
    // // const range = {
    // //   startLineNumber: 1,
    // //   startColumn: 1,
    // //   endLineNumber: 1,
    // //   endColumn: 5,
    // // }
    // // range.startLineNumber = (event.target.value.length > 1 ? range.startLineNumber : (range.startLineNumber + this.props.coords.alignItems.lineStart))
    // // range.endLineNumber = (event.target.value.length > 1 ? range.endLineNumber : (range.endLineNumber + this.props.coords.alignItems.lineEnd));
    // // range.startColumn = (event.target.value.length > 1 ? range.startColumn : (range.startColumn + this.props.coords.alignItems.colStart));
    // // range.endColumn = (event.target.value.length > 1 ? range.endColumn : (range.endColumn + this.props.coords.alignItems.colEnd));
    //
    //
    // this.props.editor.executeEdits('input', [
    //   { range: range, text: event.target.value }
    // ]);
    // console.log({range});
    // const newRange = { ...range };
    // newRange.endColumn = (newRange.startColumn + event.target.value.length);
    // console.log({newRange});
    // const updatedRange = { ...this.props.range };
    // updatedRange.alignItems = newRange
    // this.props.setRange(updatedRange);
  }

  onChangeJustifyContent(event){
    this.changeText(event, 'justifyContent');
  }

  onChangeAnimating(event) {
    this.changeText(event, 'animating')
  }
  onChangeSize(event) {
    this.changeText(event, 'size')
  }

  onChangeColor(event) {
    this.changeText(event, 'color')
  }

  changeText (event, item){
    const range = { ...this.props.range[item] };
    // let selection =  new monaco.Selection(this.props.range)
    // console.log({selection});
    // this.props.editor.setSelection(selection)
    // console.log({event});
    this.props.setInputValue(item, event.target.value);
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
    const updatedRange = { ...this.props.range };
    updatedRange[item] = newRange
    this.props.setRange(updatedRange);
  }

  onChangeSelection (event) {
    this.props.setSelection(event.target.value);
    // console.log(this.props.selection);
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <p>
          Align:
        </p>
        <input
          type="text"
          onChange={this.onChangeAlignItems}
          value={this.props.alignVal}
        />
        <p>
          Justify:
        </p>
        <input
          type="text"
          onChange={this.onChangeJustifyContent}
          value={this.props.justifyContent}
        />
        <p>
          Animate:
        </p>
        <input
          type="text"
          onChange={this.onChangeAnimating}
          value={this.props.animating}
        />
        <p>
          Size:
        </p>
        <input
          type="text"
          onChange={this.onChangeSize}
          value={this.props.size}
        />
        <p>
          Color:
        </p>
        <input
          type="text"
          onChange={this.onChangeColor}
          value={this.props.color}
        />
        {/* <select value={this.props.selection} onChange={this.onChangeSelection}>
          <option value="center">Center</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select> */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    alignVal: state.vizEditorReducer.input.alignItems,
    justifyContent: state.vizEditorReducer.input.justifyContent,
    animating: state.vizEditorReducer.input.animating,
    size: state.vizEditorReducer.input.size,
    color: state.vizEditorReducer.input.color,
    editor: state.editorReducer.editor,
    range: state.editorReducer.currentRange,
    selection: state.vizEditorReducer.selection,
    coords: state.editorReducer.coords,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setInputValue: (item, input) => dispatch(setInputValue(item, input)),
    setRange: range => dispatch(setRange(range)),
    setSelection: selection => dispatch(setSelection(selection)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisualEditor);
