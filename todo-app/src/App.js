import React, { Component } from 'react';
import './App.css';
import AllTodos from './components/allTodos';
import TodoForm from './components/todoForm';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

library.add(faStroopwafel)

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <h1>Todo List</h1>
        </div>
        <TodoForm />
        <AllTodos />
      </div>
    );
  }
}

export default App;
