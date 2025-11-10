export default function GameCard({ game, onEdit, onDelete }) {
  return (
    <div className="card">
      {game.imageUrl && (
        <img
          src={game.imageUrl}
          alt={game.title}
          style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "5px" }}
        />
      )}
      <h3>{game.title}</h3>
      <p><strong>Plataforma:</strong> {game.platform}</p>
      <p><strong>Género:</strong> {game.genre}</p>
      <p><strong>Horas jugadas:</strong> {game.hoursPlayed}</p>
      <p><strong>Completado:</strong> {game.completed ? "Sí" : "No"}</p>
      <p><strong>⭐ Calificación:</strong> {game.rating}</p>

      <div>
        <button className="primary" onClick={onEdit}>Editar</button>
        <button className="danger" onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  );
}
