import express from "express";
import * as storageController from "../controller/storageController.js";
import { uploadMiddleware } from "../config/multer.js";
import { validatorDeleteItem, validatorGetItem } from "../validators/storage.js";
import { authMiddleware } from "../middlewares/session.js";
import { customHeader } from "../middlewares/customHeader.js";
const router = express.Router();

/**
 * @swagger
 * /api/storage:
 *   post:
 *     summary: Upload de arquivo de áudio
 *     tags: [Storage]
 *     description: Faz upload de um arquivo de áudio para o servidor
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               inputFile:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de áudio para upload
 *     responses:
 *       201:
 *         description: Arquivo enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Storage'
 *       400:
 *         description: Arquivo inválido ou não enviado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  '/',
 uploadMiddleware.single('inputFile'),
  (req, res, next) => {
	if (!storageController.createItem) {
	  return res.status(500).json({ error: 'createItem controller not found' });
	}
	return storageController.createItem(req, res, next);
  }
);

/**
 * @swagger
 * /api/storage:
 *   get:
 *     summary: Lista todos os arquivos
 *     tags: [Storage]
 *     description: Retorna uma lista de todos os arquivos armazenados
 *     responses:
 *       200:
 *         description: Lista de arquivos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Storage'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', storageController.getItems);

/**
 * @swagger
 * /api/storage/{id}:
 *   get:
 *     summary: Busca um arquivo por ID
 *     tags: [Storage]
 *     description: Retorna os detalhes de um arquivo específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do arquivo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arquivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Storage'
 *       404:
 *         description: Arquivo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', validatorGetItem, storageController.getItem);

/**
 * @swagger
 * /api/storage/{id}:
 *   delete:
 *     summary: Deleta um arquivo
 *     tags: [Storage]
 *     description: Remove um arquivo do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do arquivo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Arquivo deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File deleted successfully"
 *       404:
 *         description: Arquivo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', validatorDeleteItem, storageController.deleteItem);

export default router