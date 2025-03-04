import promisePool from '../utils/database.js';

// gets all users
const selectAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, email, created_at, user_level FROM Users',
  );
  console.log('selectAllUsers result', rows);
  return rows;
};

// gets user by id
const selectUserById = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// add new user
const insertUser = async (user) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO Users (username, password, email, user_level) VALUES (?, ?, ?, ?)',
      [user.username, user.password, user.email, "user"],
    );
    console.log('insertUser', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// update user
const editUser = async (req) => {
  const id = req.userId;
  const updates = req.body;

  console.log('editUser', id, updates);

  try {
    const [existingRows] = await promisePool.query('SELECT * FROM Users WHERE user_id = ?', id);

    console.log('existingRows', existingRows);

    if (existingRows.length === 0) {
      return { message: `User with ID ${id} could not be found.` };
    }

    const existingEntry = existingRows[0];

    console.log('existingEntry', existingEntry);
    console.log('updates', updates);

    const updatedEntry = {
      ...existingEntry,
      ...updates,
    };

    console.log('updatedEntry', updatedEntry);

    const { email } = updatedEntry;

    const [result] = await promisePool.query(
      'UPDATE Users SET email = ? WHERE user_id = ?',
      [email, id]
    );

    if (result.affectedRows === 0) {
      return { message: `User with ID ${id} was not updated.` };
    }

    return { message: `User with ID ${id} updated.` };
  } catch (e) {
    console.error('Error:', e.message);
    return { error: e.message };
  }
};


// gets user by username and password
const selectUserByNameAndPassword = async (username, password) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE username=? AND password=?',
      [username, password],
    );
    console.log(rows);
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// gets user by username
const selectUserByUsername = async (username) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, password, email, created_at, user_level FROM Users WHERE username=?',
      [username],
    );
    console.log(rows);
    // return only first item of the result array
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// delete user
const deleteUser = async (user) => {
  console.log("deleteUser testing, id:", user);

  try {
    await promisePool.query("DELETE FROM DiaryEntries WHERE user_id = ?", [user]);
    await promisePool.query("DELETE FROM Medications WHERE user_id = ?", [user]);
    await promisePool.query("DELETE FROM Exercises WHERE user_id = ?", [user]);
    const [rows] = await promisePool.query('DELETE FROM Users WHERE user_id = ?', [user]);
    console.log('rows', rows);
    if (!rows.affectedRows) {
      return { message: `User with ID ${user} could not been deleted.` };
    }
    return {message: `User with ID ${user} deleted.`};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  };
}


export {
  editUser,
  selectAllUsers,
  selectUserById,
  insertUser,
  selectUserByNameAndPassword,
  selectUserByUsername,
  deleteUser
};
