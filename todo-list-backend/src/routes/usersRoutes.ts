import { Router } from 'express';
import {
  getUsersController,
  createUserController,
  getUserWithTasksController,
  updateUserController,
  deleteUserController,
  loginUserController
} from '../controllers/usersController';
import { RequestHandler } from 'express';

const router = Router();

router.get('/', getUsersController as RequestHandler);
router.post('/', createUserController as RequestHandler);
router.post('/login', loginUserController as RequestHandler);
router.get('/:userId', getUserWithTasksController as RequestHandler);
router.put('/:userId', updateUserController as RequestHandler);
router.delete('/:userId', deleteUserController as RequestHandler);

export default router;