import React, { useEffect, useState } from 'react'
import AdminNavbar from '../components/AdminNavbar.jsx'
import { useAuthContext } from '../hooks/useAuth.jsx'
import { validateEmail } from '../helpers/validateEmail.js';
import Alert from '../components/Alert.jsx';


export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [alert, setAlert] = useState({});

  const { auth, changeProfile } = useAuthContext();

  useEffect(() => {
    setProfile(auth);
  }, [auth])

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const { name, email, web, phone } = profile;

    if ([name, email].includes('')) {
      setAlert({
        message: "Email y Nombre son obligatorios",
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

    setAlert({})

    // llamado a la api
    const response = await changeProfile(profile);

    setAlert(response);

  }

  return (
    <>
      <AdminNavbar />

      <h2 className='font-black text-3xl text-center mt-10'>Editar Perfil</h2>
      <p className='font-medium text-center text-lg mt-5 mb-10'>
        Modifica tu {''}
        <span className='text-indigo-600 font-black'>Información aquí</span>
      </p>

      <article className='w-full p-4 md:p-0 max-w-[500px] mx-auto'>
        <form
          className='w-full bg-white px-6 py-10 rounded-lg shadow shadow-slate-900/5 grid gap-5'
          onSubmit={handleSubmitForm}
        >
          {
            alert.message && (
              <Alert
                alert={alert}
              />
            )
          }
          <div className='flex flex-col gap-3'>
            <label className='font-bold text-slate-700 uppercase' htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              className='bg-slate-50 border-2 border-slate-300 rounded-md px-4 py-2'
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className='font-bold text-slate-700 uppercase' htmlFor="name">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className='bg-slate-50 border-2 border-slate-300 rounded-md px-4 py-2'
              value={profile.email || ''}
              onChange={(e) => setProfile(
                {
                  ...profile,
                  [e.target.name]: e.target.value
                }
              )}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className='font-bold text-slate-700 uppercase' htmlFor="name">Sitio Web</label>
            <input
              type="text"
              name="web"
              id="web"
              className='bg-slate-50 border-2 border-slate-300 rounded-md px-4 py-2'
              value={profile.web || ''}
              onChange={(e) => setProfile({ ...profile, web: e.target.value })}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className='font-bold text-slate-700 uppercase' htmlFor="name">Teléfono</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className='bg-slate-50 border-2 border-slate-300 rounded-md px-4 py-2'
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
          <input
            type="submit"
            value="Guardar Cambios"
            className='bg-indigo-500 text-slate-50 rounded-xl py-3 px-10 uppercase font-black hover:cursor-pointer hover:bg-indigo-600 transition-all mt-2'
          />
        </form>
      </article>
    </>
  )
}

