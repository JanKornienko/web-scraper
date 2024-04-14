import * as express from 'express';
import { DataController } from '../controllers/index';

const api = express.Router();

api.post('/create', DataController.create);

export default api;
