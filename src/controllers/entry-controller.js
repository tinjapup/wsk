import {findEntryById, findAllEntries, addEntry, deleteEntry, editEntry} from "../models/entry-model.js";


const getEntryById = async (req, res) => {
  console.log("getEntryById test", req.body.entry_id);
  console.log("req.user", req.userId);

  let entry;

  if (req.body.entry_id === 0) {
    entry = await findAllEntries(req.userId);
  } else {
    entry = await findEntryById(req.userId, req.body.entry_id);
    console.log(entry);
  }

  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {

    console.log("entry-controller");
    console.log("req.body", req.body);
    console.log("req.user", req.userId);
    try {
      const newEntry = req.body;

      newEntry.user_id = req.userId;

      const result = await addEntry(newEntry);

      if (result.entry_id) {
        res.status(201).json({ message: "Entry added.", ...result });
      } else {
        res.status(500).json({ message: "Failed to add entry.", error: result });
      }
    } catch (error) {
      console.error("Error adding entry:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

const putEntry = (req, res) => {
  // placeholder for future implementation
  res.sendStatus(200);
};

const eraseEntry = async (req, res) => {
  console.log("eraseEntry testing, req", req.body);
  console.log("req.user", req.userId);
  const result = await deleteEntry(req.userId, req.body.entry_id);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
}

const updateEntry = async (req, res) => {
  console.log("entry-controller, updateEntry");
  console.log("req.body", req.body);
  console.log("req.user", req.userId);
  const { entry_id, ...updates } = req.body;

  try {
    const result = await editEntry(req.userId, entry_id, updates);
    console.log("result", result);
    if (result.message) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ message: "Failed to update entry.", error: result });
    }
  } catch (error) {
    // Catch any unexpected errors during the try block execution
    console.error("Error updating entry:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

/*
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
*/

export {updateEntry, getEntryById, postEntry, putEntry, eraseEntry};
//export {updateEntry, getEntryById, postEntry, putEntry, eraseEntry, getUsers, getUserById, postUser};
