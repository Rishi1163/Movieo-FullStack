import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageUrl } from './store/MovieSlice';
import { Toaster } from 'react-hot-toast';
import { fetchUserDetails } from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { Axios } from './utils/Axios';
import { summaryApi } from './common/summaryApi';
import { setWishlist } from './store/wishlistSlice';
import { AxiosToastError } from './utils/AxiosToastError';  // Importing missing function
import { fetchWishlist } from './utils/fetchWishlist';


function App() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const userData = await fetchUserDetails();
      dispatch(setUserDetails(userData.data));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchTrending = async () => {
    try {
      const res = await axios.get('/trending/all/week');
      dispatch(setBannerData(res.data.results));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await axios.get('/configuration');
      dispatch(setImageUrl(res.data.images.secure_base_url + 'original'));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUserDetails(JSON.parse(storedUser)));
    }
    fetchUser();
    fetchTrending();
    fetchConfig();
    fetchWishlist(dispatch)
  }, [dispatch]);

  return (
    <div className="pb-14 lg:pb-0">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default App;
