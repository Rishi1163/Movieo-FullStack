import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo.png'
import user1 from '../assets/img/user.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../constants/navigation';
import { useSelector } from 'react-redux';
import Dropdown from './Dropdown';

const Header = () => {
    const location = useLocation()
    const removeSpace = location?.search?.slice(3)?.split('%20')?.join(' ')
    const [searchInput, setSearchInput] = useState(removeSpace)
    const navigate = useNavigate()
    const [openUserMenu, setOpenUserMenu] = useState(false)

    const user = useSelector((state) => state.user)
    // console.log(user);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        if (searchInput) { navigate(`/search?q=${searchInput}`) }
    }, [searchInput])

    useEffect(() => {
        setOpenUserMenu(false)
    }, [location.pathname])

    return (
        <header className='fixed top-0 w-full h-16 bg-opacity-40 z-40 bg-black '>
            <div className='container mx-auto px-3 flex items-center h-full'>
                <Link to={'/'}>
                    <img src={logo} alt="" width={120} className='cursor-pointer' />
                </Link>

                <nav className='hidden lg:flex items-center gap-4 ml-5 cursor-pointer'>
                    {
                        navigation.map((nav, index) => (
                            <div key={index + 'nav'}>
                                <NavLink key={nav.label} to={nav.href} className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && 'text-neutral-100'}`}>
                                    {nav.label}
                                </NavLink>
                            </div>
                        ))
                    }
                </nav>

                <div className='ml-auto flex items-center gap-6'>
                    <form action="" className='flex items-center gap-2' onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                            type="text"
                            placeholder='search here...'
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                        />
                        <button className='text-2xl text-white'>
                            <IoSearchOutline />
                        </button>
                    </form>

                    <div className='relative '>
                        {/* Clickable user icon */}
                        {location.pathname !== "/login" && (
                            <div onClick={() => setOpenUserMenu(prev => !prev)}>
                                <img
                                    src={user1}
                                    alt="User"
                                    className='w-8 h-8 cursor-pointer active:scale-50 transition-all rounded-full'
                                />
                            </div>
                        )}

                        {/* Dropdown menu with animation */}
                        <div
                            className={`absolute top-14 right-1 z-40 transition-all duration-300 ease-in-out ${openUserMenu ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
                                }`}
                        >
                            <div className='bg-neutral-800 min-w-52 p-4'>
                                <Dropdown />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header
