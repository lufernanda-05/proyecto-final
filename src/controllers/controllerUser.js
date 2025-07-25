import User from '../models/modelUser.js';

export const createUser = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const imagen = req.file ? req.file.filename : null;

    const user = new User({ nombre, email, password, imagen });
    await user.save();

    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');  // Excluye el campo password para seguridad
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email } = req.body;
    const user = await User.findByIdAndUpdate(id, { nombre, email }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await User.findByIdAndDelete(id);
    res.json({ message: `Usuario ${user.nombre} eliminado exitosamente` });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};
