import express from 'express';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
  getUsers,
  getUserById,
  postUser
} from '../controllers/entry-controller.js';

const entryRouter = express.Router();

entryRouter.route('/api/entries')
.get(getEntries).post(postEntry);

entryRouter.route('/api/entries/:id')
  .get(getEntryById).post(postEntry)
  .put(putEntry) 
  .delete(deleteEntry); 

entryRouter.route('/api/users')
.get(getUsers)
.post(postUser); 

entryRouter.route('/api/users/:id')
.get(getUserById); 


export default entryRouter;
