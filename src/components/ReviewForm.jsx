import { useState } from "react";
import api from "../services/api";

export default function ReviewForm({ gameId, onReviewAdded }) {
  const [form, setForm] = useState({
    rating: 5,
    reviewText: "",
    hoursPlayed: 0,
    difficulty: "Media",
    recommend: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/reviews", { gameId, ...form });
    setForm({ rating: 5, reviewText: "", hoursPlayed: 0, difficulty: "Media", recommend: true });
    onReviewAdded && onReviewAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agrega una reseña</h3>
      <label>Calificación (1-5)</label>
      <input type="number" name="rating" min="1" max="5" value={form.rating} onChange={handleChange} />

      <label>Horas jugadas</label>
      <input type="number" name="hoursPlayed" value={form.hoursPlayed} onChange={handleChange} />

      <label>Dificultad</label>
      <select name="difficulty" value={form.difficulty} onChange={handleChange}>
        <option>Fácil</option>
        <option>Media</option>
        <option>Alta</option>
      </select>

      <label>Recomendar juego</label>
      <input type="checkbox" name="recommend" checked={form.recommend} onChange={handleChange} />

      <label>Comentario</label>
      <textarea name="reviewText" value={form.reviewText} onChange={handleChange} placeholder="Escribe tu reseña..." />

      <button className="primary" type="submit">Publicar reseña</button>
    </form>
  );
}
