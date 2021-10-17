import express from 'express';
import morgan from 'morgan';
import config from './config';
import tickets from './api/tickets';
import flights from './api/flights';

const { NODE_ENV } = config;
const app = express();

if (NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/tickets', tickets);
app.use('/api/flights', flights);

export default app;
