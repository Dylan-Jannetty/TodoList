import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateTodo } from '../actions/actionCreators';


class EditTodo extends Component {
  handleEdit = (e) => {
    e.preventDefault();
    axios.put(`/api/v1/todos/${this.props.todo.id}`, {todo: {title: this.newTitle.value , description: this.newDescription.value}})
    .then(response => {
      this.props.dispatch(updateTodo(response.data.id, response.data.title, response.data.description))
      this.newTitle.value = ''
      this.newDescription.value = ''
    })
  }
  
  render() {
    return (
      <div key={this.props.todo.id} className="post">
        <form className="form" onSubmit={this.handleEdit}>
          <input required type="text" ref={(input) => this.getTitle = input}
          defaultValue={this.props.todo.title} placeholder="Enter Post Title" /><br /><br />
          <textarea required rows="5" ref={(input) => this.getDescription = input}
          defaultValue={this.props.todo.description} cols="28" placeholder="Enter Post" /><br /><br />
          <button>Update</button>
        </form>
      </div>
    );
  }
  
}

export default connect()(EditTodo);