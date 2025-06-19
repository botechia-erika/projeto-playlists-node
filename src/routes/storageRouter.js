import express, {Router} from "express";
import * as storageController from "../controller/storageController.js";
import { uploadMiddleware } from "../config/multer.js";
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

export default router