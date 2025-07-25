import { Schema, model } from 'mongoose';

const esquemaTareas = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  estado: { 
    type: String, 
    enum: ['pendiente', 'en progreso', 'completada'],
    default: 'pendiente'
  },
  fechaDeVencimiento: { type: Date, required: true },
  calificacion: { type: Number, min: 0, max: 5, default: 0 },
  usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  versionKey: false,
  timestamps: true
});

export default model('Task', esquemaTareas);