import React, { Component } from 'react';
import { deleteTodo, toggleTodo } from '../actions/actionCreators';
import { connect } from 'react-redux';
import axios from 'axios';

class Todo extends Component {
  deleteTodo = () => {
    axios.delete(`/api/v1/todos/${this.props.todo.id}`)
    .then(response => {
      this.props.dispatch(deleteTodo(this.props.todo.id))
    })
    .catch(error => console.log(error))
  }
  
  toggleEdit = (e, id) => {
    this.props.dispatch(toggleTodo(id))
  }
  
  
  render() {
    return (
      <div>
        <h2>{this.props.todo.title}</h2>
        <p>{this.props.todo.description}</p>
        <div>
          <button onClick={()=> this.toggleEdit()}>Edit</button>
          <button onClick={()=> this.deleteTodo()}>Delete</button>
        </div>
      </div>
    );
  }
}

export default connect()(Todo);
