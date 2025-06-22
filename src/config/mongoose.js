import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}



export default dbConnect;