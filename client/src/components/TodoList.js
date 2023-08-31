import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import NewTask from './NewTask';
import BASE_URL from './../config'


function TodoList(){

    const [todos, setTodos] = useState([])

    useEffect(() => {
        getTodos()
    }, [])  
    
    const getTodos = () => {
        fetch(`${BASE_URL}/todo`)
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err))
    }

    return (
        <div className="todo-list">
            <NewTask setTodos={setTodos}/>
            {todos.map(todo => (
                <div key={todo.id}>
                    <TodoItem todo = {todo} setTodos={setTodos}/> 
                </div>
            ))}
        </div>
    )
}

export default TodoList