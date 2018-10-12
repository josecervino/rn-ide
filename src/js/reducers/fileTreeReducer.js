const initialState = {
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case "READ_FOLDERS":
      return {
        ...state,
        editor: action.payload
      };

    default:
      return state;
  }
};

export default todos;