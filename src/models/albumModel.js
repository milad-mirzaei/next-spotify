import mongoose, { Schema } from "mongoose";
import artistModel from "./artistModel.js";

const albumSchema = new mongoose.Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    bgColor:{type:String,required:true},
    image:{type:String,required:true},
    artistId:{type:Schema.Types.ObjectId,required:true,ref:artistModel}
})

const albumModel = mongoose.models.album || mongoose.model('album',albumSchema)

export default albumModel