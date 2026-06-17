import { Router } from 'express';
import {
  addNewTask,
  getTaskById,
  getTasks,
  removeTaskById,
  updateTaskById,
} from '../controllers/tasks.js';

const tasksRouter = Router();

tasksRouter.get('', getTasks);

tasksRouter.get('/:id', getTaskById);

tasksRouter.delete('/:id', removeTaskById);

tasksRouter.post('', addNewTask);

tasksRouter.patch('/:id', updateTaskById);

export default tasksRouter;
