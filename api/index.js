import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import feedRouter from './routers/feed.js';

dotenv.config();

const app = express();
const port = process.env.VITE_API_PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-User-Id'
  );
  res.setHeader('Content-Type', 'multipart/form-data');
  next();
});

app.use('/api/feed', feedRouter);

app.use((error, req, res, next) => {
  const status = error.satusCode || 500;
  const { message } = error;
  const { data } = error;
  res.status(status).json({ message, data });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${port}`);
});
