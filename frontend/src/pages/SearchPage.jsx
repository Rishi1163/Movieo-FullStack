import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cards from '../components/Cards'

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const navigate= useNavigate()
  const query = location?.search?.slice(3)

  const fetchData = async () => {
    try {
      const res = await axios.get(`/search/multi`, {
        params: {
          page: pageNo,
          query: location?.search?.slice(3)
        }
      })
      setData((prev) => {
        return [
          ...prev,
          ...res.data.results
        ]
      })
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
    setPageNo(1)
    setData([])
    fetchData()
  }, [location?.search])

    useEffect(() => {
      fetchData()
    }, [pageNo])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  // console.log("location",location.search.slice(3))



  return (
    <div className='pt-16 '>

      <div className='lg:hidden mx-2 my-2 sticky top-20 z-10'>
        <input 
        type="text" 
        placeholder='Search here....'
        onChange={(e)=> navigate(`/search?q=${e.target.value}`)}
        value={query.split("%20").join(" ")}
        className='px-4 py-1 text-base border w-full bg-transparent rounded text-neutral-300 border-neutral-300'
        />
      </div>

      <div className='container mx-auto'>
        <h2 className='capitalize text-lg lg:text-xl font-semibold my-4'>Search Results:</h2>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-7 justify-center '>
          {
            data.map((seacrhData, index) => (
              <Cards key={seacrhData.id + "exploreSection"} data={seacrhData} media_type={seacrhData.media_type} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage
