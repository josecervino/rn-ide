import { SET_RANGE, SET_COORDS } from "./constants";

export const setEditor = editor => ({
  type: 'SET_EDITOR',
  payload: editor
});

export const getFileNames = filenames => ({
  type: 'GET_FILE_NAMES',
  payload: filenames
});

export const deleteFileName = filename => ({
  type: 'DELETE_FILE_NAME',
  payload: filename
});

export const setActiveModel = filename => ({ 
  type: 'SET_ACTIVE_MODEL', 
  payload: filename 
}); 

export const addModels = models => ({ 
  type: 'ADD_MODELS', 
  payload: models 
}); 

export const deleteModel = filename => ({ 
  type: 'DELETE_MODEL', 
  payload: filename 
}); 

export const setRange = range => ({
  type: 'SET_RANGE',
  payload: range
});

export const setCoords = coords => ({
  type: 'SET_COORDS',
  payload: coords
});
