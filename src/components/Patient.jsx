import React from 'react'
import { usePatientContext } from '../hooks/usePatient.jsx';

const Patient = ({ patient }) => {
  const { name, owner, email, date, symptoms } = patient;

  const { savePatientToEdit, deletePatient } = usePatientContext();

  const formaterDate = (date) => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(newDate);
  }

  return (
    <div className='shadow shadow-gray-900/10 p-6 rounded-lg flex flex-col gap-2'>
      <p className='font-bold text-indigo-600 uppercase'>
        Nombre: <span className='text-gray-600 normal-case'>{name}</span>
      </p>
      <p className='font-bold text-indigo-600 uppercase'>
        Propietario: <span className='text-gray-600 normal-case'>{owner}</span>
      </p>
      <p className='font-bold text-indigo-600 uppercase'>
        Email Contacto: <span className='text-gray-600 normal-case'>{email}</span>
      </p>
      <p className='font-bold text-indigo-600 uppercase'>
        Fecha de Alta: <span className='text-gray-600 normal-case'>{formaterDate(date)}</span>
      </p>
      <p className='font-bold text-indigo-600 uppercase'>
        Síntomas: <span className='text-gray-600 normal-case'>{symptoms}</span>
      </p>

      <div className='flex items-center justify-between my-2'>
        <button
          className='bg-indigo-500 text-gray-50 py-2 px-6 border-none rounded-lg hover:bg-indigo-600 cursor-pointer hover:ring-1 hover:ring-indigo-600 transition-all duration-300 ease-in-out'
          type='button'
          onClick={() => savePatientToEdit(patient)}
        >Editar</button>
        <button
          className='bg-red-500 text-gray-50 py-2 px-6 border-none rounded-lg hover:bg-red-600 cursor-pointer hover:ring-1 hover:ring-red-600 transition-all duration-300 ease-in-out'
          type='button'
          onClick={() => deletePatient(patient._id)}
        >Eliminar</button>
      </div>
    </div>
  )
}

export default Patient
