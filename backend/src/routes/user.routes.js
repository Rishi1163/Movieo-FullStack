import { Router } from "express";
import { fetchUserDetaills, loginUser, logoutUser, refreshToken, registerUser } from "../controller/user.controller.js";
import { verifyUser } from "../middleware/authMiddleware.js";

const userRouter = Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',verifyUser,logoutUser)
userRouter.get('/user-details',verifyUser,fetchUserDetaills)
userRouter.post('/refreshToken',refreshToken)

export default userRouter