import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const schemaUser = new Schema({
  nombre: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Email inválido']
  },
  password: { type: String, required: true, trim: true },
  imagen: { type: String }
});

schemaUser.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default model('User', schemaUser);

