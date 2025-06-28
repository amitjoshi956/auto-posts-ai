import 'dotenv/config';
import { connectDB } from './db';

export async function bootup() {
  // Connect to the database
  await connectDB();

  console.log('Bootup completed successfully.');
}

// If this file is run directly, execute bootup
if (require.main === module) {
  bootup().catch((err) => {
    console.error('Bootup failed:', err);
    process.exit(1);
  });
}
