import express from 'express';
import morgan from 'morgan';
import config from './config';

const { NODE_ENV } = config;
const app = express();

if (NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(express.json());

export default app;
