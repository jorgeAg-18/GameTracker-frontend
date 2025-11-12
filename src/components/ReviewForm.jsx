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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.reviewText.trim()) {
      alert("Por favor escribe una reseña");
      return;
    }
    
    setLoading(true);
    try {
      await api.post("/reviews", { gameId, ...form });
      setForm({ rating: 5, reviewText: "", hoursPlayed: 0, difficulty: "Media", recommend: true });
      alert("Reseña publicada correctamente");
      onReviewAdded && onReviewAdded();
    } catch (error) {
      console.error("Error al publicar reseña:", error);
      alert("Error al publicar la reseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: "20px" }}>
      <h3>📝 Agregar Reseña</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", marginBottom: "15px" }}>
        <div>
          <label><strong>⭐ Calificación</strong></label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            step="0.5"
            value={form.rating}
            onChange={handleChange}
          />
        </div>

        <div>
          <label><strong>⏱️ Horas Jugadas</strong></label>
          <input
            type="number"
            name="hoursPlayed"
            min="0"
            value={form.hoursPlayed}
            onChange={handleChange}
          />
        </div>

        <div>
          <label><strong>🎯 Dificultad</strong></label>
          <select name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option>Fácil</option>
            <option>Media</option>
            <option>Alta</option>
          </select>
        </div>
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px" }}>
        <input
          type="checkbox"
          name="recommend"
          checked={form.recommend}
          onChange={handleChange}
        />
        <strong>{form.recommend ? "✅ Recomiendo este juego" : "🚫 No recomiendo este juego"}</strong>
      </label>

      <label><strong>💬 Tu Reseña</strong></label>
      <textarea
        name="reviewText"
        value={form.reviewText}
        onChange={handleChange}
        placeholder="Escribe tu reseña detallada aquí... ¿Qué te pareció el juego?"
        rows="5"
      />

      <button className="primary" type="submit" disabled={loading}>
        {loading ? "Publicando..." : "📤 Publicar Reseña"}
      </button>
    </form>
  );
}
