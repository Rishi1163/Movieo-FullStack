import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import bg1 from '../assets/img/background.jpg'
import { useDispatch } from 'react-redux'
import { Axios } from '../utils/Axios';
import { summaryApi } from '../common/summaryApi';
import { toast } from 'react-hot-toast'
import { fetchUserDetails } from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';
import { AxiosToastError } from '../utils/AxiosToastError';
import { setWishlist } from '../store/wishlistSlice';  // Import wishlist action

const Login = () => {

    const [data, setData] = useState({
        email: "", password: ""
    })
    const [showPassword, setShowPassword] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios({
                ...summaryApi.login,
                data: data
            });
    
            if (res.data.error) {
                toast.error(res.data.message);
                return;
            }
    
            if (res.data.success) {
                toast.success(res.data.message);
    
                localStorage.setItem("accessToken", res.data.data.accessToken);
                localStorage.setItem("refreshToken", res.data.data.refreshToken);
    
                // ✅ Fetch user details
                const userDetails = await fetchUserDetails();
                if (userDetails) {
                    dispatch(setUserDetails(userDetails.data));
                    localStorage.setItem("user", JSON.stringify(userDetails.data));
                }
    
                // ✅ Fetch wishlist
                const wishlistRes = await Axios({
                    ...summaryApi.getWishlist,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
    
                // ✅ If data exists, update wishlist, else set empty array
                if (wishlistRes.data.success) {
                    dispatch(setWishlist(wishlistRes.data.data || []));
                } else {
                    dispatch(setWishlist([])); // Fallback to empty
                }
    
                navigate('/');
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };
    
    

    return (
        <section className="w-full min-h-screen h-full mx-auto px-2 py-5 relative my-2">
            <img
                src={bg1}
                className="absolute inset-0 w-full h-full object-cover z-0"
                alt="Background"
            />
            <div className="relative bg-black/70 hover:shadow-2xl transition-all duration-200 hover:shadow-orange-600 backdrop-blur-xl mt-16 w-full max-w-lg mx-auto rounded-lg p-10 z-50">
                <p className='flex justify-center text-xl'>Welcome To Movieo!</p>
                <form className='grid mt-4 gap-4' onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className='grid gap-1'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            value={data.email}
                            onChange={handleChange}
                            autoFocus
                            name='email'
                            className='p-2 bg-transparent border border-white rounded'
                            placeholder='Enter your email'
                        />
                    </div>

                    {/* Password */}
                    <div className='grid gap-1'>
                        <label htmlFor="password">Password</label>
                        <div className='flex items-center justify-evenly bg-transparent border border-white rounded'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                className='h-full p-2 bg-transparent w-full outline-none'
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer mx-3'>
                                {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                            </div>
                        </div>
                    </div>

                    <button className='bg-gradient-to-l from-red-500 to-orange-600 px-4 py-2 rounded-full text-black font-semibold hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-600 duration-300 transition-colors'>
                        Login
                    </button>
                </form>
                <p className='text-center mt-3'>Don't have an account?&nbsp;
                    <Link to={'/register'} className='hover:text-orange-500 hover:underline'>Register</Link>
                </p>
            </div>
        </section>
    )
}

export default Login;
