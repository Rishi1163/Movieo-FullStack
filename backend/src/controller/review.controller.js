import { ReviewModel } from "../Models/review.models.js"
import { UserModel } from "../Models/user.models.js"
import { catchError } from "../utils/cathcError.js"

export const addReview = async (req,res) => {
    try {
        const { reviewText, movieId, ratings } = req.body
        const userId = req.user.id

        if(!movieId || !reviewText || ratings === undefined){
            return res.status(400).json({
                message : "All fields are required!",
                error : true,
                success : false
            })
        }

        if( ratings < 0 || ratings > 5){
            return res.status(400).json({
                message : "Ratings must be above 0 and below 5!",
                error : true,
                success : false
            })
        }
        
        const newReview = new ReviewModel({
            userId,
            movieId,
            reviewText,
            ratings
        })

        await newReview.save()

        await UserModel.findByIdAndUpdate(userId,{
            $push : {review:newReview._id}
        })

        return res.status(200).json({
            message : "Review added successfully!",
            error : false,
            success : true,
            data : newReview
        })

    } catch (error) {
        catchError(res,error)
    }
}

export const getReview = async (req,res) => {
    try {
        const { movieId } = req.params
        const reviews = await ReviewModel.find({movieId}).populate("userId","username").sort({createdAt : -1})

        return res.status(200).json({
            message : "Reviews fetched!",
            error : false,
            success : true,
            data : reviews
        })
    } catch (error) {
        catchError(res,error)
    }
}