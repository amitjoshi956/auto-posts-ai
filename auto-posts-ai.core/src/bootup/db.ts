import mongoose from 'mongoose';

const DB_URI = process.env.DB_CONNECT || '';

export const connectDB = async () => {
  if (!DB_URI) {
    console.error('Database connection URI is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URI, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    });
    console.log('Connection to DB established successfully');
  } catch (error) {
    console.error('Connection error:', error);
    process.exit(1);
  }
};
