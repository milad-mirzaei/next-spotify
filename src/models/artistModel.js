import mongoose from "mongoose";


const artistSchema = new mongoose.Schema({
    fullName:{type:String,required:true},
    image:{type:String,required:true},
})

const artistModel = mongoose.models?.artist || mongoose.model('artist',artistSchema)

export default artistModel