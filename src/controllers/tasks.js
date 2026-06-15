import { readTasks, writeTasks } from '../services/taskService.js';

export const getTasks = async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;

  // if (Number.isNaN(id)) {
  // res.status(400).json('Invalid id: Id must be a number');
  // return;
  // }

  const tasks = await readTasks();
  const task = tasks.find(task => task.id === Number(id));

  // if (!task) {
  // res.status(404).json({ message: `task with id: '${id}' isn't found` });
  // return;
  // }

  res.json(task);
};

export const addNewTask = async (req, res) => {
  const { title } = req.body;
  // if (!title || title.trim() === '') {
  //   res.status(400).json({ message: 'Bad request' });
  //   return;
  // }

  const tasks = await readTasks();

  const id =
    tasks.length === 0
      ? 1
      : tasks.reduce((acc, task) => {
          return task.id > acc ? task.id : acc;
        }, 0) + 1;

  tasks.push({ title, id, completed: false });

  await writeTasks(tasks);

  res.status(201).json(`task: '${title}' is created`);
};

export const removeTaskById = async (req, res) => {
  const { id } = req.params;
  // if (Number.isNaN(id)) {
  //   res.status(400).json('Invalid id: Id must be a number');
  //   return;
  // }

  const tasks = await readTasks();
  const filteredTasks = tasks.filter(task => task.id !== Number(id));
  // if (tasks.length === filteredTasks.length) {
  //   res.status(404).json({ message: `task with id: '${id}' isn't found` });
  //   return;
  // }
  await writeTasks(filteredTasks);

  res.sendStatus(204);
};

export const updateTaskById = async (req, res) => {
  const { id } = req.params;
  // if (Number.isNaN(id)) {
  //   res.status(400).json('Invalid id: Id must be a number');
  //   return;
  // }
  const tasks = await readTasks();
  const checkId = tasks.find(task => task.id === Number(id));
  // if (!checkId) {
  //   res.status(404).json({ message: `task with id: '${id}' isn't found` });
  //   return;
  // }

  const updatedTasks = tasks.map(task =>
    task.id === Number(id) ? { ...task, ...req.body } : task,
  );
  await writeTasks(updatedTasks);

  res.status(200).json({ message: `the task with the id: '${id}' is updated` });
};
