import mongooseClient from '@/libs/mongoose.lib'
import albumModel from '@/models/albumModel'
import { NextRequest, NextResponse } from 'next/server' // Import NextResponse

export async function GET(req: NextRequest ,  { params }: { params: { artistId: string } }) {
    console.log(req.method)
    const {artistId} = params
    console.log(artistId)
    await mongooseClient()
    
    const albums = await albumModel.find({artistId}).lean()

    console.log(albums)

    return NextResponse.json({status:200, albums }) // Using NextResponse to return a JSON response with status code 200
}