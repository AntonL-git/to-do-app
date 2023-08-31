import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../api';

function TodoItem({todo, setTodos}) {

    const completeTodo = async (id) => {
        if (todo.completed === false) {
        await fetch(`${BASE_URL}/todo/${id}`, {method: 'PUT'})
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err))
        } 
    }

    const deleteTodo = async (id) => {
        await fetch(`${BASE_URL}/todo/${id}`, {method: 'DELETE'})
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err))
    }

    const title = !todo.completed ? todo.title :
        <span style={{color: 'grey', textDecoration: 'line-through'}}>
        {todo.title}
        </span>

    return (
        <>
            <input type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo.id)}/>
            {title}
            <button onClick={() => deleteTodo(todo.id)}>X</button>
        </>
    )
}

export default TodoItem
  