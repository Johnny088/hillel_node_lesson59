import path from 'node:path';
export const DB_PATH = path.resolve('src', 'db', 'tasks.json');
export const PORT = 8000;
export const idNotFound = { message: "such id isn't found" };
