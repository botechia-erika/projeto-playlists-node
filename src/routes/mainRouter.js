import fs from 'fs';
import path from 'path';
import express, { Router } from 'express';
import * as mainController from '../controller/mainController.js';
import * as pagesController from '../controller/pagesController.js';

const router = express.Router();
const PATH_ROUTERS = path.resolve('./src/routes');

// Rotas principais
router.get("/", mainController.getMain);

// Rotas para páginas
router.get("/404", pagesController.serve404Page);
router.get("/demo", pagesController.serveDemoPage);
router.get("/api/info", pagesController.getApiInfo);

// Swagger documentation routes
/**
 * @swagger
 * /:
 *   get:
 *     summary: Página inicial da API
 *     tags: [Main]
 *     description: Retorna a landing page da API
 *     responses:
 *       200:
 *         description: Página inicial carregada com sucesso
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /api/info:
 *   get:
 *     summary: Informações da API
 *     tags: [Main]
 *     description: Retorna informações gerais sobre a API
 *     responses:
 *       200:
 *         description: Informações da API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Projeto Playlists API"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 description:
 *                   type: string
 *                   example: "API RESTful para gerenciamento de playlists musicais"
 *                 author:
 *                   type: string
 *                   example: "Erika Botechia"
 *                 status:
 *                   type: string
 *                   example: "online"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */

function removeExtension(file) {
  return file.split('Router.').shift();
}

async function loadRoutes() {
  const files = fs.readdirSync(PATH_ROUTERS);
  for (const file of files) {
    const name = removeExtension(file);
    if (name !== 'main') {
      console.log(`root loading ${name}`);
      const routeModule = await import(`./${file}`);
      router.use(`/api/${name}`, routeModule.default);
    }
  }
}

const loadRouter = async () => {
  await loadRoutes();
}
loadRouter()

export default router;