import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import axios from 'axios';

import './todo.scss';

const todoAPI = 'https://todo-app-server-lab32.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    axios({
      url:todoAPI,
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(item),
    })
      .then(response => {
        setList([...list, response.data]);
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      let item = list.filter(i => i._id === id)[0] || {};
  
      if (item._id) {
  
        item.complete = item.complete === 'complete' ? 'pending' : 'complete';
  
        let url = `${todoAPI}/${id}`;
  
        axios({
          method: 'put',
          url : url,
          mode: 'cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          data: JSON.stringify(item),
        })
          .then(savedItem => {
            setList(list.map(listItem => listItem._id === item._id ? savedItem.data : listItem));
          })
          .catch(console.error);
      }
    };

    const _getTodoItems = () => {
    
      axios.get(todoAPI)
        .then(response => setList(response.data.result));
    };


    const _deleteTodoItems = id => {

      let item = list.filter(i => i._id === id)[0] || {};

      if (item._id) {
        let url = `${todoAPI}/${id}`;

        axios( {
          url : url,
          method: 'delete',
          mode: 'cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
        })
          .then(() => {
            setList(list.filter(listItem => listItem._id !== item._id ));
          })
          .catch(console.error);
      }
    
    };

    useEffect(_getTodoItems, []);

    return (
      <>
        <header>
          <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
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
            />
          </div>

          <div>
            <TodoList
              handleDelete={_deleteTodoItems}
            />
          </div>

        </section>
      </>
    );
  };
};

export default ToDo;
