import dotenv from 'dotenv';
dotenv.config();
const port = Number(process.env.PORT) || 3000;
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dbConnect from './config/mongoose.js';
import { specs, swaggerUi } from './config/swagger.js';
import { notFoundHandler, errorHandler, logNotFound } from './middlewares/errorHandler.js';
import tracksRouter from './routes/tracksRouter.js';
import usersRouter from './routes/usersRouter.js';
import storageRouter from './routes/storageRouter.js';
import mainRouter from './routes/mainRouter.js';

const app = express();

// Middlewares básicos
app.use(express.static('public'));
app.use(express.static('src/storage'));
app.use(express.static('docs'));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: `
    .swagger-ui .topbar { 
      background-color: #1f2937; 
    }
    .swagger-ui .topbar-wrapper .link { 
      color: #ffffff; 
    }
  `,
  customSiteTitle: "Projeto Playlists API Documentation"
}));

// Conexão com banco de dados
dbConnect();

// Rotas principais
app.use('/', mainRouter);

// Middleware para tratar rotas não encontradas (404)
app.use(logNotFound);
app.use(notFoundHandler);

// Middleware para tratar erros gerais
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger documentation available at: http://localhost:${port}/api-docs`);
    console.log(`Landing page available at: http://localhost:${port}`);
    console.log(`Interactive demo available at: http://localhost:${port}/demo.html`);
})