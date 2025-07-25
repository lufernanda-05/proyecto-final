import express from 'express';
import { auth } from '../middleware/auth.js';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/controllerTask.js';

const router = express.Router();

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;
