import * as express from 'express';
import { ScrapeController, LoadController } from '../controllers/index';

const api = express.Router();

api.post('/scrape/create', ScrapeController.create);
api.get('/load/get-all', LoadController.getAll);
api.get('/load/get-book/:id', LoadController.getBook);

export default api;
