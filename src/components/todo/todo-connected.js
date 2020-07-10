import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './todo.scss';

const todoAPI = 'https://todo-app-server-lab32.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    axios({
      method: 'post',
      url: todoAPI,
      headers: { 'Content-Type': 'application/json' },
      data: item,
    })
      .then(response => response.data)
      .then(postData => {
        setList([...list, postData]);
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      let item = list.filter(i => i._id === id)[0] || {};
  
      if (item._id) {
  
        item.complete = !item.complete;
  
        let url = `${todoAPI}/${id}`;
  
        axios({
          method: 'put',
          url : url,
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(item),
        })
          .then(response => response.data)
          .then(editedItem => {
            setList(list.map(listItem => listItem._id === item._id ? editedItem : listItem));
          })
          .catch(console.error);
      }
    };
  };

  const _getTodoItems = () => {
    axios.get(todoAPI)
      .then(response =>response.data )
      .then(data => {
        setList(data);
      })
      .catch(console.error);
  };


  const _deleteTodoItems = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      let url = `${todoAPI}/${id}`;
      axios( {
        url : url,
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.data)
        .then(deletedItem => {
          setList(list.filter(listItem => listItem._id !== deletedItem._id));
        })
        .catch(console.error);
    }
    
  };

  useEffect(_getTodoItems, []);

  return (
    <>
      <header>

        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Home</Navbar.Brand>
        </Navbar>

        <h2>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Navbar.Brand href="#home">Todo List Manager {list.filter(item => !item.complete).length} </Navbar.Brand>
            </Nav>
          </Navbar>
        </h2>

      </header>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            handleDelete ={_deleteTodoItems}
          />
        </div>

      </section>
    </>
  );
};

export default ToDo;
