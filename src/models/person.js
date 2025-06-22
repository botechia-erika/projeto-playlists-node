import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
const PersonSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
},{
    timestamps: true,
    versionKey: false
});
PersonSchema.plugin(MongooseDelete, { overrideMethods: 'all',deletedAt: true}); 

export const Person = mongoose.model('persons', PersonSchema);