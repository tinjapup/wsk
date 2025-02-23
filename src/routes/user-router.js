import express from 'express';
import {
  addUser,
  updateUser,
  eraseUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
const userRouter = express.Router();

// all routes to /api/users
userRouter.route('/')
  // only logged in user can fetch the user list
  .get(authenticateToken, getUsers)
  .post(addUser)
  .put(authenticateToken, updateUser)

// all routes to /api/users/:id
userRouter.route('/:id')
  .get(authenticateToken, getUserById)
  .delete(authenticateToken, eraseUser);

export default userRouter;
