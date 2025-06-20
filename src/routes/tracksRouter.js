import express, {Router} from "express";
import * as tracksController from '../controller/tracksController.js';
import {validatorCreateItem, validatorDeleteItem, validatorGetItem} from "../validators/tracks.js";
import { customHeader } from "../middlewares/customHeader.js";
const router = express.Router();


router.get('/', tracksController.getItems);
router.post('/', validatorCreateItem, customHeader, tracksController.createItem);
router.get('/:id', validatorGetItem, tracksController.getItem);
router.put('/:id',  validatorGetItem , tracksController.updateItem);
router.delete('/:id',validatorDeleteItem, tracksController.deleteItem);


export default router