import mongoose, { Schema } from "mongoose";
import artistModel from '../models/artistModel.js'
import albumModel from '../models/albumModel.js'


const songSchema = new mongoose.Schema({
    name:{type:String,required:true},
    desc:{type:String,required:true},
    image:{type:String,required:true},
    file:{type:String,required:true},
    duration:{type:Number,required:true},
    artistId:{type:Schema.Types.ObjectId,required:true,ref:artistModel},
    albumId:{type:Schema.Types.ObjectId,ref:albumModel},
})

const songModel = mongoose.models?.song || mongoose.model('song',songSchema)

export default songModel