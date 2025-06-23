import fs from 'fs';
import path from 'path';
import express, { Router } from 'express';
import * as mainController from '../controller/mainController.js';
const router = express.Router();
const PATH_ROUTERS = path.resolve('./src/routes');

router.get("/", mainController.getMain);


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