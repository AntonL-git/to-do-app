import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../api';


function NewTask({setTodos}){

    const [title, setTitle] = useState("")

    const handleCreateTodo = async () => {
      await fetch(`${BASE_URL}/todo`, {
                    method: 'POST', 
                    headers: {"Content-Type" : "application/json"}, 
                    body: JSON.stringify({title: title, completed: false})
                })
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err))
    }

    return (
      <>
        <input type="text" placeholder="I need to ..." value={title} onChange={e => setTitle(e.target.value)} />
        <button onClick={handleCreateTodo}>Add todo</button>
      </>
    )
}

export default NewTask
