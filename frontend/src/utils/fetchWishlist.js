import { summaryApi } from "../common/summaryApi";
import { setWishlist } from "../store/wishlistSlice";
import { Axios } from "./Axios";

export const fetchWishlist = async (dispatch) => {
    try {
        const res = await Axios.get(summaryApi.getUserWishlist.url);
        if (res.data.success) {
            dispatch(setWishlist(res.data.data));
        }
    } catch (error) {
        console.log("wishlist error", error);
        dispatch(setWishlist([]));
    }
};
