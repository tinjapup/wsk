import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {selectAllUsers, selectUserById, selectUserByUsername} from '../models/user-model.js';

// user authentication (login)
const login = async (req, res) => {

  const {username, password} = req.body;

  await selectAllUsers();

  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }


  const user = await selectUserByUsername(username);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {

      const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return res.status(200).json({message: 'login ok', user, token});
    } else {
      console.log("not match");
    }
  }
  res.status(401).json({message: 'Bad username/password.'});
};




const checkPassword = async (req, res) => {

  const {username, password} = req.body;

  await selectAllUsers();

  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }
  const user = await selectUserByUsername(username);

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return res.json({message: 'login ok', user, token});
    } else {
      return res.json({message: 'login not', status: 401});
    }
  }
  res.json({message: 'Bad username/password.'});
};



const getMe = async (req, res) => {
  try {
  const response = await selectUserById(req.userId);

  return res.json(response);
  } catch (error) {
    console.log("getMe", error);
  }
};

export {login, getMe, checkPassword};
