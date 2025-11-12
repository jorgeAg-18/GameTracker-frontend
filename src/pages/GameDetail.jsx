import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const getGame = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/games/${id}`);
      setGame(res.data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar el juego");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGame();
  }, [id]);

  if (loading) return <div className="container">Cargando juego...</div>;

  if (!game) return <div className="container">Juego no encontrado</div>;

  return (
    <div className="container">
      <Link to="/" className="secondary" style={{ display: "inline-block", marginBottom: "20px" }}>
        ← Volver a la Biblioteca
      </Link>

      <div className="card">
        {game.imageUrl && (
          <img
            src={game.imageUrl}
            alt={game.title}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          />
        )}

        <h1>{game.title}</h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "20px" }}>
          <div>
            <p><strong>🎮 Plataforma:</strong> {game.platform || "N/A"}</p>
            <p><strong>🏷️ Género:</strong> {game.genre || "N/A"}</p>
          </div>
          <div>
            <p><strong>⏱️ Horas jugadas:</strong> {game.hoursPlayed}</p>
            <p><strong>⭐ Calificación:</strong> {game.rating}/5</p>
          </div>
          <div>
            <p>
              <strong>✅ Estado:</strong>{" "}
              <span
                style={{
                  backgroundColor: game.completed ? "#10b981" : "#f59e0b",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                }}
              >
                {game.completed ? "Completado" : "En progreso"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <hr />

      <h2>📝 Reseñas</h2>
      <ReviewForm gameId={id} onReviewAdded={getGame} />
      <ReviewList gameId={id} />
    </div>
  );
}
