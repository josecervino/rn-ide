import { SET_INPUT, SET_SELECTION } from '../actions/constants';

const initialInput = {
  alignItems: '',
  justifyContent: '',
  animating: '',
  size: '',
  color: '',
}
const initialState = {
  input: [],
  range: 9,
  selection: 'center',
};

const vizEditorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTION:
      // console.log('selection payload', action.payload);
      return {
        ...state,
        selection: action.payload,
      };
    default:
      return state;
  }
};

export default vizEditorReducer;
