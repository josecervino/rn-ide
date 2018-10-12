import {
  SET_RANGE,
  SET_COORDS,
} from './constants';

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

export const setCoords = coords => ({
  type: SET_COORDS,
  payload: coords,
});
