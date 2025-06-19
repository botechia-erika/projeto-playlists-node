import dotenv from 'dotenv';
dotenv.config();
const port = Number(process.env.PORT) || 3000;
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dbConnect from './config/mongoose.js';
import tracksRouter from './routes/tracksRouter.js';
import usersRouter from './routes/usersRouter.js';
import storageRouter from './routes/storageRouter.js';
import mainRouter from './routes/mainRouter.js';
const app = express();
app.use(express.static('public'));
app.use(express.static('src/storage'));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();

/*app.use('/api/tracks', tracksRouter);
app.use('/api/users', usersRouter);
app.use('/api/storage', storageRouter);*/
app.use('/', mainRouter);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})