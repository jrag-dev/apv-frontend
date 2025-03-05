import React from 'react'
import { usePatientContext } from '../hooks/usePatient.jsx'
import Patient from './Patient.jsx';

const ListadoPacientes = () => {
  const { patients } = usePatientContext();
  return (
    <>
      {
        patients.length
          ? (
            <>
              <h2 className='font-black text-gray-700 text-2xl text-center'>Listado de pacientes</h2>
              <p className='text-xl text-gray-700 font-medium text-center mt-10'>
                Administra tus {''}
                <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
              </p>
              <article className='grid grid-cols-1 xl:grid-cols-2 xl:gap-4 mt-10'>
                {
                  patients.map(patient => {
                    return (
                      <Patient
                        key={patient._id}
                        patient={patient}
                      />
                    )
                  })
                }
              </article>
            </>
          ) : (
            <>
              <h2 className='font-black text-gray-700 text-2xl text-center'>No hay Pacientes</h2>

              <p className='text-xl text-gray-700 font-medium text-center mt-10'>
                Comienza agregando pacientes {''}
                <span className='text-indigo-600 font-bold'>y aparecerán en este lugar</span>
              </p>
            </>
          )
      }
    </>
  )
}

export default ListadoPacientes
