import { SET_RANGE } from './constants'

export const setEditor = editor => ({
  type: 'SET_EDITOR',
  payload: editor,
});

export const getFileName = filename => ({
  type: 'SAVE_TEXT',
  payload: filename,
});

export const setRange = range => ({
  type: SET_RANGE,
  payload: range,
});
