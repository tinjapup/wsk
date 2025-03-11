import express from 'express';
//import {body} from 'express-validator';
import {
  addUser,
  updateUser,
  eraseUser,
  getUsers,
  changePassword,
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
    validationErrorHandler,
    addUser,
  )

  // update user
  .put(
    validationErrorHandler,
    authenticateToken,
    updateUser
  )

  .delete(authenticateToken, validationErrorHandler, eraseUser)
  ;


  // all routes to /api/users
userRouter
.route('/password')
// update user password
.put(
  validationErrorHandler,
  changePassword
);


export default userRouter;
