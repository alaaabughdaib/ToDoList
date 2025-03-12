import { Request, Response } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../models/tasksModel';

export const getTasksController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    if (!userId) return res.status(400).json({ error: 'User ID is required' });
    const tasks = await getTasks(Number(userId));
    res.json({ message: 'Tasks retrieved successfully', tasks });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks', details: error });
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  const { title, description, userId } = req.body;
  try {
    if (!title || !description || !userId) {
      return res.status(400).json({ error: 'Title, description, and user ID are required' });
    }
    const newTask = await createTask(title, description, Number(userId));
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ error: 'Error creating task', details: error });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description } = req.body;
  try {
    if (!taskId || !title || !description) {
      return res.status(400).json({ error: 'Task ID, title, and description are required' });
    }
    const updatedTask = await updateTask(Number(taskId), title, description);
    if (updatedTask) {
      res.json({ message: 'Task updated successfully', task: updatedTask });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating task', details: error });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    if (!taskId) return res.status(400).json({ error: 'Task ID is required' });
    const deletedTask = await deleteTask(Number(taskId));
    if (deletedTask) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task', details: error });
  }
};
