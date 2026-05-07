import mongoose from 'mongoose';
import { env } from '@base/config/env';

export const connectDB = async () => {
  const DB_URI = env.dbUri;
  const DB_NAME = env.dbName;

  if (!DB_URI) {
    console.error('🚫 Database connection URI is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URI, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
      dbName: DB_NAME,
    });
    console.log('✅ Connection to DB established successfully');
  } catch (error) {
    console.error('❌ Connection error: ', error);
    process.exit(1);
  }
};
