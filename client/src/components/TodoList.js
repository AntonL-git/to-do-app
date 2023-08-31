import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import NewTask from './NewTask';

const BASE_URL = "http://localhost:8080"


function TodoList(){

    const [todos, setTodos] = useState([]) 

    useEffect(() => {
        getTodos()
        console.log(todos)
    }, [])  
    
    const getTodos = () => {
        fetch(`${BASE_URL}/todo`)
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err))
    }

    return (
        <>
            <NewTask setTodos={setTodos}/>
            {todos.map(todo => (
                <div key={todo.id}>
                    <TodoItem todo = {todo} setTodos={setTodos}/> 
                </div>
            ))}
        </>
    )
}

export default TodoList