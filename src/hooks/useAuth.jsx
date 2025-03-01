import { useContext } from "react";
import AuthContext from "../contexts/auth/AuthContext.jsx";


export function useAuthContext() {

  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth context should be used within AuthContextProvider");
  }

  return context;
}