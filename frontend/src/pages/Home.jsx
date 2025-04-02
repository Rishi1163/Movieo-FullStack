import React, { useEffect, useState } from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import Cards from '../components/Cards'
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import axios from 'axios';
import useFetch from '../hook/useFetch';

const Home = () => {

  const trendingMovies = useSelector(state => state.movieData.bannerData)
  const { data : nowPlayingData } = useFetch('/movie/now_playing')
  const { data : topReatedData } = useFetch('/movie/top_rated')
  const { data : popularTvShowData } = useFetch('/tv/popular')
  const { data : onAirData } = useFetch('/tv/on_the_air')

  return (
    <div>
      <BannerHome/>
      <HorizontalScrollCard data={trendingMovies} heading={"Trending"} trending={true}/>
      <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} media_type={'movie'}/>
      <HorizontalScrollCard data={topReatedData} heading={"Top Rated"} media_type={'movie'}/>
      <HorizontalScrollCard data={popularTvShowData} heading={"Popular Tv Shows"} media_type={'tv'}/>
      <HorizontalScrollCard data={onAirData} heading={"Upcoming Shows"} media_type={'tv'}/>
    </div>
  )
}

export default Home
