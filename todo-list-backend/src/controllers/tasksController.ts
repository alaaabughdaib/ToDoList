import { Request, Response } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../models/tasksModel';

export const getTasksController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const tasks = await getTasks(Number(userId));
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Error fetching tasks');
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  const { title, description, userId } = req.body;
  try {
    const newTask = await createTask(title, description, Number(userId));
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).send('Error creating task');
  }
};


export const updateTaskController = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description } = req.body;
  try {
    const updatedTask = await updateTask(Number(taskId), title, description);
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    res.status(500).send('Error updating task');
  }
};


export const deleteTaskController = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const deletedTask = await deleteTask(Number(taskId));
    if (deletedTask) {
      res.status(204).send();
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting task');
  }
};
