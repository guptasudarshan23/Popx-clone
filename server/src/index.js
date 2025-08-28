import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// API routes
app.use('/api/auth', authRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, '../client/dist');
  app.use(express.static(frontendPath));

  app.get('*', (_, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

console.log("MONGO_URI:", process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on ${PORT}`));
}).catch(err => {
  console.error('DB connection failed', err);
  process.exit(1);
});
