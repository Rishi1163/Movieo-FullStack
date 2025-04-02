import { UserModel } from "../Models/user.models.js";
import { WishlistModel }from "../Models/wishlist.models.js"; 
import { catchError } from "../utils/cathcError.js"; 

export const addToWishlist = async (req, res) => {
    try {
        const { movieId, mediaType } = req.body;
        const userId = req.user.id; // From auth middleware

        if (!movieId || !mediaType) {
            return res.status(400).json({
                message: "movieId and mediaType are required",
                error: true,
                success: false
            });
        }

        let wishlist = await WishlistModel.findOne({ userId });

        if (!wishlist) {
            //  Create a new wishlist if the user doesn't have one
            wishlist = await WishlistModel.create({
                userId,
                items: [{ movieId, mediaType }]
            });

            await UserModel.findByIdAndUpdate(userId, {
                $push: { wishlist: wishlist._id }
            });

            return res.status(201).json({
                message: "Wishlist created & item added!",
                error: false,
                success: true,
                data: wishlist
            });
        }

        //  Check if the movie/TV show is already in the wishlist
        const alreadyExists = wishlist.items.some(item => item.movieId === movieId);
        if (alreadyExists) {
            return res.status(400).json({
                message: "Already in wishlist",
                error: true,
                success: false
            });
        }

        //  Add item to wishlist
        wishlist.items.push({ movieId, mediaType });
        await wishlist.save();

        return res.status(200).json({
            message: "Added to wishlist!",
            error: false,
            success: true,
            data: wishlist
        });
    } catch (error) {
        catchError(res, error);
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { movieId } = req.params;
        const userId = req.user.id; // From auth middleware

        if (!movieId) {
            return res.status(400).json({
                message: "movieId is required!",
                error: true,
                success: false
            });
        }

        let wishlist = await WishlistModel.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found",
                error: true,
                success: false
            });
        }

        const movieIndex = wishlist.items.findIndex(item => item.movieId === movieId);
        if (movieIndex === -1) {
            return res.status(404).json({
                message: "Item not found!",
                error: true,
                success: false
            });
        }

        // Remove the item from the array
        wishlist.items.splice(movieIndex, 1);
        await wishlist.save();

        return res.status(200).json({
            message: "Item removed!",
            error: false,
            success: true,
            data: wishlist
        });
    } catch (error) {
        catchError(res, error);
    }
};


export const getUserWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const wishlist = await WishlistModel.findOne({ userId }).sort({createdAt : -1});

        if (!wishlist || wishlist.items.length === 0) {
            return res.status(404).json({
                message: "No wishlist found!",
                error: true,
                success: false
            });
        }

        const reversedItems = wishlist.items.reverse()

        return res.status(200).json({
            message: "Wishlist fetched successfully!",
            error: false,
            success: true,
            data: reversedItems   // Return only the items array
        });
    } catch (error) {
        catchError(res, error);
    }
};
