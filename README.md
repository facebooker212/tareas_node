# tareas_node

## Tareas API Endpoints

### GET /tasks
- Lista todas las tareas

### GET /tasks/:id
- Devuelve una tarea dependiendo de su ID

### POST /tasks
- Agrega una nueva tarea
- Parámetros en el body:
  - `title` (requerido)
  - `description` (requerido)
  - `status` (por defecto es "pendiente")

### PUT /tasks/:id
- Actualiza una tarea dependiendo de su ID

### DELETE /tasks/:id
- Elimina una tarea en base a su ID

## Deployment
- La API está desplegada en: [https://tareas-node.vicmr.com](https://tareas-node.vicmr.com/tasks)
