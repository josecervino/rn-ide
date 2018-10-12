import {
  SET_RANGE,
  SET_COORDS,
  SET_ITEM_RANGE,
} from '../actions/constants';

const initialState = {
  editor: 'Unloaded editor',
  filename: '',
  currentRange: 0,
  coords: {},
  editor: "Unloaded editor",
  filenames: [],
  models: {},
  activeModel: {}
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EDITOR":
      return {
        ...state,
        editor: action.payload
      };
    case "GET_FILE_NAMES":
      return {
        ...state,
        filenames: [...state.filenames, ...action.payload]
      };
    case "SET_ACTIVE_MODEL":
      console.log('active model set');
      let index =  state.filenames.indexOf(action.payload)
      let activeModel = state.models[index] || {}
      state.editor.setModel(activeModel)
      return {
        ...state,
        activeModel: activeModel
      };
    case SET_RANGE:
      return {
        ...state,
        currentRange: action.payload,
      };
    case SET_COORDS:
      return {
        ...state,
        coords: action.payload,
      };
    case 'ADD_MODELS':
      return {
        ...state,
        models: { ...state.models, ...action.payload },
      };
    case SET_ITEM_RANGE: {
      const newState = { ...state };
      newState.currentRange[action.item].range = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default editorReducer;
