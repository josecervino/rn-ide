const initialState = {
  editor: "Unloaded editor",
  filename: ""
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EDITOR":
      return {
        ...state,
        editor: action.payload
      };

    case "SAVE_TEXT":
      return {
        ...state,
        filename: action.payload
      };
    default:
      return state;
  }
};

export default todos;
