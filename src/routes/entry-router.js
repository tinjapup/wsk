import express from 'express';
import {body} from 'express-validator';
import {
  getEntryById,
  postEntry,
  eraseEntry,
  updateEntry,
} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

entryRouter
  .route('/')

  .get(authenticateToken, getEntryById)

  .post(
    body('entry_date').notEmpty().isDate(),
    body('activity').notEmpty().trim(),
    body('duration', 'Duration must be numbers')
      .notEmpty()
      .trim()
      .isNumeric()
      .isLength({max: 20}),
    body('title').notEmpty().trim().isLength({max: 140}),
    body('notes').trim().isLength({max: 140}),
    authenticateToken,
    validationErrorHandler,
    postEntry,
  )

  .delete(authenticateToken, eraseEntry)

  .put(
  body('notes').trim().isLength({max: 140}),
  authenticateToken,
  validationErrorHandler,updateEntry
);

entryRouter
  .route('/:id')
  .get(authenticateToken, getEntryById)

export default entryRouter;
