import express from 'express';
import { login, getMe, checkPassword } from '../controllers/auth-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const authRouter = express.Router();

authRouter.route('/login')
  .post(login);

  authRouter.route('/me')
  .get(authenticateToken, getMe);

  authRouter.route('/check')
  .post(checkPassword);

export default authRouter;
