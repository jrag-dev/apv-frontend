import { useEffect, useState } from "react"
import PatientContext from "./PatientContext.jsx"
import instanceAxios from "../../config/axios.js";
import { useAuthContext } from "../../hooks/useAuth.jsx";



const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patientToEdit, setPatientToEdit] = useState({});
  const apv_token = localStorage.getItem('apv_token');
  const { auth } = useAuthContext();


  useEffect(() => {
    const findPatients = async () => {
      try {
        const apv_token = localStorage.getItem('apv_token');
        if (!apv_token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apv_token}`
          }
        }
        const { data } = await instanceAxios.get('/patients', config);
        setPatients(
          [
            ...data.patients
          ]
        )
      } catch (err) {
        console.log(err)
      }
    }
    findPatients()
  }, [auth])

  const savePatient = async (patient, setAlert) => {
    const apv_token = localStorage.getItem('apv_token');
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apv_token}`
      }
    }

    if (patient.id) {
      try {
        const { data } = await instanceAxios.put(`/patients/${patient.id}`, patient, config);
        const newListPatient = patients.map(patientState => patientState._id === data.patient._id ? data.patient : patientState);
        setPatients(newListPatient);
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
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
  }

  const savePatientToEdit = (patient) => {
    setPatientToEdit(patient);
  }

  const deletePatient = async (_id) => {
    const confirmDelete = confirm('¿Confirmas que deseas eliminar?');
    if (confirmDelete) {
      const apv_token = localStorage.getItem('apv_token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apv_token}`
        }
      }
      try {
        const { data } = await instanceAxios.delete(`/patients/${_id}`, config);
        const newListPatient = patients.filter(patientState => patientState._id !== _id);
        setPatients(newListPatient);
      } catch (err) {
        console.log(err)
      }
    }
  }

  const data = {
    patients,
    patientToEdit,
    savePatient,
    savePatientToEdit,
    deletePatient
  }

  return (
    <PatientContext.Provider value={data}>
      {children}
    </PatientContext.Provider>
  )
}

export default PatientProvider;