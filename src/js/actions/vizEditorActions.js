
import {
  SET_INPUT,
  SET_SELECTION,
} from './constants';

export const setInputValue = (item, input, currComp) => {
  // console.log({ input });
  console.log('currComp in setInputValue', currComp);
  return {
    type: SET_INPUT,
    item,
    currComp,
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
