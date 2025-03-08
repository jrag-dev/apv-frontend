import React, { useState } from 'react'
import AdminNavbar from '../components/AdminNavbar.jsx'
import Alert from '../components/Alert.jsx';
import { useAuthContext } from '../hooks/useAuth.jsx';

const ChangePassword = () => {
  const [password, setPassword] = useState({
    passwordActual: '',
    passwordNuevo: ''
  });
  const [alert, setAlert] = useState({});

  const { saveNewPassword } = useAuthContext()

  const handlerSubmitForm = async (e) => {
    e.preventDefault();

    const { passwordActual, passwordNuevo } = password;

    if ([passwordActual, passwordNuevo].includes('')) {
      setAlert({
        message: "Todos los campos son obligatorios",
        error: true
      })
      return;
    }

    if (passwordNuevo.length < 6) {
      setAlert({
        message: "El password debe contener minimo 6 caracteres",
        error: true
      })
      return;
    }

    setAlert({})

    // Llamado a la api
    const newPasswordResponse = await saveNewPassword(passwordActual, passwordNuevo);

    setAlert(newPasswordResponse)

  }

  return (
    <>
      <AdminNavbar />

      <h2 className='font-black text-3xl text-center mt-10'>Cambiar Password</h2>
      <p className='font-medium text-center text-lg mt-5 mb-10'>
        Modifica tu {''}
        <span className='text-indigo-600 font-black'>Password aquí</span>
      </p>

      <article>
        <form
          className='bg-white px-6 py-10 max-w-[500px] mx-auto rounded-xl flex flex-col gap-5'
          onSubmit={handlerSubmitForm}
        >
          {
            alert.message && (
              <Alert
                alert={alert}
              />
            )
          }
          <div className="flex flex-col gap-2">
            <label className='font-black text-gray-600 uppercase' htmlFor="passwordActual">Password Actual</label>
            <input
              type="text"
              name="passwordActual"
              id="passwordActual"
              className='bg-slate-50 px-4 py-2.5 border-2 border-slate-200 rounded-lg w-full'
              placeholder='Escribe tu password actual'
              value={password.passwordActual}
              onChange={(e) => setPassword(
                {
                  ...password,
                  [e.target.name]: e.target.value
                }
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className='font-black text-gray-600 uppercase' htmlFor="passwordNuevo">Password Nuevo</label>
            <input
              type="text"
              name="passwordNuevo"
              id="passwordNuevo"
              className='bg-slate-50 px-4 py-2.5 border-2 border-slate-200 rounded-lg w-full'
              placeholder='Escribe tu nuevo password'
              value={password.passwordNuevo}
              onChange={(e) => setPassword(
                {
                  ...password,
                  [e.target.name]: e.target.value
                }
              )}
            />
          </div>
          <input
            type="submit"
            value="Actualizar Password"
            className='bg-indigo-500 text-gray-50 rounded-xl py-3 px-10 mt-3 uppercase font-black hover:cursor-pointer hover:bg-indigo-600 transition-all'
          />
        </form>
      </article>
    </>
  )
}

export default ChangePassword
