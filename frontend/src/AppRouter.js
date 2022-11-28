import React, { useState, useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import GetInvolved from "./pages/GetInvolved";
import Programs from "./pages/Programs";
import Group from "./pages/Group";
import "./index.css";
import App from "./App";
import Navbar from "./components/Navbar";
import { UserContext } from "./UserContext";

function AppRouter() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/group/:id" element={<Group />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default AppRouter;
