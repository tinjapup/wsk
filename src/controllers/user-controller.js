import bcrypt from 'bcryptjs';
import {
  insertUser,
  selectAllUsers,
  selectUserById,
  deleteUser,
  editUser
} from '../models/user-model.js';
import { validationResult } from 'express-validator';





// Check if user is admin
const checkIfAdmin = async (id) => {
  const user = await selectUserById(id);
  if (user.user_level === "admin") {
    return true;
  } else {
    return false;
  }
};




// Get all user info
const getUsers = async (req, res, next) => {
    console.log("getUsers test", req.userId);

    // validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Invalid or missing fields');
      error.status = 400;
      return next(error);
    }

    // check if user is admin
    const user = await selectUserById(req.userId);
    console.log("userlevel check", user.user_level);

    if (user.user_level === "admin") {
      const users = await selectAllUsers();
      console.log("All users", users);
      res.json(users);
    } else {
      //res.sendStatus(403).json({message: 'Access denied'});
      const error = new Error('Access denied');
      error.status = 403;
      return next(error);
    }
  };

// Get user by id
const getUserById = async (req, res, next) => {
  console.log('getUserById', req.params.id);
  console.log("getUsers test", req.userId);

  // validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  // check if user if admin
  const admin = checkIfAdmin(req.userId);

  try {
    if (admin || req.userId === req.params.id) {
      const users = await selectUserById(req.params.id);
      console.log("Userinfo", users);
    } else {
      const error = new Error('Access denied');
      error.status = 403;
      return next(error);
    }
  } catch (error) {
    res.status(500).json({message: error.message});
    return next(error);
  }
};

// Add new user
const addUser = async (req, res, next) => {

  console.log('Request body:', req.body);

  const {username, password, email} = req.body;
  console.log('addUser request body', username, password, email);

  // validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = {
        username,
        password: hashedPassword,
        email,
      };

    console.log("newUser", newUser);

    const result = await insertUser(newUser);
    res.status(201);
    return res.json({message: 'New user added. id: ' + result});
  } catch (error) {
    console.error('Error adding user:', error);
    return next({ status: 500, message: 'Internal Server Error' });
  }

};

// Edit user by id
const updateUser = async (req, res, next) => {
  console.log('editUser request body', req.body, req.userId);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  try {
    const user = await editUser(req);
    if (user) {
      return res.json({message: 'User updated.'});
    } else {
      return next({ status: 404, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return next({ status: 500, message: 'Internal Server Error' });
  }
};


// Delete user by id
const eraseUser = async (req, res, next) => {
  console.log("eraseUser testing, req", req.body);
  console.log("req.user", req.userId);
  const admin = await checkIfAdmin(req.userId);
  console.log("admin check", admin);


  try {

    if (admin && req.userId == req.params.id) {
      return next({ status: 500, message: 'Admin account cannot be deleted' });
    } else if (admin || req.userId === req.params.id) {
      const result = await deleteUser(req.params.id);
      console.log("deleteUser testing, result", result);
    } else {
      const error = new Error('Access denied');
      error.status = 403;
      return next(error);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return next({ status: 500, message: 'Internal Server Error' });
  }

};

export {getUsers, getUserById, addUser, updateUser, eraseUser};
