export const catchError = (res,error,statusCode=500)=>{
    return res.status(statusCode).json({
        message : error.message || error,
        error : true,
        success : false
    })
}