import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlistGames, setWishlistGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: "",
    genre: "",
    platform: "",
    estimatedPrice: 0,
    priority: "media",
    notes: "",
  });
  const [toast, setToast] = useState(null);

  const handleBack = () => {
    navigate("/");
  };

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlistGames(res.data);
    } catch (error) {
      console.error("Error al obtener wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async (e) => {
    e.preventDefault();
    if (!newGame.title.trim()) {
      setToast({ message: "El título es requerido", type: "warning" });
      return;
    }
    try {
      await api.post("/wishlist", newGame);
      setNewGame({
        title: "",
        genre: "",
        platform: "",
        estimatedPrice: 0,
        priority: "media",
        notes: "",
      });
      fetchWishlist();
      setToast({ message: "Juego agregado a la wishlist", type: "success" });
    } catch (error) {
      console.error("Error al agregar a wishlist:", error);
      setToast({ message: "Error al agregar a la wishlist", type: "error" });
    }
  };

  const removeFromWishlist = async (id) => {
    if (confirm("¿Deseas remover este juego de tu wishlist?")) {
      try {
        await api.delete(`/wishlist/${id}`);
        fetchWishlist();
        setToast({ message: "Juego removido de la wishlist", type: "success" });
      } catch (error) {
        console.error("Error al remover de wishlist:", error);
        setToast({ message: "Error al remover de la wishlist", type: "error" });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setNewGame((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "#dc2626";
      case "media":
        return "#f59e0b";
      case "baja":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: "30px" }}>
        <button onClick={handleBack} className="btn secondary" style={{ marginBottom: "20px" }}>
          ← Volver a Biblioteca
        </button>

        <h1>Wishlist</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "10px", fontSize: "15px", lineHeight: "1.6" }}>
          Tu lista de deseos personal. Agrega aquí los juegos que quieres comprar en el futuro, establece su prioridad y mantén notas sobre ellos. Organiza tus compras pendientes y nunca pierdas de vista esos títulos que esperas conseguir.
        </p>
        <p style={{ color: "var(--text-primary)", marginTop: "10px", fontWeight: "600" }}>
          Total de juegos deseados: {wishlistGames.length}
        </p>
      </div>

      {/* Formulario para agregar a wishlist */}
      <div className="card">
        <h3>Agregar a Wishlist</h3>
        <form onSubmit={addToWishlist}>
          <input
            type="text"
            name="title"
            value={newGame.title}
            onChange={handleChange}
            placeholder="Título del juego *"
            required
          />
          <input
            type="text"
            name="genre"
            value={newGame.genre}
            onChange={handleChange}
            placeholder="Género (opcional)"
          />
          <input
            type="text"
            name="platform"
            value={newGame.platform}
            onChange={handleChange}
            placeholder="Plataforma (PC, PS5, Xbox, etc.)"
          />
          <input
            type="number"
            name="estimatedPrice"
            value={newGame.estimatedPrice}
            onChange={handleChange}
            placeholder="Precio estimado (opcional)"
            min="0"
            step="0.01"
          />
          <label>
            <strong>Prioridad:</strong>
            <select name="priority" value={newGame.priority} onChange={handleChange} style={{ marginLeft: "10px" }}>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </label>
          <textarea
            name="notes"
            value={newGame.notes}
            onChange={handleChange}
            placeholder="Notas (opcional)"
            rows="3"
          />
          <button className="primary" type="submit">
            Agregar a Wishlist
          </button>
        </form>
      </div>

      <hr />

      {/* Lista de wishlist */}
      {wishlistGames.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--text-secondary)", padding: "40px" }}>
          Tu wishlist está vacía. Agrega algunos juegos que te gustaría jugar.
        </p>
      ) : (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {wishlistGames.map((game) => (
              <div key={game._id} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
                  <h3 style={{ margin: 0 }}>{game.title}</h3>
                  <span
                    style={{
                      backgroundColor: getPriorityColor(game.priority),
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {game.priority}
                  </span>
                </div>

                <div style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "12px" }}>
                  {game.genre && <p><strong>Género:</strong> {game.genre}</p>}
                  {game.platform && <p><strong>Plataforma:</strong> {game.platform}</p>}
                  {game.estimatedPrice > 0 && (
                    <p><strong>Precio estimado:</strong> ${game.estimatedPrice.toFixed(2)}</p>
                  )}
                  {game.notes && <p><strong>Notas:</strong> {game.notes}</p>}
                </div>

                <button
                  className="danger"
                  onClick={() => removeFromWishlist(game._id)}
                  style={{ width: "100%" }}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          {/* Resumen de precios */}
          {wishlistGames.filter((g) => g.estimatedPrice > 0).length > 0 && (
            <>
              <hr />
              <div className="stat-card">
                <h3>Presupuesto Total Estimado</h3>
                <div className="value">
                  ${wishlistGames.reduce((sum, g) => sum + (g.estimatedPrice || 0), 0).toFixed(2)}
                </div>
                <small style={{ color: "var(--text-secondary)" }}>
                  {wishlistGames.filter((g) => g.estimatedPrice > 0).length} juegos con precio
                </small>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
