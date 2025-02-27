import React from 'react'

const MovieReview = ({reviews}) => {
  return (
    <div className="container mx-auto my-4">
      <h3 className="text-xl font-bold text-white mb-3">See what other's are saying:</h3>
      {reviews?.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="p-3 border rounded-lg bg-transparent">
              <p className="font-semibold text-white">{review.userId.username}</p>
              <p className="text-gray-300">{review.reviewText}</p>
              <p className="text-yellow-500">⭐ {parseFloat(review.ratings).toFixed(1)}/5</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  )
}

export default MovieReview
