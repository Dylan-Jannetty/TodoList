import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/actionCreators';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';



class TodoForm extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showModal: false
    }
    this.close = () => {
      this.setState({ showModal: false })
    }
    
    this.open = () => {
      this.setState({ showModal: true })
    }
  }

  
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
    renderBackdrop(props) {
    return <div {...props} style={this.backdropStyle} />;
  }
    
  render(){
    
    const backdropStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#000',
      opacity: 0.5
    };
    const modalStyle = function() {
      // we use some psuedo random coords so nested modals
      // don't sit right on top of each other.

      return {
        position: 'fixed',
        width: 400,
        zIndex: 1040,
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20,
        height: 385,
        marginLeft: 670,
        marginTop: 300
      };
      

  };

    return (
      <div>
        <div className="createbuttonContain">
          <button className="createButton btn-info" onClick={this.open}>Create a Task!</button>
        </div>
        
        <Modal
          onHide={this.close}
          style={modalStyle()}
          aria-labelledby="modal-label"
          show={this.state.showModal}
          renderBackdrop={this.renderBackdrop}
          >
        <h1>Create Task</h1>  
        <form onSubmit={this.handleSubmit} className="inputContainer">
          <input required className="taskInput" type="text" placeholder="Add a task" maxLength="50"
             ref={(input)=>this.getTitle = input} />
             
          <input className="taskInputDesc" type="text" placeholder="Add a description" maxLength="50"
            ref={(input)=>this.getDescription = input} />
          <button>Add Task</button>
        </form>
        </Modal>  
      </div>
    );
  }
}

export default connect()(TodoForm)
