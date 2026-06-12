import express from 'express';
import { readTasks } from './services/taskService.js';

import { PORT } from './constants.js';

const app = express();

app.get('/tasks', async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
});

//

app.listen(PORT, error => {
  if (error) {
    console.log('error during starting');
  }
  console.log(`server is running on port: ${PORT}`);
});
