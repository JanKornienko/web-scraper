import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import api from './routes/api';
import path from 'path';

dotenv.config({ path: path.join(__dirname, './../../../.env') });

const app: Express = express();
const port = process.env.API_PORT || 3001;

app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

app.use('/', api);

app.listen(port, () => {
	console.log(
		`⚡️ API server listening on port ${port}! --> http://localhost:${port}`
	);
});
