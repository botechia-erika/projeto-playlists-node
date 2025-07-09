import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Controlador para servir a página de erro 404
 */
export const serve404Page = (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../../public/error404.html'));
};

/**
 * Controlador para servir a página principal
 */
export const serveHomePage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
};

/**
 * Controlador para servir a página de demo
 */
export const serveDemoPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/demo.html'));
};

/**
 * Controlador para informações da API
 */
export const getApiInfo = (req, res) => {
  res.json({
    name: 'Projeto Playlists API',
    version: '1.0.0',
    description: 'API RESTful para gerenciamento de playlists musicais',
    author: 'Erika Botechia',
    endpoints: {
      swagger: '/api-docs',
      demo: '/demo.html',
      tracks: '/api/tracks',
      storage: '/api/storage',
      users: '/api/users'
    },
    documentation: {
      swagger: `${req.protocol}://${req.get('host')}/api-docs`,
      demo: `${req.protocol}://${req.get('host')}/demo.html`,
      postman: `${req.protocol}://${req.get('host')}/postman-collection.json`
    },
    status: 'online',
    timestamp: new Date().toISOString()
  });
};
