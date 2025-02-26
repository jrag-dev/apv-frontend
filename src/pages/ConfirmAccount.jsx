import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import Alert from '../components/Alert.jsx';

const ConfirmAccount = () => {
  const [accountConfirmed, setAccountConfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({});

  const { token } = useParams();

  const confirmAccount = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarians/confirmar/${token}`;
      const { data } = await axios.get(url);
      setAccountConfirmed(true);
      setAlert(
        {
          message: data.message,
          error: false
        }
      )
    } catch (err) {
      setAlert(
        {
          message: err.response.data.message,
          error: true
        }
      )
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log(import.meta.env.VITE_BACKEND_URL)
    confirmAccount();
  }, [])

  return (
    <>
      <div className='w-full py-4'>
        <h1 className="text-indigo-600 font-black text-center text-4xl md:text-7xl">
          Confirma tu Cuenta y Comienza a Administra tus
          <span className='text-gray-800'> Pacientes</span>
        </h1>
      </div>
      <div className='w-full grid gap-8 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {
          !loading && (
            <Alert
              alert={alert}
            />
          )
        }
        {
          !loading && accountConfirmed && (
            <Link className='text-gray-500 font-medium' to="/"><span className='text-indigo-500'>Inicia Sesión</span></Link>
          )
        }
      </div>
    </>
  )
}

export default ConfirmAccount