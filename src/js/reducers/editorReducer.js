let initialState = {
  editor: "Unloaded editor",
  filename: []
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EDITOR":
    debugger; 
      return {
        ...state,
        editor: action.payload
      };

    case "SAVE_TEXT":
      debugger; 
      return {
        ...state,
        filename: [...state.filename, ...action.payload]
      };
    default:
      return state;
  }
};

export default todos;
