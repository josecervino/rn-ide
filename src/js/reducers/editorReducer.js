import { SET_RANGE, SET_COORDS } from '../actions/constants';
import { clearScreenDown } from 'readline';

const initialState = {
  editor: 'Unloaded editor',
  filenames: [],
  models: {},
  activeModel: {},
  currentRange: 0,
  coords: {}
};
``
const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EDITOR':
      return {
        ...state,
        editor: action.payload
      };
    case 'GET_FILE_NAMES':
      return {
        ...state,
        filenames: [...state.filenames, ...action.payload]
      };
    case 'SET_ACTIVE_MODEL':
      state.editor.setModel(action.payload)
      return {
        ...state,
        activeModel: action.payload
      };
    case 'SAVE_TEXT':
      return {
        ...state,
        filename: [...state.filename, action.payload]
      };
    case 'SET_RANGE':
      return {
        ...state,
        currentRange: action.payload
      };
    case 'SET_COORDS':
      return {
        ...state,
        coords: action.payload
      };
    case 'DELETE_FILE_NAME':
      let filenamesMinusOne = [...state.filenames]

      filenamesMinusOne = filenamesMinusOne.filter((filename) => {
        return filename !== action.payload
      })
      return {
        ...state,
        filenames: filenamesMinusOne
      };
    case 'ADD_MODELS':
      return {
        ...state,
        models: {...state.models, ...action.payload}
      };
    case 'DELETE_MODEL':
      let modelsMinusOne = {...state.models}
      delete modelsMinusOne[action.payload]
      return {
          ...state,
          models: modelsMinusOne
      };
    default:
      return state;
  }
};

export default editorReducer;
