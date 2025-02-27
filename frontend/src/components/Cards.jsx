import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Cards = ({ data, trending, index, media_type }) => {
    const imageUrl = useSelector((state) => state.movieData.imageUrl);

    const mediaType = data.media_type ? data.media_type : media_type ? media_type : (data.first_air_date ? "tv" : "movie");

    const releaseDate = data?.release_date ?? data?.first_air_date

    return (
        <Link to={'/' + mediaType + '/' + data.id} className='group w-full min-w-[230px] max-w-[230px] rounded h-80 overflow-hidden relative hover:scale-105 hover:transition-all hover:duration-500'>
            {
                data?.poster_path ? (
                    <img
                        src={imageUrl + data?.poster_path}
                        alt=""
                        className='w-full h-full object-cover'
                    />
                ) : (
                    <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
                        No image found
                    </div>
                )
            }
            {/* Trending Tag */}
            {trending && (
                <div className='absolute top-4 py-1 px-4 bg-black/60 backdrop-blur-3xl rounded-r-full overflow-hidden'>
                    #{index} Trending
                </div>
            )}
            {/* Movie Name Div */}
            <div className='absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/50 p-2 transform lg:translate-y-full lg:opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
                <h2 className='text-ellipsis line-clamp-1 font-semibold'>
                    {data?.title || data?.name}
                </h2>
                <div className='text-xs text-neutral-400 flex justify-between items-center'>
                    <p>{moment(releaseDate).format("MMMM Do YYYY")}</p>
                    <p className='bg-black px-2 py-1 rounded-full text-xs text-white'>
                        Rating: {Number(data.vote_average).toFixed(1)}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Cards;