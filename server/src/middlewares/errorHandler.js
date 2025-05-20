const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message || "Error de validación",
    });
  }

  console.error("Error inesperado:", err);
  res.status(500).json({ error: "Error inesperado del servidor" });
};

export default errorHandler;
