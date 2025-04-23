import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true

    // const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const backendUrl = "https://auth-app-backend-8aee.onrender.com" // backend URL 
    const[isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)

    const getUserData = async () => {
        try {
            const  {data} = await axios.get('https://auth-app-backend-8aee.onrender.com' + "/api/user/data")
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        getAuthState();
    }, [])

    const getAuthState = async () => {
        try {
            const {data} = await axios.post('https://auth-app-backend-8aee.onrender.com' + "/api/auth/is-auth")
            if(data.success){
                setIsLoggedIn(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }


    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

