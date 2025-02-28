import React, { useEffect, useState } from 'react'
import Alert from '../components/Alert.jsx'
import { Link, useParams } from 'react-router-dom'
import instanceAxios from '../config/axios.js';

const NewPassword = () => {
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [tokenValido, setTokenValido] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [passwordChanged, setPasswordChanged] = useState(false);

  const { token } = useParams();

  const validateToken = async () => {
    try {
      const url = `/veterinarians/forgot-password/${token}`;
      const { data } = await instanceAxios.get(url);
      setAlert(
        {
          message: data.message,
          error: false
        }
      )
      setTokenValido(true);
    } catch (err) {
      setAlert(
        {
          message: err.response.data.message,
          error: true
        }
      )
      setTokenValido(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    validateToken();
  }, [])

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if ([password, repeatPassword].includes('')) {
      setAlert({
        message: "Hay campos vacios",
        error: true
      })
      return;
    }

    if (password !== repeatPassword) {
      setAlert({
        message: "Los password deben ser iguales",
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

    // Sent to request for change the password

    try {
      const url = `/veterinarians/forgot-password/${token}`;
      const { data } = await instanceAxios.post(url, { password });
      setAlert(
        {
          message: data.message,
          error: false
        }
      )
      setPasswordChanged(true);
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
          Reestablece tu password y no Pierdas acceso a
          <span className='text-gray-800'> tus Pacientes</span>
        </h1>
      </div>
      <div className='w-full grid gap-8 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          !loading && alert.message && (
            <Alert
              alert={alert}
            />
          )
        }
        {
          tokenValido && (
            <form
              className='flex flex-col justify-center gap-6'
              onSubmit={handleSubmitForm}
            >
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
              <div className='flex flex-col gap-3'>
                <label className='uppercase font-bold text-gray-500 block' htmlFor="repeatPassword">Repetir Password</label>
                <input
                  type="password"
                  name="repeatPassword"
                  id="repeatPassword"
                  placeholder='confirma tu password'
                  className='bg-gray-50 border-2 border-gray-200 rounded-xl w-full px-4 py-3'
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Guardar Nuevo Password"
                className='bg-indigo-500 text-gray-50 rounded-xl py-3 px-10 uppercase font-bold hover:cursor-pointer hover:bg-indigo-600 transition-all xl:size-max'
              />
              {
                passwordChanged && (
                  <nav className='w-full flex flex-col items-center gap-4 md:flex-row md:justify-between'>
                    <Link className='text-gray-500 font-medium' to="/"><span className='text-indigo-500'>Inicia Sesión</span></Link>
                  </nav>
                )
              }
            </form>
          )
        }
      </div>
    </>
  )
}

export default NewPassword
