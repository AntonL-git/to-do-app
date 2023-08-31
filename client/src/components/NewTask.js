import React, { useState } from 'react';
import { fetchCreatedTodos } from '../api';

function NewTask({ setTodos }) {
  const [title, setTitle] = useState('');
  const [invalidInput, setInvalidInput] = useState(false);

  const handleCreateTodo = async () => {
    if (title.trim() === '') {
      setInvalidInput(true);
      setTitle('');
      return;
    }
    setInvalidInput(false);
      fetchCreatedTodos(title)
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error: ', err));
    setTitle('');
  };

  return (
    <div className="todo-creator">
      <input
        role="textbox"
        type="text"
        placeholder={invalidInput ? "I can't be empty!" : 'I need to ...'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={invalidInput ? { borderColor: 'red' } : {}}
      />
      <button className="create-button" onClick={handleCreateTodo}>Add todo</button>
    </div>
  );
}

export default NewTask;
