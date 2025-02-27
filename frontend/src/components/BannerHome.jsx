import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";import { Link } from 'react-router-dom';
;

const BannerHome = () => {

    const bannerData = useSelector(state => state.movieData.bannerData
    )
    const imageUrl = useSelector(state => state.movieData.imageUrl)
    // console.log("bannerData",bannerData);

    const [ currentImg , setCurrentImg ] = useState(0)
    const handleNext = () => {
        if(currentImg < bannerData.length - 1){
            setCurrentImg(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if(currentImg < bannerData.length - 1){
            setCurrentImg(prev => prev - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(currentImg < bannerData.length - 1){
                handleNext()
            }else{
                setCurrentImg(0)
            }
        },5000)

        return ()=>clearInterval(interval)
    },[bannerData,imageUrl,currentImg])

    const mediaType = bannerData[currentImg]?.media_type;
    // console.log("mediaType",mediaType);

    return (
        <section className='w-full h-full'>
            <div className='flex min-h-full max-h-[95vh] overflow-hidden group'>
                {
                    bannerData.map((data, index) => (
                        <div key={data.id+"bannerHome"+index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all duration-1000' style={{ transform : `translateX(-${currentImg * 100}%)`}}>
                            <div className='w-full h-full'>
                                <img src={imageUrl + data.backdrop_path}
                                    className='w-full object-cover h-full'
                                    alt="" />
                            </div>
                            {/*sliding buttons*/}
                            <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 lg:group-hover:flex'>
                                <button onClick={handlePrev} className='bg-white p-1 rounded-full z-10 text-black text-xl'> <FaAngleLeft /></button>
                                <button onClick={handleNext} className='bg-white p-1 rounded-full z-10 text-black text-xl'><FaAngleRight /></button>
                            </div>

                            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>

                            <div className='mx-auto container'>
                                <div className='absolute bottom-0 max-w-md px-3'>
                                    <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data?.title || data?.name}</h2>
                                    <p className='text-ellipsis line-clamp-3 my-2'>{data.overview}</p>
                                    <div className='flex items-center gap-4 '>
                                        <p>Rating : {Number(data.vote_average).toFixed(1)}+</p>
                                        <span>|</span>
                                        <p>View : {Number(data.popularity).toFixed(1)}</p>
                                    </div>
                                    <Link to={'/' + mediaType + '/' + data.id} className='bg-white px-2 text-sm w-36 lg:w-40 lg:text-base lg:px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all duration-300 hover:scale-105 mb-3 flex items-center hover:gap-3'>
                                        See Details
                                        <i><FaLongArrowAltRight size={24}/></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default BannerHome
