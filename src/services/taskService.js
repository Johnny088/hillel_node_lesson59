import chalk from 'chalk';

import { DB_PATH } from '../constants.js';
import fs from 'node:fs/promises';

export const readTasks = async () => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const parsedData = JSON.parse(data);

    return parsedData;
  } catch (error) {
    console.log(chalk.red(error));
    return [];
  }
};

export const readTaskById = async id => {
  if (Number.isNaN(id)) {
    console.log(chalk.red('Id is required and must be a number'));
    return false;
  }

  const tasks = await readTasks();

  const task = tasks.find(task => task.id === id);
  if (!task) {
    console.log(chalk.red(`task with such id: '${id}' doesn't exist`));
    return false;
  }
  return task;
};

export const writeTasks = async tasks => {
  await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
};

export const addNewTask = async newTask => {
  if (!newTask || newTask.trim() === '') {
    console.log(chalk.red('new task can not be empty'));
    return false;
  }
  const tasks = await readTasks();

  const id =
    (tasks.length === 0
      ? 1
      : tasks.reduce((acc, task) => {
          return task.id > acc ? task.id : acc;
        }, 0)) + 1;

  tasks.push({ title: newTask, id, completed: false });
  await writeTasks(tasks);
  return true;
};
