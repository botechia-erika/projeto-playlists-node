import fs from 'fs';
import path from 'path';
import express from 'express';

const router = express.Router();
const PATH_ROUTERS = path.resolve('./src/routes');

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