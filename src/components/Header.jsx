import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuth.jsx'

const Header = () => {
  const { logout } = useAuthContext();

  return (
    <header className='py-6 bg-indigo-600'>
      <div className="container mx-auto flex flex-col gap-6 lg:flex-row lg:gap-0 items-center justify-between">
        <h1 className='font-bold text-2xl text-indigo-200 text-center'>
          Administrador de Pacientes de {''}
          <span className='text-white font-black'>Veterinaria</span>
        </h1>
        <nav className='flex items-center gap-8'>
          <Link to="/admin" className='text-white uppercase text-sm font-bold'>Pacientes</Link>
          <Link to="/profile" className='text-white uppercase text-sm font-bold'>Perfil</Link>

          <button
            className='text-white uppercase text-sm font-bold cursor-pointer'
            onClick={() => logout()}
          >Cerrar Sesión</button>
        </nav>
      </div>
    </header>
  )
}

export default Header
