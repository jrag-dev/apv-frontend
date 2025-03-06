import React, { useEffect, useState } from 'react'
import Alert from './Alert.jsx'
import { validateEmail } from '../helpers/validateEmail.js'
import { usePatientContext } from '../hooks/usePatient.jsx'

const Formulario = () => {
  const [name, setName] = useState("")
  const [owner, setOwner] = useState("")
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [id, setId] = useState(null)
  const [alert, setAlert] = useState({})

  const { patientToEdit, savePatient } = usePatientContext();

  useEffect(() => {
    if (patientToEdit._id) {
      setName(patientToEdit.name);
      setOwner(patientToEdit.owner);
      setEmail(patientToEdit.email)
      setDate(patientToEdit.date);
      setSymptoms(patientToEdit.symptoms);
      setId(patientToEdit._id);
    }
  }, [patientToEdit])

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if ([name, owner, email, date, symptoms].includes('')) {
      setAlert({
        message: 'Todos los campos son requeridos',
        error: true
      })
      return;
    }

    if (!validateEmail(email)) {
      setAlert({
        message: "Email no válido",
        error: true
      })
      return;
    }

    const patient = {
      name, owner, email, date, symptoms, id
    }

    savePatient(patient);

    setName("");
    setOwner("");
    setEmail("");
    setDate("");
    setSymptoms("");
    setId(null);

    setAlert({
      message: 'Paciente Guardado Correctamente',
      error: false
    })
  }

  return (
    <>
      <form
        className='flex flex-col gap-6 bg-white py-4 px-6 rounded-xl shadow shadow-gray-900/10'
        onSubmit={handleSubmitForm}
      >
        <h2 className='text-2xl font-medium text-center my-4'>
          Añade tus pacientes y {''}
          <span className='text-indigo-600 font-black'>Administralos</span>
        </h2>
        {
          alert.message && (
            <Alert
              alert={alert}
            />
          )
        }
        <div className='grid grid-cols-1 gap-2'>
          <label className='uppercase font-bold text-gray-600 block w-full' htmlFor="name">Nombre:</label>
          <input
            type="text"
            name='name'
            id="name"
            className='border-2 border-gray-300 rounded-lg py-2.5 px-4 w-full bg-white'
            placeholder='Connan'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 gap-2'>
          <label className='uppercase font-bold text-gray-600 block w-full' htmlFor="owner">Propietario:</label>
          <input
            type="text"
            name='owner'
            id="owner"
            className='border-2 border-gray-300 rounded-lg py-2.5 px-4 w-full bg-white'
            placeholder='john Smith'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 gap-2'>
          <label className='uppercase font-bold text-gray-600 block w-full' htmlFor="email">Email:</label>
          <input
            type="email"
            name='email'
            id="email"
            className='border-2 border-gray-300 rounded-lg py-2.5 px-4 w-full bg-white'
            placeholder='johnsmith@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 gap-2'>
          <label className='uppercase font-bold text-gray-600 block w-full' htmlFor="date">Fecha:</label>
          <input
            type="date"
            name='date'
            id="date"
            className='border-2 border-gray-300 rounded-lg py-2.5 px-4 w-full bg-white'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 gap-2'>
          <label className='uppercase font-bold text-gray-600 block w-full' htmlFor="symptoms">Sintomas:</label>
          <textarea
            type="text"
            name='symptoms'
            id="symptoms"
            cols={5}
            rows={4}
            className='border-2 border-gray-300 rounded-lg py-2.5 px-4 w-full bg-white'
            placeholder='Indique los sintomas del paciente...'
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          ></textarea>
        </div>

        <input className='uppercase text-sm font-bold border-2 border-indigo-700 bg-indigo-600 px-6 py-3 rounded-lg text-gray-50 cursor-pointer hover:bg-indigo-700 hover:scale-x-105 transition-all duration-300 ease-in-out xl:w-2/5' type="submit" value={patientToEdit._id ? 'Editar Paciente' : 'Agregar Paciente'} />
      </form>
    </>
  )
}

export default Formulario
