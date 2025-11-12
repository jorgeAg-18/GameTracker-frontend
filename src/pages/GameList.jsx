import { useEffect, useState } from "react";
import api from "../services/api";
import GameCard from "../components/GameCard";
import GameForm from "../components/GameForm";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");
  const [sortBy, setSortBy] = useState("title");

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

  const createGame = async (data) => {
    try {
      await api.post("/games", data);
      fetchGames();
      alert("Juego agregado correctamente");
    } catch (error) {
      console.error("Error al crear juego:", error);
      alert("Error al agregar el juego");
    }
  };

  const updateGame = async (id, data) => {
    try {
      await api.put(`/games/${id}`, data);
      setEditing(null);
      fetchGames();
      alert("Juego actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar juego:", error);
      alert("Error al actualizar el juego");
    }
  };

  const deleteGame = async (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este juego?")) {
      try {
        await api.delete(`/games/${id}`);
        fetchGames();
        alert("Juego eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar juego:", error);
        alert("Error al eliminar el juego");
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
      <h1>Biblioteca de Juegos</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>
        Total: {games.length} juegos | Completados: {games.filter((g) => g.completed).length}
      </p>

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
        <div className="card" style={{ marginTop: "30px", borderLeft: "4px solid #3b82f6" }}>
          <h3>Editando: {editing.title}</h3>
          <GameForm
            initial={editing}
            onSubmit={(data) => updateGame(editing._id, data)}
            onCancel={() => setEditing(null)}
          />
        </div>
      )}
    </div>
  );
}
