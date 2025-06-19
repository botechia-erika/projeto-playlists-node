import express, {Router} from "express";
import * as tracksController from '../controller/tracksController.js';
import {validatorCreateItem} from "../validators/tracks.js";
import { customHeader } from "../middlewares/customHeader.js";
const router = express.Router();


router.get('/', tracksController.getItems);
router.post('/', validatorCreateItem, customHeader, tracksController.createItem);

export default router