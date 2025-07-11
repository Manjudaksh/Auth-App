import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

    const navigate = useNavigate()
    const {userData, backendUrl, setUserData, setIsLoggedIn, } = useContext(AppContext)

    const sendVerificationOtp = async () => {
      try {
        axios.defaults.withCredentials = true

        const {data} = await axios.post('https://auth-app-backend-8aee.onrender.com' + "/api/auth/send-verify-otp")
        if(data.success){
          toast.success(data.message)
          navigate("/email-verify")
        } else{
          toast.error('failed to send verification email1') 
          console.log(data)
        }
      } catch (error) {
        toast.error('Failed to send verification email')
        console.log(error)
      }
    }

    const logout = async () => {
      try {
        axios.defaults.withCredentials = true
        const {data} = await axios.post('https://auth-app-backend-8aee.onrender.com' + "/api/auth/logout")
        data.success && setIsLoggedIn(false)
        data.success && setUserData(false)  
        navigate("/")
      } catch (error) {
        toast.error('Logout failed')
        console.log(error)
      }
    }
  return (
    <div className='flex justify-between items-center w-full p-4 sm:p-6 sm:px-24 absolute top-0'>
        <div className='flex items-center'>
            <img src={assets.logo1} alt="" className='w-15 sm:w-10'/> 
            <span className='text-[#1c1c1c] font-bold text-4xl'>uth</span>  
        </div>
        {userData ? 
        <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
          { userData.name[0].toUpperCase() }
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified && 
                <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>
              }
              
              <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
            </ul>
          </div>
        </div> : <button onClick={()=> navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Login <img src={assets.arrow_icon} alt=''/> </button> }
        
        
    </div>
  )
}

export default Navbar