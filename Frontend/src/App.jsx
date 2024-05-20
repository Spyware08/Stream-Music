import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Nav from "./Component/Navbar/Nav";
import Homepage from "./Component/Hero Section/Homepage";
import Library from "./Component/Hero Section/Library";
import LandingPage from "./Component/Hero Section/LandingPage";
import Search from "./Component/Hero Section/Search";
import ArtistPage from "./Component/ArtistPage";

export default function App() {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem('userInfo')); // Use consistent key

  useEffect(() => {
    if (!userData) {
      navigate('/auth');
    } else {
      navigate('/home');
    }
  }, []); // Empty dependency array to run only once after the initial render

  return (
    <div className="bg-gradient-to-r from-violet-400 to-blue-100">
      <Routes>
        <Route path="/auth" element={<LandingPage />} />
        <Route path="/" element={<Nav />}>
          <Route path="home" element={<Homepage />} />
          <Route path="search" element={<Search />} />
          <Route path="library" element={<Library />} />
          <Route path="artist/:id" element={<ArtistPage />} />
        </Route>
      </Routes>
    </div>
  );
}
