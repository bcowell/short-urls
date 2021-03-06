import express from 'express';
import cors from 'cors';
import router from 'routes/index.js';
import connectMongoDB from './config/db';
import { baseUrl } from 'constants/api';
import { OK } from 'http-status-codes';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoDB();

app.get(baseUrl + '/health', (req, res) => res.status(OK).send('Healthy!'));
app.use(baseUrl, router);

app.listen(PORT);
console.log(`Running on localhost port ${PORT}`);

export default app;