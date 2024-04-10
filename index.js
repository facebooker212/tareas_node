const express = require('express')
const app = express()
const port = 3000

app.get('/tasks', (req, res) => {
  // Return tasks
  res.send('This returns tasks')
})

app.get('/tasks/:id', (req, res) => {
  // Return rask by id
  res.send('id: ' + req.params.id)
})

app.post('/tasks', (req, res) => {
  // Create new task
})

app.put('/tasks/:id', (req, res) => {
  // Update task
  res.send('id: ' + req.params.id)
})

app.delete('/tasks/:id', (req, res) => {
  // Delete task by id
})

app.listen(port, () => {
  console.log('App running')
})
