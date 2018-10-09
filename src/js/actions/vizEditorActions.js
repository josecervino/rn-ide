
import {
  SET_INPUT,
  SET_SELECTION,
} from './constants';

export const setInputValue = (item, input) => {
  console.log({ input });
  return {
    type: SET_INPUT,
    item,
    payload: input,
  };
};

export const setSelection = (selection) => {
  // console.log({ selection });
  return {
    type: SET_SELECTION,
    payload: selection,
  };
};
