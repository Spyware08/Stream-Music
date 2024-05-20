import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Component/Navbar/Nav";

import { useNavigate } from "react-router-dom";
import Homepage from "./Component/Hero Section/Hompage";
import Library from "./Component/Hero Section/Library";
import LandingPage from "./Component/Hero Section/LandingPage";
import Search from "./Component/Hero Section/Search";
import ArtistPage from "./Component/ArtistPage";

export default function App() {
  const navigate = useNavigate();
  let userData = JSON.parse(sessionStorage.getItem('userData'));

 

  return (
    <div className="bg-gradient-to-r from-violet-400 to-blue-100">
      <Routes>
        <Route path="/" element={<Nav />}>

          <Route path="home" element={<Homepage/>}/>

          <Route path="search" element={<Search />} />
          <Route path="Library" element={<Library />} />
          <Route path="artist/:id" element={<ArtistPage />} />

        </Route>
      </Routes>

    </div>
  );
}
