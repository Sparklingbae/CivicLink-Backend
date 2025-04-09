/// File: src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './modules/db/initDb';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});