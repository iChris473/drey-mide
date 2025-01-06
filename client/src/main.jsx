import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery.jsx";
import AboutPage from "./pages/About.jsx";
import Home2 from "./pages/Home2.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/works/:type" element={<Gallery />} />
        <Route path="/works" element={<Home2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
