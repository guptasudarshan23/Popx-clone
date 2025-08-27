import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000', 'https://*'], credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.send({ ok: true, service: 'PopX API' }));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on ${PORT}`));
}).catch(err => {
  console.error('DB connection failed', err);
  process.exit(1);
});