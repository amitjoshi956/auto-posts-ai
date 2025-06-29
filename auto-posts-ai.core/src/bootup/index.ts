import 'dotenv/config';
import express, { Express } from 'express';
import { connectDB } from './db';
import { setupRoutes } from './routing.js';

export async function bootup(app: Express) {
  // Connect to the database
  await connectDB();

  // Setup midldlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // setup routes
  setupRoutes(app);

  console.log('Application bootup successful.');
}
