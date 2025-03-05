import { useContext } from "react";
import PatientContext from "../contexts/patients/PatientContext.jsx";


export function usePatientContext() {
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error('Patient context should be used within PatientContextProvider')
  }

  return context;
}