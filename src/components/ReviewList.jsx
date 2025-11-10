import { useEffect, useState } from "react";
import api from "../services/api";

export default function ReviewList({ gameId }) {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    try {
      const res = await api.get(`/reviews/juego/${gameId}`);
      setReviews(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, [gameId]);

  if (!reviews.length) return <p>No hay reseñas aún.</p>;

  return (
    <div>
      {reviews.map((r) => (
        <div key={r._id} className="review">
          <small>⭐ {r.rating} | {r.difficulty}</small>
          <p>{r.reviewText}</p>
          <small>
            Horas jugadas: {r.hoursPlayed} | {r.recommend ? "✅ Recomendado" : "🚫 No recomendado"}
          </small>
        </div>
      ))}
    </div>
  );
}
