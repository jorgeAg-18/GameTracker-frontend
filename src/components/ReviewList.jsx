import { useEffect, useState } from "react";
import api from "../services/api";

export default function ReviewList({ gameId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/reviews/juego/${gameId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error al obtener reseñas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviews();
  }, [gameId]);

  if (loading) return <p style={{ color: "var(--text-secondary)" }}>Cargando reseñas...</p>;

  if (!reviews.length) return <p style={{ color: "var(--text-secondary)", fontStyle: "italic" }}>No hay reseñas aún. Sé el primero en reseñar</p>;

  return (
    <div>
      {reviews.map((r) => (
        <div key={r._id} className="review">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
            <div>
              <small style={{ display: "flex", gap: "15px", color: "var(--text-primary)" }}>
                <span><strong>Calificación:</strong> {r.rating}/5</span>
                <span><strong>Dificultad:</strong> {r.difficulty}</span>
              </small>
            </div>
            <small style={{ 
              backgroundColor: r.recommend ? "#10b981" : "#dc2626",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontWeight: "bold"
            }}>
              {r.recommend ? "Recomendado" : "No Recomendado"}
            </small>
          </div>

          <p style={{ marginBottom: "10px", lineHeight: "1.6" }}>{r.reviewText}</p>

          <small style={{ color: "var(--text-secondary)", display: "block" }}>
            Horas jugadas: {r.hoursPlayed}
          </small>
        </div>
      ))}
    </div>
  );
}
