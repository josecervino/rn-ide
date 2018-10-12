import {
  SET_RANGE,
  SET_COORDS,
  SET_ITEM_RANGE,
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
})

export const getFileNames = filenames => ({
  type: "GET_FILE_NAMES",
  payload: filenames
});

export const setActiveModel = filename => ({
  type: "SET_ACTIVE_MODEL",
  payload: filename
});

export const addModels = models => ({
  type: "ADD_MODELS",
  payload: models
});

export const setItemRange = (item, range) => ({
  type: SET_ITEM_RANGE,
  item,
  payload: range,
});
