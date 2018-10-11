export const setEditor = editor => ({
  type: "SET_EDITOR",
  payload: editor
});

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

