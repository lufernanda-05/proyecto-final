import Task from '../models/modelTask.js';
import mongoose from 'mongoose';

export const createTask = async (req, res) => {
  try {
    const { titulo, descripcion, fechaDeVencimiento } = req.body;
    const task = new Task({
      titulo,
      descripcion,
      fechaDeVencimiento,
      usuario: req.user.id
    });
    await task.save();
    res.status(201).json({ message: 'Tarea creada exitosamente', task });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea', error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ usuario: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de tarea inválido' });
    }
    const { titulo, descripcion, fechaDeVencimiento, estado, calificacion } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, usuario: req.user.id },
      { titulo, descripcion, fechaDeVencimiento, estado, calificacion },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea actualizada exitosamente', task });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, usuario: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea', error: error.message });
  }
};

