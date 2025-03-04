import express from 'express';
import {body} from 'express-validator';
import {
  addUser,
  updateUser,
  eraseUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';
import { validationErrorHandler } from '../middlewares/error-handler.js';
const userRouter = express.Router();

// all routes to /api/users
userRouter
  .route('/')

  // get user info
  .get(authenticateToken, getUsers)

  // add new user
  .post(
    body('username', 'Username must be 3-20 characters long and alphanumeric')
    .trim()
    .isLength({min: 3, max: 20})
    .isAlphanumeric(),
    body('password', 'Minimum password length is 8 characters')
    .trim()
    .isLength({min: 8, max: 128}),
    body('email', 'Must be a valid email address')
    .trim()
    .isEmail()
    .normalizeEmail(),
    validationErrorHandler,
    addUser,
  )

  // update user password
  .put(
    body('password', 'Minimum password length is 8 characters')
    .trim()
    .isLength({min: 8, max: 128}),
    validationErrorHandler,
    authenticateToken,
    updateUser
  );

// all routes to /api/users/:id
userRouter
  .route('/:id')
  .get(authenticateToken, validationErrorHandler, getUserById)
  .delete(authenticateToken, validationErrorHandler, eraseUser);

export default userRouter;
