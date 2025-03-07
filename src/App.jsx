import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ConfirmAccount from "./pages/ConfirmAccount.jsx";
import NewPassword from "./pages/NewPassword.jsx";

import AuthProvider from "./contexts/auth/AuthProvider.jsx";
import ProtectedRoutes from "./layout/ProtectedRoutes.jsx";
import AdminPatients from "./pages/AdminPatients.jsx";
import PatientProvider from "./contexts/patients/PatientProvider.jsx";
import { Profile } from "./pages/Profile.jsx";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PatientProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="confirm-account/:token" element={<ConfirmAccount />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoutes />}>
              <Route index element={<AdminPatients />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </PatientProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
