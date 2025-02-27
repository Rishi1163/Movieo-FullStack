import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hook/useFetchDetails'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import useFetch from '../hook/useFetch'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import { FaPlay } from "react-icons/fa";
import VideoPlay from '../components/VideoPlay'
import { Axios } from '../utils/Axios'
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { summaryApi } from '../common/summaryApi'
import { AxiosToastError } from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { addToWishlist, removeFromWishlist, setWishlist } from '../store/wishlistSlice'
import { fetchWishlist } from '../utils/fetchWishlist'
import AddReviewForm from '../components/AddReviewForm'
import MovieReview from '../components/MovieReview'


const DetailsPage = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const [ reviews , setReviews ] = useState([])

  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(`/${params?.explore}/${params?.id}/credits`);
  const { data: similarData } = useFetch(`/${params?.explore}/${params?.id}/similar`);
  const { data: recommendData } = useFetch(`/${params?.explore}/${params?.id}/recommendations`);

  const imageUrl = useSelector((state) => state.movieData.imageUrl);
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState('');

  const releaseDate = data?.release_date ?? data?.first_air_date;
  const runtime = params.explore === 'tv' ? data?.episode_run_time[0] : data?.runtime;
  const duration = runtime ? (Number(runtime) / 60).toFixed(1).split('.') : ['0', '0'];
  const director = castData?.crew?.find((person) => person.job === 'Director');

  const wishlist = useSelector((state) => state.wishlist.wishlist || []);
  const isInWishlist = wishlist.some((item) => item.movieId === params?.id);
  // console.log("Wishlist DetialsPage",wishlist)

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  const handleWishlist = async () => {
    try {
      const res = await Axios({
        ...(isInWishlist
          ? {
              ...summaryApi.removeFromWishlist,
              url: summaryApi.removeFromWishlist.url.replace(':movieId', params.id),
            }
          : {
              ...summaryApi.addToWishlist,
              data: { movieId: params.id, mediaType: params.explore },
            }),
      });

      if (res.data.error) {
        toast.error(res.data.message);
        return;
      }

      if (res.data.success) {
        toast.success(res.data.message);

        if (isInWishlist) {
          dispatch(removeFromWishlist({ movieId: params.id }));
        } else {
          dispatch(addToWishlist({ movieId: params.id, mediaType: params.explore }));
        }
        fetchWishlist(dispatch)
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await Axios({
        ...summaryApi.getReview,
        url: summaryApi.getReview.url.replace(":movieId", params?.id),
      });

      console.log("Fetched Reviews Response:", res.data.data); // Debugging

      if (res.data.error) {
        toast.error(res.data.message);
      } else if (res.data.success) {
        setReviews(res.data.data || []); // Ensure you're setting the correct data
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchReviews(); // Calling the function here
  }, [params?.id]);

  return (
    <div>
      <div className='w-full h-[400px] relative mb-10 hidden lg:block'>
        <div className='w-full h-full '>
          <img
            src={imageUrl + data?.backdrop_path}
            className='h-full w-full object-cover'
            alt="" />
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>

      </div>


      <div className='container mx-auto px-3 py-4 lg:py-0 flex gap-5 lg:flex-row flex-col lg:gap-10 '>
        <div className='lg:-mt-20 relative mx-auto w-fit lg:mx-0 min-w-60'>
          <img
            src={imageUrl + data?.poster_path}
            className='h-80 w-60 rounded object-cover'
            alt=""
          />
          <button onClick={() => handlePlayVideo(data)} className='mt-3 flex items-center gap-3 justify-center w-full py-2 px-4 text-center text-black rounded font-semibold text-lg bg-white hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-110 transition-all duration-300'>
            Play Trailer
            <i><FaPlay /></i>
          </button>

          {/* Wishlist Button Below */}
          <button
            onClick={handleWishlist}
            className={`mt-3 w-full py-2 px-10 gap-2 flex items-center text-center rounded font-semibold text-base 
                ${isInWishlist ? 'bg-gradient-to-l from-red-500 to-orange-500' : 'bg-white text-black'} 
                hover:scale-105 transition-all duration-300`}>
            {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            {isInWishlist ? <i><FaBookmark size={20} /></i> : <i><FaRegBookmark size={20} /></i>}
          </button>

        </div>

        <div className='lg:mt-3'>
          <h2 className='text-2xl lg:text-3xl font-bold text-white'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center gap-2'>
            <p>
              Rating: {Number(data?.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>
              Views: {Number(data?.vote_count).toFixed(1)}
            </p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {duration[1] && duration[1] !== "0" ? `${duration[1]}m` : ""}
            </p>

          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>OverView</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className='my-3 lg:flex items-center gap-3'>
              <p><span className='font-bold'>Status</span> : {data?.status}</p>
              <span className='hidden lg:block'>|</span>
              <p><span className='font-bold'>ReleaseDate</span> : {moment(releaseDate).format('MMMM-Do-YYYY')}</p>
              <span className='hidden lg:block'>|</span>
              <p><span className='font-bold'>Revenue</span> : {data?.revenue}</p>
            </div>
            <Divider />
          </div>

          <div>
            <p><span className='font-bold'>Director</span> : {director ? director.name : "Unknown"}</p>
          </div>
          <Divider />
          <h2 className='font-bold'>Cast:</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-7'>
            {
              castData?.cast?.filter(el => el.profile_path)?.map((starCast, index) => (
                <div>
                  <div>
                    <img
                      className='w-24 h-24 object-cover rounded-full'
                      src={imageUrl + starCast?.profile_path} alt="" />
                  </div>
                  <p className='font-semibold text-sm text-center'>{starCast?.name}</p>
                </div>
              ))
            }
          </div>
        </div>

      </div>
      <div className='my-6 container mx-auto'>
        <HorizontalScrollCard data={similarData} heading={"Similar " + params?.explore + (params?.explore === "tv" ? " Shows" : "")} />
      </div>
      <div className='my-6 container mx-auto'>
        <HorizontalScrollCard data={recommendData} heading={"Recommended " + params?.explore + (params.explore === 'movie' ? "s" : "") + (params?.explore === "tv" ? " Shows" : "")} />
      </div>
      {
        playVideo && (
          <VideoPlay
            data={playVideoId}
            close={() => setPlayVideo(false)}
            media_type={params?.explore}
          />
        )
      }

      <AddReviewForm movieId={params?.id} fetchReviews={fetchReviews} setReviews={setReviews}/>

     <MovieReview reviews={reviews} />

    </div>
  )
}

export default DetailsPage