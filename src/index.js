import app from './servidor.js';
import dotenv from 'dotenv';
import connectDB from './conexion.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(3000, () => {
    console.log(`Servidor escuchando en http://localhost:3000`);
  });
});
