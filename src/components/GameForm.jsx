import { useState, useEffect, useMemo } from "react";

export default function GameForm({ onSubmit, initial = {}, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    platform: "",
    genre: "",
    hoursPlayed: 0,
    completed: false,
    rating: 0,
    imageUrl: "",
    ...initial,
  });

  // Memoizar inicial para evitar ciclos infinitos
  const memoizedInitial = useMemo(() => initial, [initial._id, initial.title, initial.platform, initial.genre]);

  useEffect(() => {
    setForm((prev) => ({ ...prev, ...memoizedInitial }));
  }, [memoizedInitial._id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("El título es requerido");
      return;
    }
    onSubmit(form);
    setForm({
      title: "",
      platform: "",
      genre: "",
      hoursPlayed: 0,
      completed: false,
      rating: 0,
      imageUrl: "",
    });
  };

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: "20px" }}>
      {/* Fila 1: Título e Imagen */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600", 
            color: "var(--text-primary)",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Título
          </label>
          <input 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            placeholder="Ingresa el título del juego" 
            required 
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid var(--border-color)",
              borderRadius: "8px",
              backgroundColor: "var(--input-bg)",
              color: "var(--text-primary)",
              fontSize: "14px",
              transition: "all 0.3s ease"
            }}
          />
        </div>
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600", 
            color: "var(--text-primary)",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            URL de Portada
          </label>
          <input 
            name="imageUrl" 
            value={form.imageUrl} 
            onChange={handleChange} 
            placeholder="https://ejemplo.com/imagen.jpg" 
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid var(--border-color)",
              borderRadius: "8px",
              backgroundColor: "var(--input-bg)",
              color: "var(--text-primary)",
              fontSize: "14px",
              transition: "all 0.3s ease"
            }}
          />
        </div>
      </div>

      {/* Fila 2: Plataforma y Género */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600", 
            color: "var(--text-primary)",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Plataforma
          </label>
          <input 
            name="platform" 
            value={form.platform} 
            onChange={handleChange} 
            placeholder="PC, PS5, Xbox, Nintendo" 
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid var(--border-color)",
              borderRadius: "8px",
              backgroundColor: "var(--input-bg)",
              color: "var(--text-primary)",
              fontSize: "14px",
              transition: "all 0.3s ease"
            }}
          />
        </div>
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600", 
            color: "var(--text-primary)",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Género
          </label>
          <input 
            name="genre" 
            value={form.genre} 
            onChange={handleChange} 
            placeholder="RPG, Acción, Aventura" 
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid var(--border-color)",
              borderRadius: "8px",
              backgroundColor: "var(--input-bg)",
              color: "var(--text-primary)",
              fontSize: "14px",
              transition: "all 0.3s ease"
            }}
          />
        </div>
      </div>

      {/* Fila 3: Horas y Calificación */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600", 
            color: "var(--text-primary)",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Horas Jugadas
          </label>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <input 
              type="range"
              name="hoursPlayed" 
              value={form.hoursPlayed} 
              onChange={handleChange} 
              min="0" 
              max="1000"
              className="range-slider"
              style={{
                width: "100%",
                height: "8px",
                borderRadius: "5px",
                outline: "none",
                cursor: "pointer",
                WebkitAppearance: "none",
                appearance: "none"
              }}
            />
            <span style={{
              marginLeft: "12px",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              minWidth: "60px",
              textAlign: "center"
            }}>
              {form.hoursPlayed}h
            </span>
          </div>
        </div>
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600", 
            color: "var(--text-primary)",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}>
            Calificación
          </label>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input 
              type="range"
              name="rating" 
              value={form.rating} 
              onChange={handleChange} 
              min="0" 
              max="5" 
              step="0.5"
              className="range-slider-rating"
              style={{
                flex: 1,
                height: "8px",
                borderRadius: "5px",
                outline: "none",
                cursor: "pointer",
                WebkitAppearance: "none",
                appearance: "none"
              }}
            />
            <span style={{
              backgroundColor: "#fbbf24",
              color: "#1f2937",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              minWidth: "50px",
              textAlign: "center"
            }}>
              {form.rating}/5
            </span>
          </div>
        </div>
      </div>

      {/* Toggle de Completado */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px",
        backgroundColor: "var(--card-bg)",
        borderRadius: "8px",
        border: "2px solid var(--border-color)",
        cursor: "pointer",
        transition: "all 0.3s ease"
      }}
      onClick={() => setForm(prev => ({ ...prev, completed: !prev.completed }))}
      >
        <div style={{
          width: "50px",
          height: "28px",
          backgroundColor: form.completed ? "#10b981" : "var(--border-color)",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          padding: "2px",
          transition: "all 0.3s ease"
        }}>
          <div style={{
            width: "24px",
            height: "24px",
            backgroundColor: "white",
            borderRadius: "12px",
            transform: form.completed ? "translateX(22px)" : "translateX(0)",
            transition: "transform 0.3s ease"
          }} />
        </div>
        <span style={{ 
          fontWeight: "600", 
          color: "var(--text-primary)"
        }}>
          {form.completed ? "Completado" : "En Progreso"}
        </span>
      </div>

      {/* Botones */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            style={{
              padding: "12px 24px",
              backgroundColor: "var(--secondary-btn-bg)",
              color: "var(--secondary-btn-text)",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "var(--secondary-btn-hover)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "var(--secondary-btn-bg)"}
          >
            Cancelar
          </button>
        )}
        <button 
          type="submit"
          style={{
            padding: "12px 32px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#2563eb"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#3b82f6"}
        >
          {initial._id ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
