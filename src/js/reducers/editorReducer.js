let initialState = {
  editor: "Unloaded editor",
  filenames: [],
  models: {},
  activeModel: {}
};

const editorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EDITOR":
    // debugger; 
      return {
        ...state,
        editor: action.payload
      };
    case "GET_FILE_NAMES":
      // debugger; 
      return {
        ...state,
        filenames: [...state.filenames, ...action.payload]
      };
    case "SET_ACTIVE_MODEL":
      // debugger;
      return {
        ...state,
        activeModel: state.models[action.payload]
      };
    case "ADD_MODEL":
      return {
        ...state,
        models: action.payload 
      }
    default:
      return state;
  }
};

export default editorReducer;
