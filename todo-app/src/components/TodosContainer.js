import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadTodos, toggleTodo, deleteTodo, updateTodo } from '../actions/actionCreators'
import Collapse from 'react-bootstrap/Collapse'

class TodosContainer extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      isInEditMode: false,
      value: ''
    }
  }
  
  changeEditMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
  }

  updateComponentValue = (e, id) => {

    axios.put(`/api/v1/todos/${id}`, {todo: {title: e.target.title, description: e.target.description}})
    .then(response => {
      this.props.dispatch(updateTodo(response.data.id, response.data.title, response.data.description))
    })
    this.setState({
      isInEditMode: false,
    })
  }
  
  updateTodo = (e, id) => {
    axios.put(`/api/v1/todos/${id}`, {todo: {done: e.target.checked}})
    .then(response => {
      this.props.dispatch(toggleTodo(id))
    })
    .catch(error => console.log(error))
  }  


  
  render() {
    return (
      <div>     

      </div>
    )
  }
}

export default connect(mapStateToProps)(TodosContainer)
