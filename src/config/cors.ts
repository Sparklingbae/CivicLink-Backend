import { CorsOptions } from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://civic-link-fe-temp-jog1.vercel.app",
  "https://civic-link-again.vercel.app",
  "*",
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl requests, etc)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Allow all origins in non-production
    if (process.env.NODE_ENV !== "production") {
      callback(null, true);
      return;
    }

    // In production: check against our allowed list OR allow all origins if intended
    if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
