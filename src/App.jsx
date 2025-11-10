import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GameList from "./pages/GameList";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
      </nav>
      <Routes>
        <Route path="/" element={<GameList />} />
      </Routes>
    </BrowserRouter>
  );
}
