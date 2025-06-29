import { Express } from 'express';
import { authRoutes, postRoutes } from '@routes/.';

export const setupRoutes = (app: Express) => {
  app.use('/', postRoutes);
  app.use('/auth', authRoutes);
};
