import mongooseClient from '@/libs/mongoose.lib'
import artistModel from '@/models/artistModel'
import { NextRequest, NextResponse } from 'next/server' // Import NextResponse

export async function GET(req: NextRequest) {
    console.log(req.method)

    await mongooseClient()

    const artists = await artistModel.find({})

    console.log(artists)

    return NextResponse.json({status:200, artists }) // Using NextResponse to return a JSON response with status code 200
}