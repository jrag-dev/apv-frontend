import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { useAuthContext } from '../hooks/useAuth.jsx'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { auth, loading } = useAuthContext();

  if (loading) return 'cargando...'

  return (
    <>
      <Header />
      {
        auth?._id
          ? (
            <main className='container mx-auto mt-10'>
              <Outlet />
            </main>
          ) : <Navigate to="/" />
      }
      <Footer />
    </>
  )
}

export default ProtectedRoutes
