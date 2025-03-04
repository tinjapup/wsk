import express from 'express';
import {
  getActivities
} from '../controllers/act-controller.js';
//import { authenticateToken } from '../middlewares/authentication.js';

const actRouter = express.Router();

actRouter.route('/')
  .get(getActivities)

export default actRouter;
