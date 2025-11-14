import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);

  // Cargar juego inicial
  useEffect(() => {
    const loadGame = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        console.log("Cargando juego con ID:", id);
        const res = await api.get(`/games/${id}`);
        console.log("Juego cargado:", res.data);
        setGame(res.data);
      } catch (error) {
        console.error("Error al obtener el juego:", error);
        setError("Error al cargar el juego. Por favor, intenta nuevamente.");
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    loadGame();
  }, [id]);

  // Función para recargar las reseñas cuando se agrega una nueva
  const handleReviewAdded = useCallback(() => {
    console.log("Reseña agregada, recargando lista de reseñas");
    setReviewCount(prev => prev + 1);
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "60px 20px" }}>
        <div className="spinner" style={{ margin: "0 auto", marginBottom: "20px" }}></div>
        <p>Cargando juego...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <button onClick={handleBack} className="btn secondary" style={{ marginBottom: "20px" }}>
          ← Volver a la Biblioteca
        </button>
        <div className="alert error">{error}</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container">
        <button onClick={handleBack} className="btn secondary" style={{ marginBottom: "20px" }}>
          ← Volver a la Biblioteca
        </button>
        <div className="alert warning">Juego no encontrado</div>
      </div>
    );
  }

  return (
    <div className="container">
      <button onClick={handleBack} className="btn secondary" style={{ marginBottom: "20px" }}>
        Volver
      </button>

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
            <p><strong>Desarrollador:</strong> {game.developer || "N/A"}</p>
            <p><strong>Año de lanzamiento:</strong> {game.releaseYear || "N/A"}</p>
            <p><strong>Plataforma:</strong> {game.platform || "N/A"}</p>
            <p><strong>Género:</strong> {game.genre || "N/A"}</p>
          </div>
          <div>
            <p><strong>Horas jugadas:</strong> {game.hoursPlayed}</p>
            <p><strong>Calificación:</strong> {game.rating}/5</p>
          </div>
          <div>
            <p>
              <strong>Estado:</strong>{" "}
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

        {game.description && (
          <div style={{ 
            backgroundColor: "var(--card-bg)", 
            padding: "16px", 
            borderRadius: "8px", 
            marginBottom: "20px",
            borderLeft: "4px solid var(--primary)"
          }}>
            <h3 style={{ marginBottom: "10px" }}>Descripción</h3>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{game.description}</p>
          </div>
        )}
      </div>

      <hr />

      <h2>Reseñas</h2>
      <ReviewForm gameId={id} onReviewAdded={handleReviewAdded} />
      <ReviewList gameId={id} key={reviewCount} />
    </div>
  );
}
