import express from 'express';
import { createUser, updateUser, deleteUser } from '../controllers/controllerUser.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('imagen'), createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;

