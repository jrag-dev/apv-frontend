import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <div className='w-full py-4'>
        <h1 className="text-indigo-600 font-black text-center text-4xl md:text-7xl">
          Inicia Sesión y Administra tus
          <span className='text-gray-800'> Pacientes</span>
        </h1>
      </div>
      <div className='w-full grid gap-8 shadow-lg px-5 py-10 rounded-xl bg-white'>
        <form className='flex flex-col gap-8'>
          <div className='flex flex-col gap-3'>
            <label className='uppercase font-bold text-gray-500 block' htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='john@email.com'
              className='bg-gray-50 border-2 border-gray-200 rounded-xl w-full px-4 py-3'
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