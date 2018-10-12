import { combineReducers } from 'redux';
import editorReducer from './editorReducer';
import fileTreeReducer from './fileTreeReducer';
import vizEditorReducer from './vizEditorReducer';

export default combineReducers({
  editorReducer,
  vizEditorReducer,
  fileTreeReducer,
});
