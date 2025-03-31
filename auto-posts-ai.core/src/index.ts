import express from 'express';
import serverless from 'serverless-http';

import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', postRoutes);
app.use('/auth', authRoutes);

export const handler = serverless(app)