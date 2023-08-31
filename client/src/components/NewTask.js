import React, { useState } from 'react';
import BASE_URL from './../config'

function NewTask({setTodos}){

    const [title, setTitle] = useState("")
    const [invalidInput, setInvalidInput] = useState(false)

    const handleCreateTodo = async () => {
      if (title.trim() === '') {
        setInvalidInput(true)
        setTitle("");
        return;
      }
      setInvalidInput(false)
      await fetch(`${BASE_URL}/todo`, {
                    method: 'POST', 
                    headers: {"Content-Type" : "application/json"}, 
                    body: JSON.stringify({title: title, completed: false})
                })
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err))
      setTitle("")
    }

    return (
      <div className="todo-creator">
        <input 
          type="text" 
          placeholder={invalidInput ? "I can't be empty!" : "I need to ..."} 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          style={invalidInput ? { borderColor: 'red' } : {}} />
        <button className="create-button" onClick={handleCreateTodo}>Add todo</button>
      </div>
    )
}

export default NewTask
