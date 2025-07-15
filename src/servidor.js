import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routers/routerUser.js';
import authRoutes from './routers/routerLogin.js';
import taskRoutes from './routers/routerTask.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/test', (req, res) => {
  res.json({ message: 'Ruta de prueba funcionando' });
});

app.get('/', (req, res) => {
  res.send('API de Sistema de Agendamiento de Tareas');
});

export default app;
