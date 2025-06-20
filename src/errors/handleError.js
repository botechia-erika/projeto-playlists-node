export const handleHttpError = (res, message, error = {}) => {
  console.error(message, error); // Mostra o erro no console para debug
  res.status(500).json({ error: message });
};