
import promisePool from '../utils/database.js';

// find all entries
const findAllEntries = async (user) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM Entries WHERE user_id = ?', [user]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// find entry by id
const findEntryById = async (user, id, next) => {

  try {

    let query, values;

    if (id == 0) {
      query = "SELECT * FROM Entries WHERE user_id = ? ORDER BY entry_date ASC";
      values = [user];
    } else {
      query = "SELECT * FROM Entries WHERE entry_id = ? AND user_id = ? ORDER BY entry_date ASC";
      values = [id, user];
    }

    const [rows] = await promisePool.query(query, values);

    if (rows.length > 0) {
      return rows;
    } else {
      return [];
    }

  } catch (error) {
    next(error);
  }
};

// add new entry
const addEntry = async (entry) => {
  const sql = `INSERT INTO Entries (user_id, entry_date, activity, name, duration, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [entry.user_id, entry.date, entry.activity, entry.name, entry.duration, entry.comment];

  try {
    const rows = await promisePool.query(sql, params);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// delete entry
const deleteEntry = async (user, id) => {
  try {
    const [rows] = await promisePool.query('DELETE FROM Entries WHERE user_id = ? AND entry_id = ?', [user, id]);
    if (!rows.affectedRows) {
      return { message: `Entry with ID ${id} could not been deleted.` };
    }
    return {message: `Entry with ID ${id} deleted.`};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  };
}

// edit entry
const editEntry = async (user, id, updates) => {

  const [existingRows] = await promisePool.query('SELECT * FROM Entries WHERE user_id = ? AND entry_id = ?', [user, id]);

  if (existingRows.length === 0) {
    return { message: `Entry with ID ${id} could not been updated.` };
  }

  // combine new and old information
  const existingEntry = existingRows[0];
  const updatedEntry = {
    ...existingEntry,
    ...updates,
  };

  try {
    const { name, notes } = updatedEntry;
    const [result] = await promisePool.query(
      'UPDATE Entries SET name = ?, notes = ? WHERE user_id = ? AND entry_id = ?',
      [name, notes, user, id]
    );

    if (result.affectedRows === 0) {
      return { message: `Entry with ID ${id} was not updated.`,  };
    }

    return { message: `Entry with ID ${id} updated.` };
  } catch (e) {
    console.error('error', e.message);
    return { error: e.message };
  }
};


export {editEntry, findAllEntries, findEntryById, addEntry, deleteEntry};
