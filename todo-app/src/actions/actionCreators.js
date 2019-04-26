import { LOAD_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, UPDATE_TODO} from '../actions/actionTypes'

export function loadTodos(todos) {
  return { type: LOAD_TODOS, todos: todos }
}

export function addTodo(id, title, description) {
  return { type: ADD_TODO, id: id, title: title, description: description }
}

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id: id }
}

export function deleteTodo(id) {
  return { type: DELETE_TODO, id: id }
}

export function updateTodo(id, title, description) {
  return { type: UPDATE_TODO, title: title, description: description }
}
