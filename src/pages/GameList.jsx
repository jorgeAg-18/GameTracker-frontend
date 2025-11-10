import { useEffect, useState } from "react";
import api from "../services/api";
import GameCard from "../components/GameCard";
import GameForm from "../components/GameForm";

export default function GameList() {
  const [games, setGames] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchGames = async () => {
    const res = await api.get("/games");
    setGames(res.data);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const createGame = async (data) => {
    await api.post("/games", data);
    fetchGames();
  };

  const updateGame = async (id, data) => {
    await api.put(`/games/${id}`, data);
    setEditing(null);
    fetchGames();
  };

  const deleteGame = async (id) => {
    if (confirm("¿Eliminar juego?")) {
      await api.delete(`/games/${id}`);
      fetchGames();
    }
  };

  return (
    <div className="container">
      <h1>🎮 Lista de Juegos</h1>
      <GameForm onSubmit={createGame} />
      <hr />
      {games.map((game) => (
        <GameCard
          key={game._id}
          game={game}
          onEdit={() => setEditing(game)}
          onDelete={() => deleteGame(game._id)}
        />
      ))}
      {editing && (
        <div className="card" style={{ background: "#eef" }}>
          <h3>Editando: {editing.title}</h3>
          <GameForm initial={editing} onSubmit={(data) => updateGame(editing._id, data)} onCancel={() => setEditing(null)} />
        </div>
      )}
    </div>
  );
}
