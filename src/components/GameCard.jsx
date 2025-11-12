import { useNavigate } from "react-router-dom";

export default function GameCard({ game, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    console.log("Navegando a:", `/games/${game._id}`);
    navigate(`/games/${game._id}`);
  };

  return (
    <div className="card">
      {game.imageUrl && (
        <img
          src={game.imageUrl}
          alt={game.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        />
      )}

      <h3 style={{ marginBottom: "10px" }}>{game.title}</h3>

      <div style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "12px" }}>
        <p><strong>🎮 Plataforma:</strong> {game.platform || "N/A"}</p>
        <p><strong>🏷️ Género:</strong> {game.genre || "N/A"}</p>
        <p><strong>⏱️ Horas:</strong> {game.hoursPlayed}</p>
        <p><strong>⭐ Calificación:</strong> {game.rating}/5</p>
        <p><strong>✅ Estado:</strong> {game.completed ? "Completado" : "En progreso"}</p>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button className="primary" onClick={onEdit} style={{ flex: 1 }}>
          ✏️ Editar
        </button>
        <button className="danger" onClick={onDelete} style={{ flex: 1 }}>
          🗑️ Eliminar
        </button>
        <button 
          onClick={handleViewDetail}
          style={{ 
            flex: 1, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "10px 16px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "background-color 0.3s ease",
            cursor: "pointer",
            border: "none",
            fontSize: "inherit",
            fontFamily: "inherit"
          }}
        >
          👀 Detalle
        </button>
      </div>
    </div>
  );
}
