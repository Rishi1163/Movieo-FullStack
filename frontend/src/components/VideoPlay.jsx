import React from 'react'
import { IoIosClose } from "react-icons/io";
import useFetchDetails from '../hook/useFetchDetails';

const VideoPlay = ({data,close,media_type}) => {

    const { data : videoData } = useFetchDetails(`/${media_type}/${data?.id}/videos`)

    console.log("videoData",videoData)

  return (
    <section className='fixed bg-neutral-700 top-0 right-0 left-0 bottom-0 z-40 bg-opacity-65 flex justify-center items-center'>
      <div className='bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded  relative'>

      <iframe 
      src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`} 
      className='w-full h-full' 
      />
      <button onClick={close} className='absolute -right-1 -top-8'><IoIosClose size={40} /></button>
      </div>

     
    </section>
  )
}

export default VideoPlay
