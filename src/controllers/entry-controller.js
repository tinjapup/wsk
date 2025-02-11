import {listAllEntries, findEntryById, addEntry, listAllUsers, findUserById, addUser} from "../models/entry-model.js";

const getEntries = async (req, res) => {
  const result = await listAllEntries();
  console.log("getEntries test");
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
    console.log("getEntries not working");
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  console.log(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = req.body;
  if (entry_date && (weight || mood || sleep_hours || notes) && user_id) {
    const result = await addEntry(req.body);
    if (result.entry_id) {
      res.status(201);
      res.json({message: 'New entry added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

const putEntry = (req, res) => {
  // placeholder for future implementation
  res.sendStatus(200);
};

const deleteEntry = (req, res) => {
  // placeholder for future implementation
  res.sendStatus(200);
};


// USERS

const getUsers = async (req, res) => {
  const result = await listAllUsers();
  console.log("getUsers test");
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
    console.log("getUsers not working");
  }
};

const getUserById = async (req, res) => {
  const entry = await findUserById(req.params.id);
  console.log(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const {user_id, username, password, email, created_at, user_level} = req.body;
  if (username && email && user_id && password && created_at && user_level) {
    const result = await addUser(req.body);
    if (result.user_id) {
      res.status(201);
      res.json({message: 'New user added.', ...result});
    } else {
      res.status(500);
      res.json(result);
    }
  } else {
    res.sendStatus(400);
  }
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry, getUsers, getUserById, postUser};
