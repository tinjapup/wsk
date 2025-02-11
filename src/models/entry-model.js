// temporal mock data for testing, should be replaced with real data from DB

import promisePool from '../utils/database.js';

/*
const diaryEntries = [
  {
    "entry_id": 5,
    "user_id": 5,
    "entry_date": "2024-01-14",
    "mood": "Relaxed",
    "weight": 75.0,
    "sleep_hours": 8,
    "notes": "Spent the day reading",
    "created_at": "2024-01-14T19:00:00"
  },
  {
    "entry_id": 4,
    "user_id": 4,
    "entry_date": "2024-01-13",
    "mood": "Energetic",
    "weight": 55.0,
    "sleep_hours": 9,
    "notes": "Went for a morning run",
    "created_at": "2024-01-13T18:00:00"
  },
  {
    "entry_id": 3,
    "user_id": 3,
    "entry_date": "2024-01-12",
    "mood": "Tired",
    "weight": 68.0,
    "sleep_hours": 6,
    "notes": "Work was demanding",
    "created_at": "2024-01-12T22:00:00"
  },
  {
    "entry_id": 2,
    "user_id": 2,
    "entry_date": "2024-01-11",
    "mood": "Satisfied",
    "weight": 65.0,
    "sleep_hours": 7,
    "notes": "Met with friends, had a good time",
    "created_at": "2024-01-11T21:00:00"
  },
  {
    "entry_id": 1,
    "user_id": 1,
    "entry_date": "2024-01-10",
    "mood": "Happy",
    "weight": 70.5,
    "sleep_hours": 8,
    "notes": "Had a great workout session",
    "created_at": "2024-01-10T20:00:00"
  }
];

*/

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id) => {
  console.log("findEntryById testing");
  try {
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries WHERE entry_id = ?', [id]);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry) => {
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};


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

export {listAllEntries, listAllUsers, findEntryById, addEntry, findUserById, addUser};
