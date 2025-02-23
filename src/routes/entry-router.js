import express from 'express';
import {
  getEntryById,
  postEntry,
  putEntry,
  eraseEntry,
  updateEntry
} from '../controllers/entry-controller.js';
import { authenticateToken } from '../middlewares/authentication.js';

const entryRouter = express.Router();

entryRouter.route('/')
  .get(authenticateToken, getEntryById)
  .post(authenticateToken, postEntry)
  .delete(authenticateToken, eraseEntry)
  .put(authenticateToken, updateEntry);

  entryRouter.route('/:id')
  .get(authenticateToken, getEntryById)
  .put(authenticateToken, putEntry);

export default entryRouter;
