import React, { Component } from 'react';
import { loadTodos } from '../actions/actionCreators';
import { connect } from 'react-redux';
import axios from 'axios';
import kermit from '../images/kermit.jpg';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

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
    if(this.props.todos.length < 1) {
      return(
        <div className="noTasks">
          <div className="noTasksContain">
            <div className="noTaskText">You probably have some stuff to do..</div>
            <br />
            <img className="kermit" src={kermit} alt="kermit" />
          </div>
        </div>
      )
    }
    return (
      <div>
      <TransitionGroup className="allTodoContain">
          {this.props.todos.map((todo)=> (
            <CSSTransition key={todo.id} timeout={500} classNames="todo">
              <div key={todo.id}>
                 <Todo key={todo.id} todo={todo} />
              </div>
            </CSSTransition>
          ))}
          </TransitionGroup>
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
