import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateTodo } from '../actions/actionCreators';


class EditTodo extends Component {
  handleEdit = (e) => {

    axios.put(`/api/v1/todos/${this.props.todo.id}`, {todo: {title: this.newTitle.value , description: this.newDescription.value}})
    .then(response => {
      this.props.dispatch(updateTodo(response.data.id, response.data.title, response.data.description))
      this.newTitle.value = response.data.title
      this.newDescription.value = response.data.description
    })
  }
  
  render() {
    return (
      <div key={this.props.todo.id} className="post taskContainer">
        <form className="form" onSubmit={this.handleEdit}>
          <input className="taskTitle" required type="text" ref={(input) => this.newTitle = input}
          defaultValue={this.props.todo.title} placeholder="Enter Post Title" /><br /><br />
          <textarea className="taskDesc" rows="5" ref={(input) => this.newDescription = input}
          defaultValue={this.props.todo.description} cols="28" placeholder="Write notes of this task.." /><br /><br />
          <button>Update</button>
        </form>
      </div>
    );
  }
  
}

export default connect()(EditTodo);
