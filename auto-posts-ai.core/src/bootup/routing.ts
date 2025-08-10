import { Express } from 'express';
import { authRoutes, postRoutes, userRoutes } from '@routes/.';

export const setupRoutes = (app: Express) => {
  app.use('/', postRoutes);
  app.use('/auth', authRoutes);
  app.use('/user', userRoutes);
};
