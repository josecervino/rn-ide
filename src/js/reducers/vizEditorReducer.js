import { SET_INPUT } from '../actions/constants';

const initialState = {
  input: '',
  range: 9,
};

const vizEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT:
      return {
        ...state,
        input: action.payload,
        range: action.payload.length,
      };
    default:
      return state;
  }
};

export default vizEditorReducer;
