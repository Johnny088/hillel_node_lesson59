import express from 'express';
import { PORT } from './constants.js';
import taskRouter from './routers/tasksRouter.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use(taskRouter);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, error => {
  if (error) {
    console.log('error during starting');
  }
  console.log(`server is running on port: ${PORT}`);
});
