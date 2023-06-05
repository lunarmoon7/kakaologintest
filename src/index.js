import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Kakao from "./Kakao";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/callback/kakaotalk" element={<Kakao />} />
    </Routes>
  </Router>
);