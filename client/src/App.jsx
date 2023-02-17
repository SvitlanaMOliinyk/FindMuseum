import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import LoginForm from "./pages/Auth/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
};

export default App;
