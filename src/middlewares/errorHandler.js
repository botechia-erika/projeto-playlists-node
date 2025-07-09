import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Middleware para tratar rotas não encontradas (404)
 * Serve a página de erro 404 personalizada
 */
export const notFoundHandler = (req, res, next) => {
  // Se a requisição é para a API, retorna JSON
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({
      message: 'Endpoint não encontrado',
      error: 'NOT_FOUND',
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
      suggestion: 'Verifique a documentação em /api-docs'
    });
  }

  // Para outras rotas, serve a página HTML de erro 404
  res.status(404).sendFile(path.join(__dirname, '../../public/error404.html'));
};

/**
 * Middleware para tratar erros gerais do servidor
 */
export const errorHandler = (error, req, res, next) => {
  console.error('Erro no servidor:', error);

  // Se a requisição é para a API, retorna JSON
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(500).json({
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'INTERNAL_SERVER_ERROR',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    });
  }

  // Para outras rotas, redireciona para a página de erro 404
  res.status(500).sendFile(path.join(__dirname, '../../public/error404.html'));
};

/**
 * Middleware para log de requisições 404
 */
export const logNotFound = (req, res, next) => {
  console.log(`[404] ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
};
