import { Router } from 'express'
import { verifyUser } from '../middleware/authMiddleware.js'
import { addReview, getReview } from '../controller/review.controller.js'

const reviewRouter = Router()

reviewRouter.post('/add',verifyUser,addReview)
reviewRouter.get('/:movieId',getReview)

export default reviewRouter