import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload || [];
    },
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(item => item.movieId !== action.payload);
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;