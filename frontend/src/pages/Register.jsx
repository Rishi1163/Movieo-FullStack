import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import bg1 from '../assets/img/background.jpg'
import { Axios } from '../utils/Axios';
import { summaryApi } from '../common/summaryApi';
import { toast } from 'react-hot-toast'
import { AxiosToastError } from '../utils/AxiosToastError';

const Register = () => {

    const [data, setData] = useState({
        username: "", email: "", password: ""
    })

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await Axios({
                ...summaryApi.register,
                data: data
            })

            console.log("ResData", res.data)

            if (res.data.error) {
                toast.error(res.data.message)
            }

            if (res.data.success) {
                toast.success(res.data.message)
            }

            setData({ username: "", email: "", password: "" })
            navigate('/login')

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className="w-full min-h-screen h-full mx-auto px-2 py-5 relative my-2">
            {/* Background Image */}
            <img
                src={bg1}
                className="absolute inset-0 w-full h-full object-cover z-0"
                alt="Background"
            />
            <div className="relative bg-black/70 hover:shadow-2xl transition-all duration-200 hover:shadow-orange-600 backdrop-blur-xl  borde mt-16 w-full max-w-lg mx-auto rounded-lg p-10 z-50">
                <p className='flex justify-center text-xl'>Welcome To Movieo!</p>
                <form action="" onSubmit={handleSubmit} className='grid mt-4 gap-4'>

                    {/* Name */}
                    <div className='grid gap-1'>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id='username'
                            autoFocus
                            value={data.username}
                            name='username'
                            onChange={handleChange}
                            className='p-2 bg-transparent border border-white rounded outline-none '
                            placeholder='Enter your username'
                        />
                    </div>

                    {/* email */}
                    <div className='grid gap-1'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={data.email}
                            onChange={handleChange}
                            className='p-2 bg-transparent border border-white rounded'
                            placeholder='Enter your email'
                        />
                    </div>

                    {/* password */}
                    <div className='grid gap-1 '>
                        <label htmlFor="password">Password</label>
                        <div className='flex p-2 bg-transparent border border-white rounded'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='password'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                className='bg-transparent w-full outline-none'
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                                {
                                    showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />
                                }
                            </div>
                        </div>
                    </div>

                    {/* register button */}
                    <button className='bg-gradient-to-l from-red-500 to-orange-600 px-4 py-2 rounded-full text-black font-semibold hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-600 duration-300 transition-colors'>Register</button>
                </form>
                <p className='text-center mt-3'>Already have an account?&nbsp;<Link to={'/login'} className='hover:text-orange-500 hover:underline'>Login</Link></p>
            </div>
        </section>
    )
}

export default Register
