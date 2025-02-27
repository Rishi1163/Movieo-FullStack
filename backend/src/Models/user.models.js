import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    review : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Review'
    }],
    wishlist : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Wishlist",
    }]
},{timestamps : true})

export const UserModel = mongoose.model("User",UserSchema)