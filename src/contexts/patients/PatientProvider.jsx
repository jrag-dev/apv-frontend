import { useEffect, useState } from "react"
import PatientContext from "./PatientContext.jsx"
import instanceAxios from "../../config/axios.js";



const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);



  const findPatients = async () => {
    const apv_token = localStorage.getItem('apv_token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apv_token}`
      }
    }
    try {
      const { data } = await instanceAxios.get('/patients', config);
      console.log("patients: ", data)
      setPatients(
        [
          ...data.patients
        ]
      )
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    findPatients()
  }, [])


  const savePatient = async (patient) => {
    try {
      const apv_token = localStorage.getItem('apv_token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apv_token}`
        }
      }
      const { data } = await instanceAxios.post('/patients', patient, config);
      const { createdAt, updatedAt, ...patientSaved } = data.patient;

      setPatients(
        [
          patientSaved,
          ...patients
        ]
      )
    } catch (err) {
      console.log(err);
    }
  }


  const data = {
    patients,
    savePatient
  }

  return (
    <PatientContext.Provider value={data}>
      {children}
    </PatientContext.Provider>
  )
}

export default PatientProvider;