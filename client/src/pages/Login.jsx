import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const {backendUrl, setIsLoggedIn, getUserData} = useContext(AppContext)

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if(state === 'Sign Up'){
        const {data} = await axios.post('https://auth-app-backend-8aee.onrender.com' + "/api/auth/register", {name, email, password})
        if(data.success){
          setIsLoggedIn(true)
          getUserData()
          navigate("/")
          toast.success(data.message)
        }else{
          toast.error('failed to register')
          console.log(data)
        }

      }else{
        const {data} = await axios.post('https://auth-app-backend-8aee.onrender.com' + "/api/auth/login", {email, password})
        if(data.success){
          setIsLoggedIn(true)
          getUserData()
          navigate("/")
          toast.success(data.message)
        }else{
          toast.error('failed to login')
          console.log(data)
        }
      }
    
    } catch (error) {
      toast.error('Failed to authenticate')
      console.log(error)
      }


  }
  return (
    <div className="flex flex-col relative items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-white to-blue-200">
      <div onClick={() => navigate("/")} className="flex absolute top-5 left-5 sm:left-20 w-15 sm:w-10 cursor-pointer">
        <img  
          src={assets.logo1}
          alt=""
          className="w-full mb-1"
        />
        <span className="text-[#1c1c1c] font-bold text-4xl">uth</span>
      </div>

      <div className="bg-slate-800 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={submitHandler} >
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#4f5982]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#4f5982]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email id"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#4f5982]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <p onClick={()=> navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">
            Forgot password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 text-white font-medium to-indigo-900">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
