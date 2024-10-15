'use server'


import mongooseClient from "@/libs/mongoose.lib"
import songModel from "@/models/songModel"


const GetSongs = async ()=>{

    await mongooseClient()

    const songs = await songModel.find({})

    console.log(songs)

    return {
        songs
    }

}

export default GetSongs