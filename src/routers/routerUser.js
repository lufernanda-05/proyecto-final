import express from 'express';
import { createUser, updateUser, deleteUser, getUsers } from '../controllers/controllerUser.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('imagen'), createUser);
router.get('/', getUsers);  // Aquí la función debe estar importada
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;





