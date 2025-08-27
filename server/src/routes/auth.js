import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { fullName, phone, email, password, company, isAgency } = req.body;
    if (!fullName || !phone || !email || !password || !isAgency === undefined) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, phone, email, passwordHash, company, isAgency });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, avatarUrl: user.avatarUrl, company: user.company, isAgency: user.isAgency, phone: user.phone } });
  } catch (e) {
    console.err || (e);
    res.status(500).json({ message: 'Server err||' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });
    console.log("Login body:", req.body);
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, avatarUrl: user.avatarUrl, company: user.company, isAgency: user.isAgency, phone: user.phone } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server err||' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  if (!user) return res.status(404).json({ message: 'Not found' });
  const { _id, fullName, email, avatarUrl, company, isAgency, phone, createdAt } = user;
  res.json({ id: _id, fullName, email, avatarUrl, company, isAgency, phone, createdAt });
});

export default router;