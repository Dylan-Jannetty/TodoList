import React, { Component } from 'react';
import { deleteTodo, toggleTodo } from '../actions/actionCreators';
import { connect } from 'react-redux';
import EditTodo from './editTodo';
import axios from 'axios';
import Collapse from 'react-bootstrap/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      open: false
    };
  }
  deleteTodo = () => {
    axios.delete(`/api/v1/todos/${this.props.todo.id}`)
    .then(response => {
      this.props.dispatch(deleteTodo(this.props.todo.id))
    })
    .catch(error => console.log(error))
  }
  
  toggleEdit = (e, id) => {
    this.setState({
      editing: !this.state.editing
    })
  }
  
  
  render() {
    if (this.state.editing) {
      return (
       <EditTodo className="editTodoField" todo={this.props.todo} key={this.props.todo.id} />
      )
    }
    const { open } = this.state;
    return (
      <div className="taskContainer">
        <h2 className="taskTitle">{this.props.todo.title}</h2>
        <Collapse in={this.state.open}>
         <p className="taskDesc">{this.props.todo.description}</p>
        </Collapse>
        <div className="iconContainer">
          <FontAwesomeIcon onClick={()=> this.toggleEdit()} icon={faEdit} className="editIcon" />
          <FontAwesomeIcon onClick={()=> this.deleteTodo()} icon={faTrash} className="deleteIcon" />
          <FontAwesomeIcon onClick={()=> this.setState({ open: !open })} aria-expanded={open} icon={faInfoCircle} className="infoIcon" />
        </div>
      </div>
    );
  }
}



export default connect()(Todo);
