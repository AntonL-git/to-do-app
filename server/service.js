const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')

const PORT = process.env.port || 8080;

app.use(express.json());
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

// Initial data
let todos = [];

app.listen(PORT, () => console.log(`Server is running on http://0.0.0.0:${PORT}`));

// Check todo fields
function validateTodo(req, res, next) {
  if (req.is('application/json')) {
    const { title, completed } = req.body;
    if (typeof title !== 'undefined' && typeof completed !== 'undefined') {
      return next();
    }
    return res.status(400).json({ error: 'Invalid Todo, check the fields' });
  }
  return res.status(400).json({ error: 'Invalid Content-Type, JSON expected' });
}

// Get all todos
app.get('/todo', (req, res) => {
  res.send(todos);
});

// Create a new todo
app.post('/todo', validateTodo, (req, res) => {
  const { title, completed } = req.body;
  currentIndex = todos.length === 0 ? 0 : Math.max(...todos.map((task) => task.id));

  const newTodo = {
    id: ++currentIndex,
    title,
    completed,
  };

  todos.push(newTodo);
  console.log('Created Todo', todos);
  res.send(todos);
});

// Update Todo's status or title
app.put('/todo/:id', (req, res) => {
  const { id } = req.params;

  const updatedTodos = todos.map((todo) => {
    if (todo.id == id) {
      return {
        ...todo,
        completed: true,
      };
    }
    return todo;
  });

  const completedTodo = updatedTodos.find((todo) => todo.id == id && todo.completed === true);

  if (updatedTodos.some((todo) => todo.id == id)) {
    // put completed todo in the end of the list
    if (completedTodo) {
      updatedTodos.splice(updatedTodos.indexOf(completedTodo), 1);
      updatedTodos.push(completedTodo);
    }

    todos = updatedTodos;
    res.send(todos);
  } else {
    res.send(todos);
  }
});

// Delete Todo by id
app.delete('/todo/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((task) => task.id != id);
  res.send(todos);
});
