// action
// let nextTodoId = 0

export const addTodo = text => (
  console.log("im action"),
  {
  type: 'ADD_TODO',
  // id: nextTodoId++,
  text
})

export const setEditor = editor => ({
  type: 'SET_EDITOR',
  payload: editor
})
// 
//
// export const monaco = () =>(
//   {
//
//   }
// )
