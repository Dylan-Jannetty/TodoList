import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/actionCreators';
import axios from 'axios';

class TodoForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
      axios.post('/api/v1/todos', {todo: {title: this.getTitle.value, description: this.getDescription.value}})
      .then(response => {
        this.props.dispatch(addTodo(response.data.id, response.data.title, response.data.description))
        this.getTitle.value = ''
        this.getDescription.value = ''
      })
      .catch(error => console.log(error))
  }  
    
  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="inputContainer">
          <input required className="taskInput" type="text" placeholder="Add a task" maxLength="50"
             ref={(input)=>this.getTitle = input} />
             
          <input className="taskInputDesc" type="text" placeholder="Add a description" maxLength="50"
            ref={(input)=>this.getDescription = input} />
          <button>Add Task</button>
        </form>  
      </div>
    );
  }
}

export default connect()(TodoForm)
