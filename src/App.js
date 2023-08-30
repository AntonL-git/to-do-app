import { useState } from "react"

export default function App() {

  const todos = [
    {title: "Morning Workout", done: false},
    {title: "Do the homework", done: true},
    {title: "Register for the module", done: false},
    {title: "Complete application", done: true}
  ]

  return (
  <>
    <Header />
    <Button />
    <TodoList todos={todos} />
  </>
  )
}

function Header(){
  return(
    <h1>To-Do</h1>
  )
}

function Button(){
  const [count, setCount] = useState(0)

  function handleClick(){
    setCount(count+1)
  }

  return(
    <button onClick={handleClick}>
      Add task {count}
    </button>
  )
}

function TodoList({todos}){
  const todoItems = todos.map(todo => (
    <li key={todo.id}>
      {todo.title}
      {todo.done ? <p>Done</p> : <p>In Progress</p>}
    </li>
  ))

  return <ul>{todoItems}</ul>
}
