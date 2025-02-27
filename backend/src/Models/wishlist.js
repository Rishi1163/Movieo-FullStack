import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            movieId: { type: String, required: true },
            mediaType: { type: String, required: true },
            isAdded: { type: Boolean, default: true }
        }
    ]
}, { timestamps: true });

export const WishlistModel = mongoose.model("Wishlist", wishlistSchema);
