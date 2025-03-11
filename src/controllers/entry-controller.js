import {
  findEntryById,
  findAllEntries,
  addEntry,
  deleteEntry,
  editEntry,
} from '../models/entry-model.js';
import {validationResult} from 'express-validator';

const getEntryById = async (req, res, next) => {
  console.log('getEntryById test', req.body.entry_id);
  console.log('req.user', req.userId);
  console.log('req.headers', req.headers.id);

  let entry;
  try {
    if (req.body.entry_id === 0) {
      entry = await findAllEntries(req.userId);
    } else {
      entry = await findEntryById(req.userId, req.headers.id);
      console.log(entry);
    }

    if (entry) {
      res.json(entry);
    }
  } catch (error) {
    next(error);
  }
};

const postEntry = async (req, res, next) => {

  console.log("post entryssä asti");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  try {
    const newEntry = req.body;

    newEntry.user_id = req.userId;

    const result = await addEntry(newEntry);

    if (result.entry_id) {
      return res.status(201).json({message: 'Entry added.', ...result});
    }
    const error = new Error('Failed to add entry.');
    error.status = 500;
    return next(error);
  } catch (error) {
    res.status(500).json({message: error.message});
    return next(error);
  }
};


const eraseEntry = async (req, res, next) => {
  console.log('eraseEntry testing, req', req.body);
  console.log('req.user', req.userId);
  try {
    const result = await deleteEntry(req.userId, req.body.entry_id);
    if (!result.error) {
      return res.json(result);
    }
  } catch (error) {
    res.status(500).json({message: error.message});
    return next(error);
  }
};

const updateEntry = async (req, res, next) => {
  console.log('entry-controller, updateEntry');
  console.log('req.body', req.body);
  console.log('req.user', req.userId);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  const {entry_id, ...updates} = req.body;

  try {
    const result = await editEntry(req.userId, entry_id, updates);
    console.log('result', result);
    if (result.message) {
      return res.status(200).json(result);
    } else {
      const error = new Error('Failed to update entry.');
      error.status = 500;
      return next(error);
    }
  } catch (error) {
    res.status(500).json({message: error.message});
    return next(error);
  }
};


export {updateEntry, getEntryById, postEntry, eraseEntry};
