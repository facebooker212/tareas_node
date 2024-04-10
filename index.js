require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 3000

// Parametros de conexion a MongoDB
const mongoUser = encodeURIComponent(process.env.MONGO_USER);
const mongoPassword = encodeURIComponent(process.env.MONGO_PASSWORD);

// Creamos string de conexion
const uri = `mongodb://${mongoUser}:${mongoPassword}@127.0.0.1:27017/tasks?authSource=admin`;

// Prueba conexion local a MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Esquema de los datos
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "pendiente" },
});

const Task = mongoose.model('Task', taskSchema);

// Middleware para el cuerpo de las solicitudes
app.use(express.json());

// tasks lista todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// /tasks/:id devuelve una tarea especifica
app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// /tasks (POST) Crea una nueva tarea
app.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// Actualiza una tarea en base al ID
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// Elimina una tarea en base al ID
app.delete('/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.deleteOne({ _id: req.params.id });
    if (deletedTask.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

app.listen(port, () => {
  console.log('App running on port', port);
})
