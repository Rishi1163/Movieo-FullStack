import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id : "",
    username : "",
    email:'',
    last_login_date : "",
    wishlist : [],
    review : []
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUserDetails : (state,action)=>{
            state._id = action.payload?._id
            state.email = action.payload?.email
            state.username = action.payload?.username
            state.last_login_date = action.payload?.last_login_date
            state.wishliast = action.payload?.wishlist
            state.review = action.payload?.review
        },
        logout : (state) => {
            state._id = ""
            state.email = ""
            state.username = ""
            state.last_login_date = ""
            state.wishlist = []
        }
    }
})

export const { setUserDetails , logout } = userSlice.actions
export default userSlice.reducer