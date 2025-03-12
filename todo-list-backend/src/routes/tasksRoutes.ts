import { Router } from 'express';
import { 
  getTasksController,
  createTaskController,
  updateTaskController,
  deleteTaskController
} from '../controllers/tasksController';
import { RequestHandler } from 'express';

const router = Router();

router.get('/:userId', getTasksController as RequestHandler);
router.post('/', createTaskController as RequestHandler);
router.put('/:taskId', updateTaskController as RequestHandler);
router.delete('/:taskId', deleteTaskController as RequestHandler);

export default router;
