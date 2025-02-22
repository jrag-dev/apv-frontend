import React from 'react'
import { Outlet } from 'react-router-dom'


const AuthLayout = () => {
  return (
    <>
      Desde AuthLayout
      <Outlet />
    </>
  )
}

export default AuthLayout