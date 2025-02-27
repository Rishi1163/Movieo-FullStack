import jwt from 'jsonwebtoken'

export const verifyUser = async(req,res,next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({
                message : "Provide token",
                error : true,
                success : false
            })
        }

        const decode = await jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN)
        if(!decode){
            return res.status(401).json({
                message : "Unauthorized access!",
                error : true,
                success : false
            })
        }

        req.user = decode
        next()

    } catch (error) {
        return res.status(500).json({
            message : "Please login!",
            error : true,
            success : false
        })
    }
}