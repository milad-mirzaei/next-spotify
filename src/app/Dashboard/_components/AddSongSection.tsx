'use client'
import React, { ChangeEvent, useState } from 'react'

const AddSongSection = () => {

    const [, setFile] = useState<File|null>(null)

    const handleUploadSong = async()=>{
      // if(file){
      //   const data = new FormData()
      //   data.set('file',file)
      //   const result = await s3UploadAction(data)
      //   if(result.success && result.filePath){
      //     const res = await AddSong({album:'album',desc:'desc',duration:'duration',image:'image',name:'name',file:result.filePath })
      //   }
      // }
    }

  return (
    <div className='w-full  flex flex-col justify-start items-start p-5' >
        <input type="file" accept='.mp3' onChange={(e:ChangeEvent<HTMLInputElement>)=>{
          const file = e.target.files ? e.target.files[0] : null
          setFile(file)
        }} />
        <div className=" px-4 py-2 bg-white text-black cursor-pointer" onClick={handleUploadSong} >submit</div>  
    </div>
  )
}

export default AddSongSection