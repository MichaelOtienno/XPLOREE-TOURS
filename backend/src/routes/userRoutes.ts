import Router from 'express'
import {  checkUserDetails, getAllReviews, loginUser, registerUser, sendReview } from '../controllers/userControllers'
import { verifyToken } from '../middleware/tokenVerify'

const user_router = Router()

// user_router.get('/',verifyToken,getAllUsers)
user_router.post('/register',registerUser)
user_router.post('/login',loginUser)
user_router.get('/check_user_details',verifyToken,checkUserDetails)
user_router.post('/sendReview',sendReview)
user_router.get('/allReviews',getAllReviews)

export default user_router