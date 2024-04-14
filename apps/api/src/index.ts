import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import api from './routes/api';

dotenv.config();

const app: Express = express();
const port = process.env.API_PORT || 3001;

app.set('trust proxy', 1);

const allowedOrigins = [`${process.env.WEB_URL}`, '*'];

const options: cors.CorsOptions = {
	credentials: true,
	origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

app.use('/', api);

app.listen(port, () => {
	console.log(
		`⚡️ API server listening on port ${port}! --> http://localhost:${port}`
	);
});
