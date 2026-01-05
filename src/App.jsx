import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import WWMUnique from "./components/WWMUnique";
import JobCard from "./components/JobCard"; // ← JOIN US PAGE

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<WWMUnique />} />

        {/* Join Us page */}
        <Route path="/join-us" element={<JobCard />} />
      </Routes>
    </BrowserRouter>
  );
}
