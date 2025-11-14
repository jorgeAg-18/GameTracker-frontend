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

      <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px" }}>
        <p><strong>Desarrollador:</strong> {game.developer || "N/A"}</p>
        <p><strong>Año de lanzamiento:</strong> {game.releaseYear || "N/A"}</p>
        <p><strong>Plataforma:</strong> {game.platform || "N/A"}</p>
        <p><strong>Género:</strong> {game.genre || "N/A"}</p>
        <p><strong>Horas:</strong> {game.hoursPlayed}</p>
        <p><strong>Calificación:</strong> {game.rating}/5</p>
        <p><strong>Estado:</strong> {game.completed ? "Completado" : "En progreso"}</p>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button 
          className="primary" 
          onClick={onEdit} 
          style={{ flex: 1, fontSize: "13px" }}
        >
          Editar
        </button>
        <button 
          className="danger" 
          onClick={onDelete} 
          style={{ flex: 1, fontSize: "13px" }}
        >
          Eliminar
        </button>
        <button 
          className="info"
          onClick={handleViewDetail}
          style={{ 
            flex: 1, 
            fontSize: "13px"
          }}
        >
          Detalles
        </button>
      </div>
    </div>
  );
}
