import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import {
  getUsersController,
  createUserController,
  getUserWithTasksController,
  updateUserController,
  deleteUserController,
  loginUserController
} from '../controllers/usersController';
import { authenticateToken } from '../index';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
    role: string;
  }
}

const isAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
 
  const user = (req as AuthenticatedRequest).user;
  if (user && user.role === 'admin') {
    return next();
  }
  res.status(403).json({ error: 'Access denied, admin only' });
};

const router = Router();


router.get('/', authenticateToken, isAdmin, getUsersController as RequestHandler);
router.post('/', createUserController as RequestHandler);
router.post('/login', loginUserController as RequestHandler);
router.get('/:userId', getUserWithTasksController as RequestHandler);
router.put('/:userId', updateUserController as RequestHandler);
router.delete('/:userId', deleteUserController as RequestHandler);

export default router;
