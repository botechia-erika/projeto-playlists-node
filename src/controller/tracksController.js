import { matchedData } from "express-validator";
import { handleHttpError } from "../errors/handleError.js";
import {Track} from "../models/track.js";
/** GET obtem lista de items **/
export const getItems = async (req, res) => {
  try {
   

    if (!Track) {
      return res.status(500).json({ message: "Modelo Track não encontrado." });
    }
    // Busca todos os items track do banco de dados
    const data = await Track.find();
    res.status(200).json({data});
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};
export const getItem = async (req, res) => {
  try {
    const dataClean = matchedData(req);
    const { id } = dataClean;
    const data = await Track.findById(id);
    if (!data) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM", error);
  }
}

export const createItem = async (req, res) => {
  try {
    const bodyClean = matchedData(req);
    const newTrack = new Track(bodyClean);
    const savedTrack = await newTrack.save();

    res.status(201).json({ data: savedTrack });
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM", error);
  }
};
export const updateItem = async(req, res) => {
  try {
    const body = matchedData(req);
    const id= req.params.id || body.id;
    const updateData  = req.body;
    const updatedTrack = await Track.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTrack) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ data: updatedTrack });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_ITEM", error);
  }  
}
export const deleteItem = async (req, res) => {
  try {
    const dataClean = matchedData(req);
    const id = req.params.id || dataClean.id;
    const deletedTrack = await Track.deleteById(id); // Soft delete
    if (!deletedTrack) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted (soft) successfully" });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM", error);
  }
};