import React from "react";
import { Routes, Route } from "react-router-dom";
import MuseumDetails from "./components/Home-Page/museum/MuseumDetails";
import Nav from "./components/Nav-Bar/Nav";
import LoginForm from "./pages/Auth/LoginForm";
import RegisterForm from "./pages/Auth/RegisterForm";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/footer";
// import Museums from "./pages/Museums/Museums";
import MuseumOverview from "./pages/MuseumOverview/MuseumOverview";
import { AuthProvider } from "./context/authContext";
import MyProfile from "./pages/MyProfile/MyProfile";
import { MuseumsProvider } from "./context/museumContext";
import SearchedOverview from "./pages/MuseumOverview/SearchedOverview";

// import SearchedOverview from "./pages/MuseumOverview/SearchedOverview";

const App = () => {
  return (
    <>
      <MuseumsProvider>
        <AuthProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/museums/:key" element={<SearchedOverview />} />
            <Route path="/museums" element={<MuseumOverview />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/museum/:museumId" element={<MuseumDetails />} />
            <Route path="/profile/:id" element={<MyProfile />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </MuseumsProvider>
    </>
  );
};

export default App;
