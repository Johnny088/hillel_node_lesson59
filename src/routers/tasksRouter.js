import { Router } from 'express';
import {
  addNewTask,
  getTaskById,
  getTasks,
  removeTaskById,
  updateTaskById,
} from '../controllers/tasks.js';

const tasksRouter = Router();

tasksRouter.get('/tasks', getTasks);

tasksRouter.get('/tasks/:id', getTaskById);

tasksRouter.delete('/tasks/:id', removeTaskById);

tasksRouter.post('/tasks', addNewTask);

tasksRouter.patch('/tasks/:id', updateTaskById);

export default tasksRouter;
