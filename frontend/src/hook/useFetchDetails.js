import axios from "axios"
import { useEffect, useState } from "react"

const useFetchDetails = (endpoint) => {
    const [ data , setData ] = useState()
    const [ loading , setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
          const res = await axios.get(endpoint)
          setData(res.data)
        } catch (error) {
          console.log(error);
        }finally{
            setLoading(false)
        }
      }

      useEffect(()=>{
        fetchData()
      },[endpoint])

    return { data , loading }
}

export default useFetchDetails