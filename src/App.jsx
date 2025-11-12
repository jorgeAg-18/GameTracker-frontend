import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GameList from "./pages/GameList";
import GameDetail from "./pages/GameDetail";
import Statistics from "./pages/Statistics";
import Wishlist from "./pages/Wishlist";
import { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="logo">GameTracker</Link>
        <Link to="/">Biblioteca</Link>
        <Link to="/statistics">Estadísticas</Link>
        <Link to="/wishlist">Wishlist</Link>
        <button 
          className="theme-toggle" 
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Modo Claro" : "Modo Oscuro"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </nav>
      
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
