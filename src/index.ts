import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import connection from '../src/config/db';
import logger from '../src/middleware/logger';
import usersRouter from './routes/users-route';
import blogRouter from './routes/blog-route';

const PORT: number = parseInt(process.env.PORT || '3000', 10);



const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/api/auth', usersRouter);
app.use('/api/posts', blogRouter);

const server = app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Successfully connected to MONGODB.');
  } catch (error) {
    console.log('Failed to connect MONGODB due to error:', error);
  }
  console.log(`Server is up and running on ${PORT}`);
});

export { app, server };