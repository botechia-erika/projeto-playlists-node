import models from "./../models/index.js";

/** GET obtem lista de items **/
export const getItems = async (req, res) => {
  try {
    const { Track } = models;
    
    if (!Track) {
      return res.status(500).json({ message: "Modelo Track não encontrado." });
    }
    // Busca todos os items track do banco de dados
    const data = await Track.find();
    res.status(200).json({data});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getItem = async(req, res) => {
   
}

export const createItem = async(req, res) => {
   const {body} = req;
   console.log(body);
   res.send({algo: "ok", body});
}

export const updateItem = async(req, res) => {
   
}

export const deleteItem = async(req, res) => {
   
}