// temporal mock data for testing, should be replaced with real data from DB

import promisePool from '../utils/database.js';

const findAllEntries = async (user) => {
  console.log("findAllEntries testing", user);

  try {
    const [rows] = await promisePool.query('SELECT * FROM Entries WHERE user_id = ?', [user]);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (user, id, next) => {
  console.log("findEntryById testing", user, id);

  try {
    let query, values;

    if (id == 0) {
      // Fetch all entries for the user
      query = "SELECT * FROM Entries WHERE user_id = ? ORDER BY entry_date ASC";
      values = [user];
    } else {
      // Fetch a specific entry by id and user
      query = "SELECT * FROM Entries WHERE entry_id = ? AND user_id = ? ORDER BY entry_date ASC";
      values = [id, user];
    }

    const [rows] = await promisePool.query(query, values);

    if (rows.length > 0) {
      console.log("rows", rows);
      return rows;
    } else {
      console.log("No rows found");
      return [];
    }

  } catch (error) {
    next(error);

    /*
    console.error("Error:", error.message);
    return { error: error.message };
    */
  }
};

const addEntry = async (entry) => {
  console.log("Add entry", entry);
  const sql = `INSERT INTO Entries (user_id, entry_date, activity, name, duration, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [entry.user_id, entry.date, entry.activity, entry.name, entry.duration, entry.comment];



  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


const deleteEntry = async (user, id) => {
  console.log("deleteEntry testing, id:", id);
  console.log("user info")
  try {
    const [rows] = await promisePool.query('DELETE FROM DiaryEntries WHERE user_id = ? AND entry_id = ?', [user, id]);
    console.log('rows', rows);
    if (!rows.affectedRows) {
      return { message: `Entry with ID ${id} could not been deleted.` };
    }
    return {message: `Entry with ID ${id} deleted.`};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  };
}
const editEntry = async (user, id, updates) => {
  const [existingRows] = await promisePool.query('SELECT * FROM DiaryEntries WHERE user_id = ? AND entry_id = ?', [user, id]);
  if (existingRows.length === 0) {
    return { message: `Entry with ID ${id} could not been updated.` };
  }
  const existingEntry = existingRows[0];

  console.log('existingEntry', existingEntry);
  console.log('updates', updates);
  const updatedEntry = {
    ...existingEntry,
    ...updates,
  };

  console.log('updatedEntry', updatedEntry);
  try {
    const { entry_date, mood, weight, sleep_hours, notes } = updatedEntry;
    const [result] = await promisePool.query(
      'UPDATE DiaryEntries SET entry_date = ?, mood = ?, weight = ?, sleep_hours = ?, notes = ? WHERE user_id = ? AND entry_id = ?',
      [entry_date, mood, weight, sleep_hours, notes, user, id]
    );

    if (result.affectedRows === 0) {
      return { message: `Entry with ID ${id} was not updated.` };
    }

    return { message: `Entry with ID ${id} updated.` };
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};

/*

// USERS

const listAllUsers = async () => {
  console.log("listAllUsers testing")
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log("listAllUsers not working")
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findUserById = async (id) => {
  console.log("findUserById testing");
  try {
    const [rows] = await promisePool.query('SELECT * FROM Users WHERE user_id = ?', [id]);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.log("findUserById not working");
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addUser = async (entry) => {
  const {user_id, username, password, email, created_at, user_level} = entry;
  const sql = `INSERT INTO Users (user_id, username, password, email, created_at, user_level)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, username, password, email, created_at, user_level];
  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {user_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};
*/

export {editEntry, findAllEntries, findEntryById, addEntry, deleteEntry};
//export {editEntry, listAllUsers, findAllEntries, findEntryById, addEntry, deleteEntry, findUserById, addUser};
