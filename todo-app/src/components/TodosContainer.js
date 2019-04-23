import React, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { loadTodos, addTodo, toggleTodo, deleteTodo, updateTodo } from '../actions/actionCreators'
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
  
  getTodos() {
    axios.get('/api/v1/todos')
    .then(response => {
      this.props.dispatch(loadTodos(response.data));
    })
    .catch(error => console.log(error))
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
  
  createTodo = (e) => {
    if (e.key === 'Enter' && !(this.getTitle.value === '')) {
      axios.post('/api/v1/todos', {todo: {title: this.getTitle.value, description: this.getDescription.value}})
      .then(response => {
        this.props.dispatch(addTodo(response.data.id, response.data.title, response.data.description))
        this.getTitle.value = ''
        this.getDescription.value = ''
      })
      .catch(error => console.log(error))
    }
  }
  
  
  updateTodo = (e, id) => {
    axios.put(`/api/v1/todos/${id}`, {todo: {done: e.target.checked}})
    .then(response => {
      this.props.dispatch(toggleTodo(id))
    })
    .catch(error => console.log(error))
  }
  

  
  deleteTodo = (id) => {
    axios.delete(`/api/v1/todos/${id}`)
    .then(response => {
      this.props.dispatch(deleteTodo(id))
    })
    .catch(error => console.log(error))
  }
  
  componentDidMount() {
    this.getTodos()
  }

  
  render() {
    const {open} = this.state;
    return (
      <div>
        <div className="inputContainer">
          <input className="taskInput" type="text" placeholder="Add a task" maxLength="50"
             ref={(input)=>this.getTitle = input} onKeyPress={this.createTodo} />
             
          <input className="taskInputDesc" type="text" placeholder="Add a description" maxLength="50"
            ref={(input)=>this.getDescription = input} onKeyPress={this.createTodo} />
        </div>     
      
        
        <div className="listWrapper">
          <ul className="taskList">
            {this.props.todos.map((todo) => {
              return(
                <div className="accordion" id="accordionExample" key={todo.id}>
                  <div className="card">
                    <div className="card-header" id="headingOne">
                      <h2 className="mb-0">
                      <input className="taskCheckbox" type="checkbox" 
                        checked={todo.done} onChange={(e) => this.updateTodo(e, todo.id)} /> 
                        {this.state.isInEditMode ? 
                          <div>
                            <input type="text" defaultValue={todo.title} ref="theTextInput"/>
                          </div> :
                        <button onClick={() => this.setState({ open: !open })} className="btn btn-link" key={todo.id} id={todo.id} type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded={open} aria-controls="collapseOne">
                          {todo.title}
                        </button>
                      }
                      <div>
                        <span className="deleteTaskBtn" onClick={(e) => this.deleteTodo(todo.id)}>
                          x
                        </span>
                        {this.state.isInEditMode ? 
                        <button onClick={this.updateComponentValue} onChange={(e) => this.updateComponentValue(e, todo.id)}>Save</button>
                        :
                        <button onClick={this.changeEditMode}>Edit</button>
                        }
                      </div>
                      </h2>
                    </div>         
                    <Collapse in={this.state.open}>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    {this.state.isInEditMode ? 
                      <div>
                        <input type="text" defaultValue={todo.description} ref="theTextInput"/>
                      </div>
                      :
                      <div className="card-body">
                        {todo.description}
                      </div>
                    }
                    </div>
                    </Collapse>
            
                  </div>
                </div>
              )       
            })}        
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodosContainer)
