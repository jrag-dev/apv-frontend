import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { validateEmail } from '../helpers/validateEmail.js';
import Alert from '../components/Alert.jsx';
import instanceAxios from '../config/axios.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({})

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setAlert({
        message: "Email no válido",
        error: true
      })
      return;
    }

    setAlert({})

    // create an user in our api
    try {
      const response = await instanceAxios.post('/veterinarians/forgot-password', { email });
      console.log(response.data.message);
      setAlert({
        message: response.data.message,
        error: false
      })
    } catch (err) {
      console.log(err.response.data.message)
      setAlert({
        message: err.response.data.message,
        error: true
      })
    }
  }

  return (
    <>
      <div className='w-full py-4'>
        <h1 className="text-indigo-600 font-black text-center text-4xl md:text-7xl">
          Recupera tu acceso y no pierdas tus
          <span className='text-gray-800'> Pacientes</span>
        </h1>
      </div>
      <div className='w-full grid gap-8 shadow-lg px-5 py-10 rounded-xl bg-white'>
        <form onSubmit={handleSubmitForm} className='flex flex-col gap-8'>
          {
            alert.message && (
              <Alert
                alert={alert}
              />
            )
          }
          <div className='flex flex-col gap-3'>
            <label className='uppercase font-bold text-gray-500 block' htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='john@email.com'
              className='bg-gray-50 border-2 border-gray-200 rounded-xl w-full px-4 py-3'
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <input
            type="submit"
            value="Enviar Instrucciones"
            className='bg-indigo-500 text-gray-50 rounded-xl py-3 px-10 uppercase font-bold hover:cursor-pointer hover:bg-indigo-600 transition-all xl:size-max'
          />
        </form>
        <nav className='w-full flex flex-col items-center gap-4 md:flex-row md:justify-between'>
          <Link className='text-gray-500 font-medium' to="/">¿Ya tienes una cuenta? <span className='text-indigo-500'>Inicia Sesión</span></Link>
          <Link className='text-gray-500 font-medium' to="/register">¿No tienes una cuenta? <span className='text-indigo-500'>Registrate</span></Link>
        </nav>
      </div>
    </>
  )
}

export default ForgotPassword