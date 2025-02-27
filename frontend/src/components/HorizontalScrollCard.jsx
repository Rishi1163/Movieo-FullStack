import React, { useRef } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Cards from './Cards';

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
    const containerRef = useRef();

    const handleNext = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    return (
        <div className='container mx-auto px-3 my-10'>
            <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>

            <div className='relative'>
                <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none'>
                    {data.map((item, index) => (
                        <Cards key={item.id + "heading" + index} data={item} index={index + 1} trending={trending} media_type={media_type} />
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>
                    <button onClick={handlePrevious} className='bg-white p-2 text-black rounded-full -ml-3 z-10 hover:bg-gray-200 transition-all'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} className='bg-white p-2 text-black rounded-full -mr-3 z-10 hover:bg-gray-200 transition-all'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HorizontalScrollCard;
