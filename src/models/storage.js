import mongoose from "mongoose";

const StorageSchema = new mongoose.Schema({
  url: {type: String, required: true},
  filename: {type: String, required: true},
},{
    timestamps: true,
    versionKey: false
});

export const Storage = mongoose.model('storage', StorageSchema);