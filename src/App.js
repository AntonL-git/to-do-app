import { useState } from "react"

export default function App() {

  const TODOS = [
    {title: "Morning Workout", done: false, id:1},
    {title: "Do the homework", done: false, id:2},
    {title: "Register for the module", done: false, id:3},
    {title: "Complete application", done: false, id:4}
  ]

  return (
  <>
    <Header />
    <Button />
    <TodoList todos={TODOS} />
  </>
  )
}

function Header(){
  return(
    <h1>To-Do Tracker</h1>
  )
}

function Button(){
  return(
    <button>
      Add todo
    </button>
  )
}


function TodoItem({todo, switchState}) {
  const title = !todo.done ? todo.title :
    <span style={{color: 'grey', textDecoration: 'line-through'}}>
      {todo.title}
    </span>

  return (
    <>
      <input type="checkbox" checked={todo.done} onChange={() => switchState(todo.id)}/>
      {title}
    </>
  )
}


function TodoList({todos: initialTodos}){

  const [todos, setTodos] = useState(initialTodos)

  const switchState = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? {...todo, done: !todo.done} : todo
      ))
  } 

  const todoItems = todos.map(todo => (
    <p key={todo.id}>
      <TodoItem todo={todo} switchState={switchState}/>
    </p>
  ))

  return <ul>{todoItems}</ul>
}
