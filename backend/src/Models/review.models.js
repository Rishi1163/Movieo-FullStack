import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    movieId : {
        type : String,
        required : true
    },
    reviewText : {
        type : String,
        required : true
    },
    ratings : {
        type : Number,
        required : true,
        min : 0,
        max : 5
    }
},{timestamps : true})

export const ReviewModel = mongoose.model("Review",reviewSchema)