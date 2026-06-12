import express from 'express';
import {
  addNewTask,
  deleteTask,
  readTaskById,
  readTasks,
  updateTask,
} from './services/taskService.js';

import { PORT } from './constants.js';
import chalk from 'chalk';

const app = express();

app.use(express.json());

app.get('/tasks', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await readTaskById(Number(id));
  if (!task) {
    res.status(404).json({ message: `task with id: '${id}' isn't found` });
    return;
  }
  res.json(task);
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  const task = await addNewTask(title);
  if (!task) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }
  res.status(201).json(`task: '${title}' is created`);
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  const task = await deleteTask(Number(id));
  if (!task) {
    res.status(404).json(`the task with '${id}' wasn't found`);
    return;
  }
  res.sendStatus(204);
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const task = await updateTask(Number(id), req.body);
  if (!task) {
    res
      .status(404)
      .json({ message: `the task with the id: '${id}' wasn't found` });
    return;
  }
  res.status(201).json({ message: `the task with the id: '${id}' is updated` });
});
//
app.use((req, res) => {
  res.status(404).json({ message: 'route not found' });
});

app.listen(PORT, error => {
  if (error) {
    console.log('error during starting');
  }
  console.log(`server is running on port: ${PORT}`);
});
