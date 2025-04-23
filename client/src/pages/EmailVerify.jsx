import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {

  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedIn, userData, getUserData} = useContext(AppContext)

  const navigate = useNavigate()
  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {   
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if(e.key === "Backspace" && e.target.value === '' && index > 0){
      inputRefs.current[index - 1].focus()
    }
  }

  const handlerPaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    })
  }

  const onSubmitHandler = async(e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})

      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate("/")
      } else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/")
  }, [isLoggedIn, userData])
  return (
    <div className="flex flex-col relative items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-white to-blue-200">
      <div
        onClick={() => navigate("/")}
        className="flex absolute top-5 left-5 sm:left-20 w-15 sm:w-10 cursor-pointer">
        <img src={assets.logo1} alt="" className="w-full mb-1" />
        <span className="text-[#1c1c1c] font-bold text-4xl">uth</span>
      </div>

      <form onSubmit={onSubmitHandler}
      className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 text-sm">
        <h1 className="text-white text-2xl font-semibold mb-4 text-center ">Email Verify OTP</h1>
        <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code to your email id.</p>

        <div className="flex justify-between mb-8 " onPaste={handlerPaste}>
          {Array(6) .fill(0).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                required
                className="w-12 h-12 text-center text-xl bg-[#4f5982] rounded-md text-white"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 rounded-full text-white">Verify email</button>
      </form>
    </div>
  );
};

export default EmailVerify;
