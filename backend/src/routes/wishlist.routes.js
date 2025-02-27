import { Router } from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { addToWishlist, getUserWishlist, removeFromWishlist } from "../controller/wishlist.controller.js";

const wishlistRouter = Router()

wishlistRouter.post('/add',verifyUser,addToWishlist)
wishlistRouter.delete('/:movieId',verifyUser,removeFromWishlist)
wishlistRouter.get('/get',verifyUser,getUserWishlist)

export default wishlistRouter