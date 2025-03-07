import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <nav className='flex items-center gap-4'>
      <Link
        to="/admin/profile"
        className='font-bold uppercase text-gray-500 border-b-2 border-transparent hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600'
      >Perfil</Link>
      <Link
        to="/admin/change-password"
        className='font-bold uppercase text-gray-500 border-b-2 border-transparent hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600'
      >Cambiar Password</Link>
    </nav>
  )
}

export default AdminNavbar
