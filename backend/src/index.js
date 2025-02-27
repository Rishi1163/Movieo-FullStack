import express from 'express'
import dotenv from 'dotenv'
import conn from './Db/conn.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import wishlistRouter from './routes/wishlist.routes.js'
import reviewRouter from './routes/review.routes.js'

dotenv.config({
    path :'./.env'
})

const app = express()
const port =process.env.PORT

app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

app.use('/api/user',userRouter)
app.use('/api/wishlist',wishlistRouter)
app.use('/api/review',reviewRouter)

app.get('/',(req,res)=>{
    res.send('Hello Movieo')
})

conn().then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port: ${port}`);
    })
})
