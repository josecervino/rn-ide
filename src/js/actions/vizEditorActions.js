
import {
  SET_INPUT,
} from './constants';

export const setInputValue = input => {
  console.log({input});
  return {
    type: SET_INPUT,
    payload: input,
}
};
