import express, {Router} from "express";
import * as tracksController from '../controller/tracksController.js';
import {validatorCreateItem, validatorDeleteItem, validatorGetItem} from "../validators/tracks.js";
import { customHeader } from "../middlewares/customHeader.js";
import { authMiddleware } from "../middlewares/session.js";
const router = express.Router();

/**
 * @swagger
 * /api/tracks:
 *   get:
 *     summary: Lista todas as músicas
 *     tags: [Tracks]
 *     description: Retorna uma lista de todas as músicas cadastradas no sistema
 *     responses:
 *       200:
 *         description: Lista de músicas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Track'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', tracksController.getItems);

/**
 * @swagger
 * /api/tracks:
 *   post:
 *     summary: Cria uma nova música
 *     tags: [Tracks]
 *     description: Cadastra uma nova música no sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - album
 *               - artist
 *               - duration
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da música
 *                 example: "Bohemian Rhapsody"
 *               album:
 *                 type: string
 *                 description: Nome do álbum
 *                 example: "A Night at the Opera"
 *               cover:
 *                 type: string
 *                 description: URL da capa do álbum
 *                 example: "https://example.com/cover.jpg"
 *               artist:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nome do artista
 *                     example: "Freddie Mercury"
 *                   nickname:
 *                     type: string
 *                     description: Nome artístico
 *                     example: "Queen"
 *                   nationality:
 *                     type: string
 *                     description: Nacionalidade
 *                     example: "British"
 *               duration:
 *                 type: object
 *                 properties:
 *                   start:
 *                     type: number
 *                     description: Tempo de início em segundos
 *                     example: 0
 *                   end:
 *                     type: number
 *                     description: Tempo de fim em segundos
 *                     example: 355
 *               mediaId:
 *                 type: string
 *                 description: ID do arquivo de mídia associado
 *     responses:
 *       201:
 *         description: Música criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Track'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/' ,validatorCreateItem, tracksController.createItem);

/**
 * @swagger
 * /api/tracks/{id}:
 *   get:
 *     summary: Busca uma música por ID
 *     tags: [Tracks]
 *     description: Retorna os detalhes de uma música específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da música
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Música encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Track'
 *       404:
 *         description: Música não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', validatorGetItem, tracksController.getItem);

/**
 * @swagger
 * /api/tracks/{id}:
 *   put:
 *     summary: Atualiza uma música
 *     tags: [Tracks]
 *     description: Atualiza os dados de uma música existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da música
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da música
 *               album:
 *                 type: string
 *                 description: Nome do álbum
 *               cover:
 *                 type: string
 *                 description: URL da capa
 *               artist:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   nickname:
 *                     type: string
 *                   nationality:
 *                     type: string
 *               duration:
 *                 type: object
 *                 properties:
 *                   start:
 *                     type: number
 *                   end:
 *                     type: number
 *     responses:
 *       200:
 *         description: Música atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Track'
 *       404:
 *         description: Música não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id',  validatorGetItem , tracksController.updateItem);

/**
 * @swagger
 * /api/tracks/{id}:
 *   delete:
 *     summary: Deleta uma música
 *     tags: [Tracks]
 *     description: Remove uma música do sistema (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da música
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Música deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deleted (soft) successfully"
 *       404:
 *         description: Música não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id',validatorDeleteItem, tracksController.deleteItem);

export default router