import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery.jsx";
import AboutPage from "./pages/About.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/works" element={<App />} />
        <Route path="/" element={<AboutPage />} />
        <Route path="/works/:type" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
