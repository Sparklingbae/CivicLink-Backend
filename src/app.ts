/// File: src/app.ts
import express from 'express';
import { json } from 'body-parser';

const app = express();

app.use(json());

// Register routes here (e.g. /api/customers)

export default app;
