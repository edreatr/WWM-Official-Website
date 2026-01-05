import { Routes, Route } from "react-router-dom";
import WWMUnique from "./components/WWMUnique";
import JobCard from "./components/JobCard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<WWMUnique />} />
      <Route path="/join-us" element={<JobCard />} />
      <Route path="/jobcard" element={<JobCard />} />
    </Routes>
  );
}
