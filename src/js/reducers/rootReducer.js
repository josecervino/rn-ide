import { combineReducers } from 'redux';
import editorReducer from './editorReducer';
import leftPanelReducer from './leftPanelReducer';
import vizEditorReducer from './vizEditorReducer';

export default combineReducers({
  editorReducer,
  vizEditorReducer,
  leftPanelReducer,
});
