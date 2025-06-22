import express, {Router} from "express";
import * as storageController from "../controller/storageController.js";
import { uploadMiddleware } from "../config/multer.js";
import { validatorDeleteItem, validatorGetItem } from "../validators/storage.js";
const router = express.Router();


// single para 1 upload, multi para varios uploads
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

router.get('/', storageController.getItems);          
router.get('/:id', validatorGetItem, storageController.getItem);
router.delete('/:id', validatorDeleteItem, storageController.deleteItem);    

export default router