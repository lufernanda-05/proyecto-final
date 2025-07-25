import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routers/routerUser.js';
import authRoutes from './routers/routerLogin.js';
import taskRoutes from './routers/routerTask.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Carpeta uploads para imágenes
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Carpeta front para frontend estático
app.use(express.static(path.join(__dirname, '../../front')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front/home.html'));
});

// Rutas API
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
