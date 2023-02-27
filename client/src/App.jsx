import React from "react";
import { Routes, Route } from "react-router-dom";
import MuseumDetails from "./components/Home-Page/museum/MuseumDetails";
import Nav from "./components/Nav-Bar/Nav";
import LoginForm from "./pages/Auth/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/footer";
import Museums from "./pages/Museums/Museums";
import { AuthProvider } from "./context/authContext";
import MyProfile from "./pages/MyProfile/MyProfile";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import OtpInput from "./pages/Auth/OTPInput";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/museums/:key" element={<Museums />} />
          <Route path="/museums" element={<Museums />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/museum/:museumId" element={<MuseumDetails />} />
          <Route path="/profile/:id" element={<MyProfile />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/otp" element={<OtpInput />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;
