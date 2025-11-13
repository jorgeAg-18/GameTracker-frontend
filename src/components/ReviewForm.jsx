import { useState } from "react";
import api from "../services/api";
import Toast from "./Toast";

export default function ReviewForm({ gameId, onReviewAdded }) {
  const [form, setForm] = useState({
    rating: 5,
    reviewText: "",
    hoursPlayed: 0,
    difficulty: "Media",
    recommend: true,
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

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
      setToast({ message: "Por favor escribe una reseña", type: "warning" });
      return;
    }
    
    setLoading(true);
    try {
      await api.post("/reviews", { gameId, ...form });
      setForm({ rating: 5, reviewText: "", hoursPlayed: 0, difficulty: "Media", recommend: true });
      setToast({ message: "Reseña publicada correctamente", type: "success" });
      onReviewAdded && onReviewAdded();
    } catch (error) {
      console.error("Error al publicar reseña:", error);
      setToast({ message: "Error al publicar la reseña", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: "20px" }}>
      <h3>Agregar Reseña</h3>
      
      {/* Calificación con Range Slider */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label><strong>Calificación</strong></label>
          <span style={{ 
            backgroundColor: "var(--primary)", 
            color: "white", 
            padding: "4px 12px", 
            borderRadius: "4px",
            fontWeight: "700",
            minWidth: "60px",
            textAlign: "center"
          }}>
            {form.rating}/5
          </span>
        </div>
        <input
          type="range"
          name="rating"
          min="1"
          max="5"
          step="0.5"
          value={form.rating}
          onChange={handleChange}
          className="range-slider"
        />
      </div>

      {/* Horas Jugadas con Range Slider */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label><strong>Horas Jugadas</strong></label>
          <span style={{ 
            backgroundColor: "var(--primary)", 
            color: "white", 
            padding: "4px 12px", 
            borderRadius: "4px",
            fontWeight: "700",
            minWidth: "60px",
            textAlign: "center"
          }}>
            {form.hoursPlayed}h
          </span>
        </div>
        <input
          type="range"
          name="hoursPlayed"
          min="0"
          max="500"
          step="1"
          value={form.hoursPlayed}
          onChange={handleChange}
          className="range-slider"
        />
      </div>

      {/* Dificultad */}
      <div style={{ marginBottom: "20px" }}>
        <label><strong>Dificultad</strong></label>
        <select name="difficulty" value={form.difficulty} onChange={handleChange} style={{ marginTop: "8px" }}>
          <option>Fácil</option>
          <option>Media</option>
          <option>Alta</option>
        </select>
      </div>

      {/* Toggle para Recomendar */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", flex: 1 }}>
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <input
              type="checkbox"
              name="recommend"
              checked={form.recommend}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <div style={{
              width: "50px",
              height: "28px",
              backgroundColor: form.recommend ? "var(--primary)" : "rgba(255, 255, 255, 0.15)",
              borderRadius: "14px",
              padding: "2px",
              cursor: "pointer",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              position: "relative"
            }}>
              <div style={{
                width: "24px",
                height: "24px",
                backgroundColor: "white",
                borderRadius: "50%",
                transition: "all 0.3s ease",
                position: "absolute",
                left: form.recommend ? "calc(100% - 26px)" : "2px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)"
              }}></div>
            </div>
          </div>
          <strong style={{ whiteSpace: "nowrap" }}>
            {form.recommend ? "Recomiendo" : "No recomiendo"}
          </strong>
        </label>
      </div>

      <label><strong>Tu Reseña</strong></label>
      <textarea
        name="reviewText"
        value={form.reviewText}
        onChange={handleChange}
        placeholder="Escribe tu reseña detallada aquí..."
        rows="5"
        style={{ marginTop: "8px" }}
      />

      <button className="primary" type="submit" disabled={loading} style={{ marginTop: "15px" }}>
        {loading ? "Publicando..." : "Publicar Reseña"}
      </button>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </form>
  );
}
