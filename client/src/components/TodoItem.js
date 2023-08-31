import React from 'react';
import { fetchDeletedTodo, fetchUpdatedTodo } from '../api';

function TodoItem({ todo, setTodos }) {
  const completeTodo = async (id) => {
    if (todo.completed === false) {
      fetchUpdatedTodo(id)
        .then((data) => setTodos(data))
        .catch((err) => console.error('Error: ', err));
    }
  };

  const deleteTodo = async (id) => {
    fetchDeletedTodo(id)
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error: ', err));
  };

  const title = !todo.completed ? todo.title
    : (
      <span style={{ color: 'grey', textDecoration: 'line-through' }}>
        {todo.title}
      </span>
    );

  return (
    <div className="todo-item">
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => completeTodo(todo.id)} />
      {title}
      <button className="delete-button" onClick={() => deleteTodo(todo.id)}>X</button>
    </div>
  );
}

export default TodoItem;
