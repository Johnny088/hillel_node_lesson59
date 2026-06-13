import { Router } from 'express';
import {
  addNewTask,
  getTaskById,
  getTasks,
  removeTaskById,
  updateTaskById,
} from '../controllers/tasks.js';

const taskRouter = Router();

taskRouter.get('/tasks', getTasks);

taskRouter.get('/tasks/:id', getTaskById);

taskRouter.delete('/tasks/:id', removeTaskById);

taskRouter.post('/tasks', addNewTask);

taskRouter.patch('/tasks/:id', updateTaskById);

export default taskRouter;
