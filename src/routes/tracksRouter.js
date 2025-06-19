import express, {Router} from "express";
import * as tracksController from '../controller/tracksController.js';
const router = express.Router();


router.get('/', tracksController.getItems);
router.post('/', tracksController.createItem);

export default router