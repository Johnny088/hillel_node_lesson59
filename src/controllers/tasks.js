import { idNotFound, readTasks, writeTasks } from '../services/taskService.js';

export const getTasks = async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;

  const tasks = await readTasks();
  const task = tasks.find(task => task.id === Number(id));

  if (!task) {
    res.status(404).json(idNotFound);
    return;
  }

  res.json(task);
};

export const addNewTask = async (req, res) => {
  const { title } = req.body;

  const tasks = await readTasks();

  const id =
    tasks.length === 0
      ? 1
      : tasks.reduce((acc, task) => {
          return task.id > acc ? task.id : acc;
        }, 0) + 1;

  const newTask = { title, id, completed: false };
  tasks.push(newTask);

  await writeTasks(tasks);

  res.status(201).json(newTask);
};

export const removeTaskById = async (req, res) => {
  const { id } = req.params;

  const tasks = await readTasks();
  const filteredTasks = tasks.filter(task => task.id !== Number(id));

  if (tasks.length === filteredTasks.length) {
    res.status(404).json(idNotFound);
    return;
  }
  await writeTasks(filteredTasks);

  res.sendStatus(204);
};

export const updateTaskById = async (req, res) => {
  const { id } = req.params;

  const tasks = await readTasks();
  const checkId = tasks.find(task => task.id === Number(id));

  if (!checkId) {
    res.status(404).json(idNotFound);
    return;
  }

  const modifiedTask = { ...checkId, ...req.body };

  const updatedTasks = tasks.map(task =>
    task.id === Number(id) ? modifiedTask : task,
  );
  await writeTasks(updatedTasks);

  res.status(200).json(modifiedTask);
};
