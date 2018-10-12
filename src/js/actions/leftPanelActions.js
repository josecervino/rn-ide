import {
  GET_CONTENTS,
  SET_PROJECT_PATH
} from './constants';

export const getContents = path => ({
  type: GET_CONTENTS,
  payload: path
})

export const setProjectPath = path => ({
  type: SET_PROJECT_PATH,
  payload: path
})

