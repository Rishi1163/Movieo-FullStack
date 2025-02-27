import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cards from '../components/Cards';

const ExplorePage = () => {

  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)
  // console.log("params",params.explore);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo
        }
      })
      setData((prev) => {
        return [
          ...prev,
          ...res.data.results
        ]
      })
      setTotalPageNo(res.data.total_pages)
      console.log("res", res.data.results);

    } catch (error) {
      console.log(error)
    }
  }

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo(prev => prev + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className='py-16 '>
      <div className='container mx-auto my-3'>
        <h2 className='capitalize text-lg lg:text-xl font-semibold'>Explore {params.explore} {params.explore === 'tv' && 'Shows'}</h2>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-7 justify-center lg:justify-start'>
          {
            data.map((explore, index) => (
              <Cards key={explore.id + "exploreSection"} data={explore} media_type={params.explore} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
