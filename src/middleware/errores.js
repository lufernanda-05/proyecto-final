export const errores = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
