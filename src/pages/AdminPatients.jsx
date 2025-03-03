import React, { useState } from 'react'
import Formulario from '../components/Formulario.jsx'
import ListadoPacientes from '../components/ListadoPacientes.jsx'

const AdminPatients = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className='grid grid-cols-1 gap-4 lg:gap-10 w-full px-4 md:px-0 md:grid-cols-4 xl:grid-cols-5'>
      <button
        type='button'
        className='bg-indigo-600 font-bold text-white uppercase px-6 py-2.5 rounded-lg mb-5 md:hidden'
        onClick={() => setShowForm(!showForm)}
      >{showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
      <article className={`${showForm ? 'block' : 'hidden'} md:block h-full md:col-span-2 xl:col-span-2`}>
        <Formulario />
      </article>

      <article className='bg-indigo-200 md:col-span-2 xl:col-span-3'>
        <ListadoPacientes />
      </article>
    </section>
  )
}

export default AdminPatients
