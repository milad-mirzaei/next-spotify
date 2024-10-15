'use server'


import mongooseClient from "@/libs/mongoose.lib"
import artistModel from "@/models/artistModel"


const GetArtists = async ()=>{

    await mongooseClient()

    const artists = await artistModel.find({})


    return {
        artists
    }

}

export default GetArtists