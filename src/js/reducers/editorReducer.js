const initialState = {
    newEditor:"no editor yet",
    nextTodoId: 0,
    editor: 'Unloaded editor'
}


  const todos = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TODO':
          return {
            ...state,
            nextTodoId: state.nextTodoId + 1,

          }
      case 'SET_EDITOR':

        return {
          ...state,
          editor: action.payload
        }
      default:
        return state
    }}
  export default todos;
