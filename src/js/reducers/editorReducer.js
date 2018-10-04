const initialState = {
    editor: 'Unloaded editor',
}


  const todos = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EDITOR':

        return {
          ...state,
          editor: action.payload
        }
      default:
        return state
    }}
  export default todos;
