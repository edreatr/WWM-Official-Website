import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import WWMUnique from "./components/WWMUnique";
import AllProjectsPage from "./components/AllProjectPage";
import JobCard from "./components/JobCard";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={<WWMUnique darkMode={darkMode} setDarkMode={setDarkMode} />}
      />
      <Route
        path="/projects"
        element={
          <AllProjectsPage darkMode={darkMode} setDarkMode={setDarkMode} />
        }
      />
      <Route
        path="/join-us"
        element={<JobCard darkMode={darkMode} setDarkMode={setDarkMode} />}
      />
    </Routes>
  );
}
