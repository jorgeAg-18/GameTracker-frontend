import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import GameCard from "../components/GameCard";
import GameForm from "../components/GameForm";
import Toast from "../components/Toast";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [editing, setEditing] = useState(null);
  const editFormRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [toast, setToast] = useState(null);

  const fetchGames = async () => {
    try {
      const res = await api.get("/games");
      setGames(res.data);
    } catch (error) {
      console.error("Error al obtener juegos:", error);
      alert("Error al cargar los juegos");
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // Scroll al formulario de edición cuando se abre
  useEffect(() => {
    if (editing && editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [editing]);

  const createGame = async (data) => {
    try {
      await api.post("/games", data);
      fetchGames();
      setToast({ message: "Juego agregado correctamente", type: "success" });
    } catch (error) {
      console.error("Error al crear juego:", error);
      setToast({ message: "Error al agregar el juego", type: "error" });
    }
  };

  const updateGame = async (id, data) => {
    try {
      await api.put(`/games/${id}`, data);
      setEditing(null);
      fetchGames();
      setToast({ message: "Juego actualizado correctamente", type: "success" });
    } catch (error) {
      console.error("Error al actualizar juego:", error);
      setToast({ message: "Error al actualizar el juego", type: "error" });
    }
  };

  const deleteGame = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este juego?")) {
      try {
        await api.delete(`/games/${id}`);
        fetchGames();
        setToast({ message: "Juego eliminado correctamente", type: "success" });
      } catch (error) {
        console.error("Error al eliminar juego:", error);
        setToast({ message: "Error al eliminar el juego", type: "error" });
      }
    }
  };

  // Filtrar juegos
  let filteredGames = games.filter((game) => {
    const matchSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGenre = !filterGenre || game.genre === filterGenre;
    const matchPlatform = !filterPlatform || game.platform === filterPlatform;
    const matchCompleted =
      filterCompleted === "" ||
      (filterCompleted === "completed" && game.completed) ||
      (filterCompleted === "incomplete" && !game.completed);

    return matchSearch && matchGenre && matchPlatform && matchCompleted;
  });

  // Ordenar juegos
  filteredGames = filteredGames.sort((a, b) => {
    if (sortBy === "title") return a.title.localeCompare(b.title);
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "hoursPlayed") return b.hoursPlayed - a.hoursPlayed;
    if (sortBy === "completed") return b.completed - a.completed;
    return 0;
  });

  // Obtener géneros y plataformas únicas
  const genres = [...new Set(games.map((g) => g.genre).filter(Boolean))];
  const platforms = [...new Set(games.map((g) => g.platform).filter(Boolean))];

  return (
    <div className="container">
      {/* Hero Section / Portada */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Tu Biblioteca de Juegos</h1>
          <p className="hero-subtitle">
            Organiza, califica y realiza un seguimiento de todos tus videojuegos en un solo lugar.
            Descubre estadísticas detalladas y gestiona tu colección de forma profesional.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">{games.length}</span>
              <span className="stat-label">Juegos</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">{games.filter((g) => g.completed).length}</span>
              <span className="stat-label">Completados</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">{games.reduce((sum, g) => sum + (g.hoursPlayed || 0), 0)}</span>
              <span className="stat-label">Horas Jugadas</span>
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="gamepad-icon">
            {/* Controlador de juego estilizado */}
            <defs>
              <linearGradient id="gradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "#ec4899", stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: "#a855f7", stopOpacity: 1}} />
              </linearGradient>
              <linearGradient id="gradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: "#06b6d4", stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: "#3b82f6", stopOpacity: 1}} />
              </linearGradient>
            </defs>
            
            {/* Lado izquierdo del controlador */}
            <ellipse cx="60" cy="100" rx="35" ry="45" fill="url(#gradientLeft)" opacity="0.9"/>
            
            {/* Lado derecho del controlador */}
            <ellipse cx="140" cy="100" rx="35" ry="45" fill="url(#gradientRight)" opacity="0.9"/>
            
            {/* Centro conectivo */}
            <rect x="85" y="85" width="30" height="30" rx="5" fill="#06b6d4" opacity="0.8"/>
            
            {/* Botones izquierda (D-Pad) */}
            <circle cx="45" cy="80" r="5" fill="#fbbf24" opacity="0.7"/>
            <circle cx="75" cy="85" r="5" fill="#f87171" opacity="0.7"/>
            <circle cx="50" cy="110" r="5" fill="#60a5fa" opacity="0.7"/>
            
            {/* Botones derecha */}
            <circle cx="145" cy="75" r="6" fill="#06b6d4" opacity="0.8"/>
            <circle cx="165" cy="85" r="6" fill="#ec4899" opacity="0.8"/>
            <circle cx="140" cy="115" r="6" fill="#10b981" opacity="0.8"/>
            <circle cx="115" cy="90" r="6" fill="#f59e0b" opacity="0.8"/>
            
            {/* Efecto de brillo */}
            <circle cx="70" cy="70" r="8" fill="white" opacity="0.2"/>
            <circle cx="150" cy="130" r="12" fill="white" opacity="0.15"/>
          </svg>
        </div>
      </div>

      {/* Formulario para agregar juego */}
      <div className="card">
        <h3>Agregar Nuevo Juego</h3>
        <GameForm onSubmit={createGame} />
      </div>

      <hr />

      {/* Filtros */}
      <div className="filters">
        <div>
          <label>Buscar</label>
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label>Género</label>
          <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
            <option value="">Todos los géneros</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Plataforma</label>
          <select value={filterPlatform} onChange={(e) => setFilterPlatform(e.target.value)}>
            <option value="">Todas las plataformas</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Estado</label>
          <select value={filterCompleted} onChange={(e) => setFilterCompleted(e.target.value)}>
            <option value="">Todos</option>
            <option value="completed">Completados</option>
            <option value="incomplete">Por completar</option>
          </select>
        </div>

        <div>
          <label>Ordenar por</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="title">Título</option>
            <option value="rating">Calificación</option>
            <option value="hoursPlayed">Horas jugadas</option>
            <option value="completed">Estado</option>
          </select>
        </div>
      </div>

      <hr />

      {/* Lista de juegos */}
      {filteredGames.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: "40px" }}>
          No se encontraron juegos.
        </p>
      ) : (
        <div className="games-grid">
          {filteredGames.map((game) => (
            <GameCard
              key={game._id}
              game={game}
              onEdit={() => setEditing(game)}
              onDelete={() => deleteGame(game._id)}
            />
          ))}
        </div>
      )}

      {/* Formulario de edición */}
      {editing && (
        <div ref={editFormRef} className="card" style={{ marginTop: "30px", borderLeft: "4px solid #3b82f6" }}>
          <h3>Editando: {editing.title}</h3>
          <GameForm
            initial={editing}
            onSubmit={(data) => updateGame(editing._id, data)}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
