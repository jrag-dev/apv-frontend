import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuth.jsx'
import Alert from '../components/Alert.jsx';
import instanceAxios from '../config/axios.js';
import { validateEmail } from '../helpers/validateEmail.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const navigate = useNavigate();

  const { auth } = useAuthContext();


  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlert({
        message: "Hay campos vacios",
        error: true
      })
      return;
    }

    if (!validateEmail(email)) {
      setAlert({
        message: "Email no válido",
        error: true
      })
      return;
    }

    if (password.length < 6) {
      setAlert({
        message: "El password debe contener minimo 6 caracteres",
        error: true
      })
      return;
    }

    setAlert({})

    // create an user in our api
    try {
      const url = '/veterinarians/login';
      const { data } = await instanceAxios.post(url, { email, password });
      localStorage.setItem('apv_token', data.token);
      setAlert(
        {
          message: data.message,
          error: false
        }
      )
      navigate("/admin");
    } catch (err) {
      setAlert(
        {
          message: err.response.data.message,
          error: true
        }
      )
    }
  }

  return (
    <>
      <div className='w-full py-4'>
        <h1 className="text-indigo-600 font-black text-center text-4xl md:text-7xl">
          Inicia Sesión y Administra tus
          <span className='text-gray-800'> Pacientes</span>
        </h1>
      </div>
      <div className='w-full grid gap-8 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          alert.message && (
            <Alert
              alert={alert}
            />
          )
        }
        <form
          className='flex flex-col gap-8'
          onSubmit={handleSubmitForm}
        >
          <div className='flex flex-col gap-3'>
            <label className='uppercase font-bold text-gray-500 block' htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='john@email.com'
              className='bg-gray-50 border-2 border-gray-200 rounded-xl w-full px-4 py-3'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className='uppercase font-bold text-gray-500 block' htmlFor="email">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder='************'
              className='bg-gray-50 border-2 border-gray-200 rounded-xl w-full px-4 py-3'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className='bg-indigo-500 text-gray-50 rounded-xl py-3 px-10 uppercase font-bold hover:cursor-pointer hover:bg-indigo-600 transition-all xl:size-max'
          />
        </form>
        <nav className='w-full flex flex-col items-center gap-4 md:flex-row md:justify-between'>
          <Link className='text-gray-500 font-medium' to="/register">¿No tienes una cuenta? <span className='text-indigo-500'>Registrate</span></Link>
          <Link className='text-gray-500 font-medium' to="/forgot-password">Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Login