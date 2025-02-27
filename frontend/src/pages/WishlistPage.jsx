import React from "react";
import { useSelector } from "react-redux";
import useFetchWishlistDetails from "../hook/useFetchWishlistDetails";
import Cards from "../components/Cards";
import Loading from "../components/Loading";

const WishlistPage = () => {
    const wishlist = useSelector((state) => state.wishlist.wishlist || []);

    // Fetch movie details using new hook
    const { data: wishlistDetails, loading } = useFetchWishlistDetails(wishlist);
    // console.log(wishlistDetails);
    return (
        <div className="mt-16">
            <div className="p-3">
                <h2 className="text-2xl font-semibold">Your Wishlist</h2>
            </div>
            <div className="flex flex-wrap gap-4 p-4 items-center justify-center">
                {/* Show Loading first */}
                {loading ? (
                    <div className="flex items-center h-48 justify-center">
                        <Loading />
                    </div>
                ) : (
                    wishlistDetails && wishlistDetails.length > 0 ? (
                        wishlistDetails.map((movie) => (
                            <Cards key={movie.id} data={movie} media_type={movie?.mediaType} />
                        ))
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <p>No items in wishlist</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
