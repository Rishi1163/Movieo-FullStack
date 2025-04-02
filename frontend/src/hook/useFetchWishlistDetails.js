import axios from "axios";
import { useEffect, useState } from "react";

const useFetchWishlistDetails = (wishlist) => {
    const [data, setData] = useState([]); // Store wishlist details
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                //  Ensure wishlist is valid
                if (!wishlist || wishlist.length === 0) {
                    setData([]);
                    setLoading(false); // Set loading to false before returning
                    return;
                }

                //  Construct API endpoints correctly
                const endpoints = wishlist
                    .filter((item) => item.mediaType && item.movieId)
                    .map((item) =>
                        `https://api.themoviedb.org/3/${item.mediaType === "movie" ? "movie" : "tv"}/${item.movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
                    );

                //  Fetch data with individual error handling
                const responses = await Promise.allSettled(
                    endpoints.map((endpoint) => axios.get(endpoint))
                );

                //  Filter successful requests
                const successfulData = responses
                    .filter((res) => res.status === "fulfilled")
                    .map((res) => res.value.data);

                setData(successfulData);
            } catch (error) {
                console.error("Error fetching wishlist details:", error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [wishlist]); // Use wishlist as dependency (without JSON.stringify)

    return { data, loading };
};

export default useFetchWishlistDetails;
