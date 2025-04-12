import { CorsOptions } from 'cors';

const allowedOrigins = [
  "http://localhost:3000",
  "https://civic-link-fe-temp-jog1.vercel.app",
  "https://civic-link-again.vercel.app",
  "*",
  // allowing * will allow all origins to access the API
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
