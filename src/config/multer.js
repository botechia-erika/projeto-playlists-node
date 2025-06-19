import multer from "multer";
import dotenv from "dotenv";
dotenv.config();


/*** Configuração de Multer ***/

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathStorage = process.env.STORAGE_PATH || 'src/storage'
        cb(null, pathStorage);
    },
    filename: (req, file, cb) => {
        const dateName = Date.now();
        const fileName = `${dateName}-${file.originalname}`;
        cb(null, fileName);
    }
})

export const uploadMiddleware = multer({storage})