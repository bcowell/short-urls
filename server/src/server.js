import express from 'express';
import cors from 'cors';
import router from 'routes/index.js';
import { baseURL } from 'constants/api';
import { OK } from 'http-status-codes';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(baseURL + '/health', (req, res) => res.status(OK).send('Healthy!'));
app.use(baseURL, router);

app.listen(PORT);
console.log(`Running on localhost port ${PORT}`);

export default app;