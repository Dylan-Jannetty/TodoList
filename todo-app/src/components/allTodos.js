import React, { Component } from 'react';
import { loadTodos } from '../actions/actionCreators';
import { connect } from 'react-redux';
import axios from 'axios';

import Todo from './todo';
import EditTodo from './editTodo';

class AllTodos extends Component {
  
  getTodos() {
    axios.get('/api/v1/todos')
    .then(response => {
      this.props.dispatch(loadTodos(response.data));
    })
    .catch(error => console.log(error))
  }
  
  componentDidMount() {
    this.getTodos()
  }
  
  render(){
    return (
      <div>
        <h1>All Tasks</h1>
        {this.props.todos.map((todo)=> (
          <div key={todo.id}>
            <Todo key={todo.id} todo={todo} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(AllTodos);
