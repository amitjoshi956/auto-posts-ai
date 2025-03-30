import express from 'express';
import { getPort } from './config.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';

const app = express();
const port = getPort();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', postRoutes);
app.use('/auth', authRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
