import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { catchError } from '../utils/cathcError.js'
import { UserModel } from '../Models/user.models.js'
import { generateAccessToken } from '../utils/generateAccessToken.js'
import { generateRefreshToken } from '../utils/generateRefreshToken.js'

export const registerUser = async (req,res) => {
    try {
        const { username , email, password } = req.body
        if(!username || !email || !password){
            return res.status(400).json({
                message : "All fields are required!",
                error : true,
                success : false
            })
        }

        const existingUser = await UserModel.findOne({ email })
        if(existingUser){
            return res.status(400).json({
                message : "User already exists",
                error : true,
                success : false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
        
        const payload = ({
            username,
            email,
            password : hashPassword
        })

        const newuser = new UserModel(payload)
        const save = await newuser.save()

        return res.status(201).json({
            message : "User registered successfully!",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
        return catchError(res,error)
    }
}

export const loginUser = async (req,res) => {
    try {
        const { email , password } = req.body
        if(!email || !password){
            return res.status(400).json({
                message : "Provide all the fields!",
                error : true,
                success : false
            })
        }
    
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "User not registered",
                error : true,
                success : false
            })
        }
    
        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return res.status(400).json({
                message : "Password not valid!",
                error : true,
                success : false
            })
        }

        //generate tokens
        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        //update last-login-date
        await UserModel.findByIdAndUpdate(user._id,{
            last_login_date : new Date(),
        })

        //set cookies with token
        const cookieOptions = {
            httpOnly : true,
            secure : process.env.NODE_ENV,
            sameSite : "None",
            maxAge : 7 * 24 * 3600 * 1000
        }
        res.cookie("accessToken",accessToken,cookieOptions)
        res.cookie("refreshToken",refreshToken,{
            ...cookieOptions,
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message : "Login successfull!",
            error : false,
            success : true,
            data : {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return catchError(res,error)
    }
}

export const logoutUser = async (req,res) => {
    try {
        const userId = req.user.id // auth middleware
        
        const cookieOptions = {
            httpOnly : true,
            secure : process.env.NODE_ENV,
            sameSite : "None",
            maxAge : 7 * 24 * 3600 * 1000
        }

        res.clearCookie('accessToken',cookieOptions)
        res.clearCookie('refreshToken',cookieOptions)

        return res.status(200).json({
            message : "Logout successfull!",
            error : false,
            success : true
        })

    } catch (error) {
        return catchError(res,error)
    }
}

//refresh token
export const refreshToken = async(req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.headers?.authorization?.split(" ")[1]
        if(!refreshToken){
            return res.status(401).json({
                message : "Invalid token!",
                error : true,
                success : false
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)
        if(!verifyToken){
            return res.status(401).json({
                message : "Token has expired",
                error : true,
                success : false
            })
        }

        const userId = verifyToken?.id
        const newAccessToken = await generateAccessToken(userId)
        const cookieOptions = {
            httpOnly : true,
            secure : process.env.NODE_ENV,
            sameSite : "None",
            maxAge : 3600 * 1000
        }
        res.cookie("accessToken",newAccessToken,cookieOptions)
        return res.json({
            message : "New accessToken generated",
            error : false,
            success : true,
            data : {
                accessToken : newAccessToken
            }
        })
    } catch (error) {
        catchError(res,error)
    }
}

//fetch logged in user details
export const fetchUserDetaills = async (req,res) => {
    try {
        const userId = req.user.id    //auth middleware
        
        const user = await UserModel.findById(userId).select('-password')

        return res.status(200).json({
            message : "Fetched user details!",
            error : false,
            success : true,
            data : user
        })
    } catch (error) {
        catchError(res,error)
    }
}