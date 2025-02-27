import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './MovieSlice'
import userReducer from './userSlice'
import wishlistReducer from './wishlistSlice'

export default configureStore({
  reducer: {
    movieData : movieReducer,
    user : userReducer,
    wishlist : wishlistReducer
  },
})