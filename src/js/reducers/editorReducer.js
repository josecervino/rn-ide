import { SET_RANGE, SET_COORDS } from "../actions/constants";
import { element } from "prop-types";

const initialState = {
  editor: "Unloaded editor",
  filename: [],
  currentRange: 0,
  coords: {}
};

const todos = (state = initialState, action) => {
  console.log(state);

  switch (action.type) {
    case "SET_EDITOR":
      return {
        ...state,
        editor: action.payload
      };

    case "SAVE_TEXT":
      return {
        ...state,
        filename: [...state.filename, action.payload]
      };
    case SET_RANGE:
      return {
        ...state,
        currentRange: action.payload
      };
    case SET_COORDS:
      return {
        ...state,
        coords: action.payload
      };
    case "CLOSE_FILE":
      const newState = { ...state };
      console.log("previous state", newState);

      newState.filename = newState.filename.filter(
        element => element !== action.payload
      );
      console.log("state after click", newState);

      return newState;
    //loop through the file and delete the filename(via path) and model
    default:
      return state;
  }
};

export default todos;
