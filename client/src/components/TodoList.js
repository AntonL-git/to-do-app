import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import NewTask from './NewTask';
import { fetchTodos } from '../api';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    fetchTodos()
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error: ', err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="todo-list">
      <NewTask setTodos={setTodos} />
      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoItem todo={todo} setTodos={setTodos} />
        </div>
      ))}
    </div>
  );
}

export default TodoList;
