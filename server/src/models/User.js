import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: ''
  },
  isAgency: {
    type: Boolean,
    default: false
  },
  avatarUrl: {
    type: String,
    default: 'https://i.pravatar.cc/100'
  }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);