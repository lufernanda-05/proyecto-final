import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/images', (req, res) => {
  const uploadsDir = path.join(process.cwd(), 'uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer la carpeta uploads', error: err.message });
    }

    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    const imagesUrls = images.map(file => `${req.protocol}://${req.get('host')}/uploads/${file}`);

    res.json(imagesUrls);
  });
});

router.get('/images/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(process.cwd(), 'uploads', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'Archivo no encontrado' });
    }
    res.download(filePath);
  });
});

export default router;
