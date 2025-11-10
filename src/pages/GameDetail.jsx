import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  const getGame = async () => {
    try {
      const res = await api.get(`/games/${id}`);
      setGame(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGame();
  }, [id]);

  if (!game) return <div className="container">Cargando juego...</div>;

  return (
    <div className="container">
      <Link to="/" className="secondary" style={{ display: "inline-block", marginBottom: "20px" }}>
        ← Volver
      </Link>

      <div className="card">
        {game.imageUrl && <img src={game.imageUrl} alt={game.title} />}
        <h1>{game.title}</h1>
        <p><strong>Plataforma:</strong> {game.platform}</p>
        <p><strong>Género:</strong> {game.genre}</p>
        <p><strong>Horas jugadas:</strong> {game.hoursPlayed}</p>
        <p><strong>Completado:</strong> {game.completed ? "Sí" : "No"}</p>
        <p><strong>⭐ Calificación:</strong> {game.rating}</p>
      </div>

      <h2>📝 Reseñas</h2>
      <ReviewForm gameId={id} onReviewAdded={getGame} />
      <ReviewList gameId={id} />
    </div>
  );
}
