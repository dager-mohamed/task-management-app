import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./components";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
