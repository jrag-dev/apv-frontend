import { useState, useEffect } from "react";
import AuthContext from "./AuthContext.jsx";
import instanceAxios from "../../config/axios.js";



const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [loading, setLoading] = useState(true);


  const authenticateUser = async () => {
    const apv_token = localStorage.getItem('apv_token');

    if (!apv_token) {
      setLoading(false);
    }

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

    setLoading(false);
  }

  useEffect(() => {
    authenticateUser();
  }, [])

  const logout = () => {
    localStorage.removeItem('apv_token');
    setAuth({});
  }

  const changeProfile = async (profile) => {
    const apv_token = localStorage.getItem('apv_token');
    if (!apv_token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apv_token}`
      }
    }

    try {
      const { data } = await instanceAxios.put(`/veterinarians/profile/${profile._id}`, profile, config);
      return {
        message: data.message,
        error: false
      }
    } catch (err) {
      return {
        message: err.response.data.message,
        error: true
      }
    }
  }

  const saveNewPassword = async (passwordActual, passwordNuevo) => {
    try {
      const apv_token = localStorage.getItem('apv_token');
      if (!apv_token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apv_token}`
        }
      }
      const { data } = await instanceAxios.put('/veterinarians/update-password', { passwordActual, passwordNuevo }, config);
      return {
        message: data.message,
        error: false
      }
    } catch (err) {
      return {
        message: err.response.data.message,
        error: true
      }
    }
  }

  const data = {
    auth,
    loading,
    setAuth,
    logout,
    changeProfile,
    saveNewPassword
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider;