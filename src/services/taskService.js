import { DB_PATH } from '../constants.js';
import fs from 'node:fs/promises';

export const readTasks = async () => {
  const data = await fs.readFile(DB_PATH, 'utf-8');
  const parsedData = JSON.parse(data);
  return parsedData;
};

export const writeTasks = async tasks => {
  await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
};

export const idNotFound = { message: "such id isn't found" };
