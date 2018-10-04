import { combineReducers } from 'redux';
import editorReducer from './editorReducer';
import fileTreeReducer from './fileTreeReducer';

export default combineReducers({
  editorReducer,
  fileTreeReducer
});
