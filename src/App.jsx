import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ConfirmAccount from "./pages/ConfirmAccount.jsx";
import NewPassword from "./pages/NewPassword.jsx";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm-account/:token" element={<ConfirmAccount />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password/:token" element={<NewPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
