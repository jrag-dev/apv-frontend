import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuth.jsx'


const AuthLayout = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth._id) {
      navigate('/admin')
    }
    setLoading(false)
  }, [auth])

  if (loading) return <p>Cargando...</p>

  return (
    <>
      <main className="w-[90%] container mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-14 place-items-center min-h-svh">
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout