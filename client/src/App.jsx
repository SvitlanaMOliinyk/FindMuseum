import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav-Bar/Nav";
import LoginForm from "./pages/Auth/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/footer";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
