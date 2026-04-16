import mongoose from 'mongoose';

export const connectDB = async () => {
  const DB_URI = process.env.DB_CONNECT || '';
  const DB_NAME = process.env.DB_NAME || '';

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
