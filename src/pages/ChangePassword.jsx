import React from 'react'
import AdminNavbar from '../components/AdminNavbar.jsx'

const ChangePassword = () => {
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
          className='bg-white px-6 py-10 max-w-[500px] mx-auto rounded-lg flex flex-col gap-5'
        >
          <div className="flex flex-col gap-2">
            <label className='font-black text-gray-600 uppercase' htmlFor="passwordActual">Password Actual</label>
            <input
              type="text"
              name="passwordActual"
              id="passwordActual"
              className='bg-slate-50 px-4 py-2.5 border-2 border-slate-200 rounded-lg w-full'
              placeholder='Escribe tu password actual'
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className='font-black text-gray-600 uppercase' htmlFor="passwordActual">Password Nuevo</label>
            <input
              type="text"
              name="passwordActual"
              id="passwordActual"
              className='bg-slate-50 px-4 py-2.5 border-2 border-slate-200 rounded-lg w-full'
              placeholder='Escribe tu nuevo password'
            />
          </div>
          <input
            type="submit"
            value="Actualizar Password"
            className='bg-indigo-500 text-gray-50 rounded-xl py-3 px-10 mt-3 uppercase font-black hover:cursor-pointer hover:bg-indigo-600 transition-all xl:size-max'
          />
        </form>
      </article>
    </>
  )
}

export default ChangePassword
