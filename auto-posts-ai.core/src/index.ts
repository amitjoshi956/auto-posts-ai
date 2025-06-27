import express from 'express';

import authRoutes from '@routes/auth.js';
import postRoutes from '@routes/post.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', postRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}'`);
});
