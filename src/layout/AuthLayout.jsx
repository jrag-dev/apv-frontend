import React from 'react'
import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
  return (
    <>
      <main className="w-[90%] container mx-auto grid grid-cols-1 md:grid-cols-2 md:gap-14 place-items-center min-h-svh">
        <Outlet />
      </main>
    </>
  )
}

export default AuthLayout