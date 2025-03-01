import { useState, useEffect } from "react";
import AuthContext from "./AuthContext.jsx";
import instanceAxios from "../../config/axios.js";



const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})


  const authenticateUser = async () => {
    const apv_token = localStorage.getItem('apv_token');

    if (!apv_token) return null;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apv_token}`
      }
    }

    try {
      const url = '/veterinarians/profile';
      const { data } = await instanceAxios.get(url, config);
      setAuth(data.veterinarian)
    } catch (err) {
      setAuth({})
      console.log(err.response.data.message)
    }

    console.log(apv_token);
  }

  useEffect(() => {
    authenticateUser();
  }, [])

  const data = {
    auth
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider;