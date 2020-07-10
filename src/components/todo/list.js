import React from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function TodoList(props) {
  if (props) {
    if (props.list) {
      return (
        <div>
          {props.list.map(item => (
            <Modal.Dialog
              variant={(item.complete) ? 'danger' : 'success'}
              className={`complete-${item.complete.toString()}`}
              key={item._id}
            >
              <Modal.Header>
                <Button
                  style={{ marginRight: '3vw' }}
                  className="rounded-pill"
                  alt="150x75"
                  variant={(item.complete) ? 'danger' : 'success'}
                  onClick={() => props.handleComplete(item._id)}
                >
                  {(item.complete) ? 'complete' : 'pending'}
                </Button>
                <p>{item.assignee}</p>
                <div
                  style={{ cursor: 'pointer'}}
                  onClick={() => props.handleDelete(item._id)}
                >
                  <img alt='deleteButton' style={{ width: '1vw', height: '1vw'}} src='https://i.ya-webdesign.com/images/the-letter-a-png-2.png'/>
                </div>
              </Modal.Header>
              <Modal.Body>
                <p>{item.text}</p>
              </Modal.Body>
              <Modal.Footer>
                <p>Difficulty: {item.difficulty}</p>
              </Modal.Footer>

            </Modal.Dialog>
          ))}
        </div>
      );
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export default TodoList;
