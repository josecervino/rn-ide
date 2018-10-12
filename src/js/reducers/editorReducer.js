let initialState = {
  editor: "Unloaded editor",
  filenames: [],
  models: {},
  activeModel: {}
};

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
      let activeModel = state.models[action.payload] || {}
      state.editor.setModel(activeModel)
      return {
        ...state,
        activeModel: activeModel
      };
      case 'ADD_MODELS':
      return {
        ...state,
        models: {...state.models, ...action.payload}
      }
    default:
      return state;
  }
};

export default editorReducer;
