import React from 'react';
// import List from 'react-bootstrap/List';
import ListGroup from 'react-bootstrap/ListGroup';
// import ListGroupItem from 'react-bootstrap/ListGroupItem';

function TodoList(props) {

  return (
    <ul>
      {props.list.map(item => (
        <ListGroup.Item
          variant={(item.complete)?'danger':'success'}
          className={`complete-${item.complete.toString()}`}
          key={item._id}
        >
          <span onClick={()  =>props.handleComplete(item._id)}>
            {item.text}
          </span>
        </ListGroup.Item>
      ))}
    </ul>
  );
}

export default TodoList;
