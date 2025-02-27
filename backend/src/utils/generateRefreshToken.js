import jwt from 'jsonwebtoken'
import { UserModel } from '../Models/user.models.js'

export const generateRefreshToken = async(userId) => {
    const token = await jwt.sign({id:userId},
        process.env.SECRET_KEY_REFRESH_TOKEN,
        { expiresIn : '30d'}
    )

    const updateToken = await UserModel.updateOne(
        {id : userId},
        {refresh_token : token}
    )

    return token
}