import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Axios } from '../utils/Axios'
import { summaryApi } from '../common/summaryApi'
import { AxiosToastError } from '../utils/AxiosToastError'

const AddReviewForm = ({movieId,fetchReviews}) => {

 const [ reviewText , setReviewText ] = useState("")
 const [ ratings , setRatings ] = useState(0)
 const user = useSelector((state) => state.user)
  // console.log("reviewUser",user)

const handleSubmit = async (e) => {
  e.preventDefault()
  if(!user){
    toast.error("You need to login!")
    return
  }
  try {
    const res = await Axios({
      ...summaryApi.addReview,
      data : {movieId, reviewText, ratings}
    })

    if(res.data.error)(
      toast.error(res.data.message)
    )

    if(res.data.success){
      toast.success(res.data.message)
      setReviewText("")
      setRatings(0)
      fetchReviews()

    }
  } catch (error) {
    AxiosToastError(error)
  }
}


  return (
    <section>
      <form onSubmit={handleSubmit} className="mt-6 p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Share Your Review</h3>
            <textarea
                value={reviewText}
                onChange={(e)=>setReviewText(e.target.value)}
                className="w-full p-2 border border-neutral-600 rounded mt-2 bg-transparent"
                placeholder="Write your review..."
                required
            ></textarea>
            <div className="mt-2">
                <label className="mr-2">Ratings:</label>
                <input
                    type="number"
                    value={ratings}
                    onChange={(e)=>setRatings(e.target.value)}
                    step="0.1" 
                    min="0"
                    max="5"
                    className="border border-neutral-600 p-1 bg-transparent rounded-md"
                    required
                />
            </div>
            <button type="submit" className="mt-4 bg-gradient-to-tl from-orange-500 to-red-500 text-white p-2 rounded">Submit Review</button>
        </form>
    </section>
  )
}

export default AddReviewForm
