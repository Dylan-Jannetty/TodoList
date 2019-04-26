import { LOAD_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, UPDATE_TODO} from '../actions/actionTypes'

function todosReducer(state = [], action)
{
  switch(action.type) {
    case LOAD_TODOS:
      return action.todos;
    
    case UPDATE_TODO:
      return state.map((todo) => {
        if(todo.id === action.id) {
          return {
            ...todo,
            title: action.data.newTitle,
            description: action.data.newDescription,
            editing: !todo.editing
          }
        } else return todo
      });

    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          description: action.description,
          editing: false
        }
      ];
      
      case TOGGLE_TODO:
        return state.map((todo) => (todo.id === action.index)
          ? {...todo, editing: !todo.editing}
          : todo
      );
      
      case DELETE_TODO:
        return state.filter((todo) => todo.id !== action.id);
        
        default:
          return state;
  }
}

export default todosReducer
