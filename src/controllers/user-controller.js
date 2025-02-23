import bcrypt from 'bcryptjs';
import {
  insertUser,
  selectAllUsers,
  selectUserById,
  deleteUser,
  editUser
} from '../models/user-model.js';

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
const getUsers = async (req, res) => {
    console.log("getUsers test", req.userId);

    // check if user is admin
    const user = await selectUserById(req.userId);
    console.log("userlevel check", user.user_level);

    if (user.user_level === "admin") {
      const users = await selectAllUsers();
      console.log("All users", users);
      res.json(users);
    } else {
      res.sendStatus(404).json({message: 'Permission denied'});
    }
  };

// Get user by id
const getUserById = async (req, res) => {
  console.log('getUserById', req.params.id);
  console.log("getUsers test", req.userId);

  const admin = checkIfAdmin(req.userId);

  try {
    if (admin || req.userId === req.params.id) {
      const users = await selectUserById(req.params.id);
      console.log("Userinfo", users);
    } else {
      res.status(404).json({message: 'No access'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Add new user
const addUser = async (req, res) => {
  console.log('addUser request body', req.body);
  const {username, password, email} = req.body;
  if (username && password && email) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      username,
      password: hashedPassword,
      email,
    };
    try {
      const result = await insertUser(newUser);
      res.status(201);
      return res.json({message: 'User added. id: ' + result});
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({message: 'DB error: ' + error.message});
    }
  }
  res.status(400);
  return res.json({
    message: 'Request should have username, password and email properties.',
  });
};

// Edit user by id
const updateUser = async (req, res) => {
  console.log('editUser request body', req.body, req.userId);
  const user = await editUser(req);
  if (user) {
    res.json({message: 'User updated.'});
  } else {
    res.status(404).json({message: 'User not found'});
  }
};


// Delete user by id
const eraseUser = async (req, res) => {
  console.log("eraseUser testing, req", req.body);
  console.log("req.user", req.userId);
  const admin = await checkIfAdmin(req.userId);
  console.log("admin check", admin);


  try {

    if (admin && req.userId == req.params.id) {
      res.status(200).json({message: 'Admin account be deleted'});
    } else if (admin || req.userId === req.params.id) {
      const result = await deleteUser(req.params.id);
      console.log("deleteUser testing, result", result);
    } else {
      res.status(404).json({message: 'No access'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }

};

export {getUsers, getUserById, addUser, updateUser, eraseUser};
