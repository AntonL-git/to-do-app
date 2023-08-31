const express = require('express')
const app = express()
const port = 8080

const todos = [
    {title: "Morning Workout", completed: false, id:1},
    {title: "Do the homework", completed: false, id:2},
    {title: "Complete application", completed: false, id:3}
]

app.use(express.json())

app.listen(
    port, 
    () => console.log(`Server is running on http://localhost:${port}`)
)

function validateTodo(req, res, next){
    if (req.is('application/json')) {
        const {title, completed}  = req.body;
        if (typeof title !== 'undefined' && typeof completed !== 'undefined') {
          return next();
        } else {
          return res.status(400).json({ error: 'Invalid Todo, check the fields' });
        }
      } else {
        return res.status(400).json({ error: 'Invalid Content-Type, JSON expected' });
      }
}


// Get all todos
app.get('/todo', (req,res) => {
    res.send(todos)
})

// Create new Todo
app.post('/todo', validateTodo, (req,res) => {

    const {title, completed} = req.body
    max_index = Math.max(...todos.map(task => task.id))

    const newTodo = {
        id: ++max_index,
        title, 
        completed
    }

    console.log("Created Todo", newTodo)
    todos.push(newTodo)
    res.send("Todo is created")
})

//Update Todo status and edit existing Todo by id
app.put('/todo:id', (req,res) => {
    const {id} = req.params
})

//Delete Todo by id
app.delete('/todo:id', (req, res) =>{
    const {id} = req.params
    this.todos = todos.filter(task => task.id !== id)

    res.send(todos)
})





 