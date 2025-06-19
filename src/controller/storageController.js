import models from "./../models/index.js";
import dotenv from "dotenv";
dotenv.config();
const PUBLIC_URL = process.env.BASE_URL || "http://localhost:3003/";



/** GET obtem lista de items **/
export const getItems = async (req, res) => {
  try {
    const { Storage } = models;
    if (!Storage) {
      return res.status(500).json({ message: "Modelo Track não encontrado." });
    }
    // Busca todos os items track do banco de dados
    const data = await Storage.find();
    res.status(200).json({data});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getItem = async(req, res) => {
   
}

export const createItem = async(req, res) => {
    try {
        const { Storage } = models;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded." });
        }
        console.log(file);

        const fileData = {
            url: `${PUBLIC_URL}${file.filename}`,
            filename: file.filename
        };
        const data = await Storage.create(fileData);
        res.status(201).json({ data });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "500: Internal Server Error" });
    }
};


export const updateItem = async(req, res) => {
   
}

export const deleteItem = async(req, res) => {
   
}