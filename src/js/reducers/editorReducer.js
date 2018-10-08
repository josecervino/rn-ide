import { SET_RANGE } from '../actions/constants';

const initialState = {
  editor: "Unloaded editor",
  filename: "",
  currentRange: 0,
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
    case SET_RANGE:
      return {
        ...state,
        currentRange: action.payload,
      };
    default:
      return state;
  }
};

export default todos;
