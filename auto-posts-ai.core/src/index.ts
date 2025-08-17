import express from 'express';
import { bootup } from '@bootup/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

const startup = async () => {
  await bootup(app);

  app.listen(PORT, () => console.log(`✅🚀 Server is running on http://localhost:${PORT}`));
};

startup().catch((error) => {
  console.error('❌ Error starting the app: ', error);
  process.exit(1);
});
