import promisePool from '../utils/database.js';

// gets all users
const selectAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, username, email, created_at, user_level FROM Users',
  );
  return rows;
};

// gets user by id
const selectUserById = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, first_name, last_name, weight, height, created_at, user_level FROM Users WHERE user_id=?',
      [userId],
    );
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
      'INSERT INTO Users (username, password, email, user_level, first_name, last_name, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user.username, user.password, user.email, 'user', user.firstname, user.lastname, user.height, user.weight],
    );
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// update user
const editUser = async (req) => {
  const id = req.body.user_id;
  console.log("id", id);

  try {
    const [existingUser] = await promisePool.query(
      'SELECT * FROM Users WHERE user_id = ?',
      [id],
    );

    if (existingUser.length === 0) {
      return {message: `User with ID ${id} could not be found.`};
    }

    const existingInfo = existingUser[0];

    // combine new and old data
    const updatedEntry = {
      ...existingInfo,
      ...req.body,
    };

    console.log("updatedEntry", updatedEntry);

    const {email, first_name, last_name, height, weight, password} =
      updatedEntry;

    const [result] = await promisePool.query(
      'UPDATE Users SET email = ?, first_name = ?, last_name = ?, height = ?, weight = ?, password = ? WHERE user_id = ?',
      [email, first_name, last_name, height, weight, password, id]
    );

    if (result.affectedRows === 0) {
      return {message: `User with ID ${id} was not updated.`};
    }
    return {message: `User with ID ${id} updated.`};
  } catch (e) {
    console.error('Error editUser:', e.message);
    return {error: e.message};
  }
};

// gets user by username and password
const selectUserByNameAndPassword = async (username, password) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT user_id, username, email, created_at, user_level FROM Users WHERE username=? AND password=?',
      [username, password],
    );
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
      'SELECT * FROM Users WHERE username=?',
      [username],
    );
    return rows[0];
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

// delete user
const deleteUser = async (user) => {
  console.log("deleteUser", user);
  try {
    await promisePool.query('DELETE FROM Entries WHERE user_id = ?', [
      user,
    ]);
    const [rows] = await promisePool.query(
      'DELETE FROM Users WHERE user_id = ?',
      [user],
    );
    if (!rows.affectedRows) {
      return {message: `User with ID ${user} could not been deleted.`};
    }
    return {message: `User with ID ${user} deleted.`};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export {
  editUser,
  selectAllUsers,
  selectUserById,
  insertUser,
  selectUserByNameAndPassword,
  selectUserByUsername,
  deleteUser,
};
