'use server'

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";



const s3 = new S3Client({
    region:'default',
    endpoint:process.env.LIARA_ENDPOINT,
    credentials:{
        accessKeyId:process.env.LIARA_ACCESS_KEY as string,
        secretAccessKey:process.env.LIARA_SECRET_KEY as string
    },
});

export const s3UploadAction = async (data:FormData)=>{
    const file:File | null = data.get('file') as File
    if(!file) throw new Error('no file')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const supFile = `${Date.now()}_${file.name}`

    const params = {
        Body:buffer,
        Bucket:process.env.LIARA_BUCKET_NAME as string,
        Key:supFile
    }

    try {
        await s3.send(new PutObjectCommand(params))
        return {
            success:true,
            filePath:`https://spotify-clone.storage.c2.liara.space/${supFile}`
        }
    } catch (error) {
        return {
            success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        }
    }

}