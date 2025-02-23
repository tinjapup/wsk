import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {selectAllUsers, selectUserByUsername} from '../models/user-model.js';

// user authentication (login)
const login = async (req, res) => {

  const {username, password} = req.body;

  await selectAllUsers();

  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }
  const user = await selectUserByUsername(username);
  // jos käyttäjä löytyi tietokannasta verrataan kirjautumiseen syötettyä sanaa tietokannan
  // salasanatiivisteeseen
  console.log("user info:", user);
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      return res.json({message: 'login ok', user, token});
    } else {
      console.log("not match");
    }
  }
  res.status(401).json({message: 'Bad username/password.'});
};

const getMe = (req, res) => {
  const user = req.user;
  res.json(user);
};

export {login, getMe};
