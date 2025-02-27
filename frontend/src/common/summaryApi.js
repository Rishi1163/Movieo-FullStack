export const baseUrl = import.meta.env.VITE_BACKEND_URL

export const summaryApi = {
    register : {
        url : "/api/user/register",
        method : "post"
    },
    refreshToken : {
        url : '/api/user/refreshToken',
        method : "post"
    },
    login : {
        url : "/api/user/login",
        method : "post"
    },
    logout : {
         url : "/api/user/logout",
        method : "post"
    },
    fetchUserDetails : {
        url :  "/api/user/user-details",
        method : "get"
    },
    addToWishlist : {
        url : "/api/wishlist/add",
        method : "post"
    },
    getUserWishlist : {
        url : "/api/wishlist/get",
        method : "get"
    },
    removeFromWishlist : {
        url : "/api/wishlist/:movieId",
        method : "delete"
    },
    addReview : {
        url : '/api/review/add',
        method : "post"
    },
    getReview : {
        url : "/api/review/:movieId",
        method : "get"
    }
}