import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Component/Hero Section/Hompage";
import Nav from "./Component/Navbar/Nav";
import Search from "./Component/Hero Section/Search";
import Library from "./Component/Hero Section/Library";
import ArtistPage from "./Component/ArtistPage";
import SignupForm from "./Component/Auth/Signup";
import Login from "./Component/Auth/Login";

export default function App() {
  return (
    <>
      <div className="bg-gradient-to-r from-violet-400 to-blue-100  ">
        {/* <div className="flex h-[100vh]">
          <Nav />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
          </Routes>
        </div> */}
        {/* <SignupForm/> */}
        <Login/>
        <div>

        </div>
      </div>
    </>
  );
}
