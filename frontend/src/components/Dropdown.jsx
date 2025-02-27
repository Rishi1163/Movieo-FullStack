import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import { Axios } from '../utils/Axios'
import { summaryApi } from '../common/summaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import { setWishlist } from '../store/wishlistSlice'

const Dropdown = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  // console.log(user);

  const handleLogout = async () => {
    const res = await Axios({
      ...summaryApi.logout
    })
    console.log("logoutres",res.data)
    if(res.data.success){
      dispatch(logout)
      dispatch(setWishlist([]))
      localStorage.clear()
      toast.success(res.data.message)
      navigate('/login')
    }
  }

  return (
    <div className='text-white'>
      <h2>My Account</h2>
      <div className='font-medium flex gap-1 items-center'>
        <p>{user.username}</p>
        <p className='text-sm text-neutral-400'>({user.email})</p>
      </div>
      <Divider />
      <div className='grid gap-2'>
        <div className='hover:bg-neutral-700 py-1 px-2 rounded'>
          <Link to={'/wishlist'}>
            <p>Wishlist</p>
          </Link>
        </div>
        <button onClick={handleLogout} className='hover:bg-neutral-700 flex justify-start py-1 px-2 rounded'>
          <p className='cursor-pointer'>Logout</p>
        </button>
      </div>
    </div>
  )
}

export default Dropdown
