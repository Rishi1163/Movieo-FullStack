import jwt from 'jsonwebtoken'

export const generateAccessToken = async (userId) => {
    const token = await jwt.sign({id : userId},
        process.env.SECRET_KEY_ACCESS_TOKEN,
        { expiresIn : '20d'}
    )
    return token
}