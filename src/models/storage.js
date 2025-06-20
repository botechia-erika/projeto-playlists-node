import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const StorageSchema = new mongoose.Schema({
  url: {type: String, required: true},
  filename: {type: String, required: true},
},{
    timestamps: true,
    versionKey: false
});
StorageSchema.plugin(MongooseDelete, { overrideMethods: 'all',deletedAt: true}); 
export const Storage = mongoose.model('storage', StorageSchema);