import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState({
    totalGames: 0,
    completedGames: 0,
    totalHours: 0,
    averageRating: 0,
    topGenre: "N/A",
    topPlatform: "N/A",
  });

  const handleBack = () => {
    navigate("/");
  };

  const fetchGames = async () => {
    try {
      const res = await api.get("/games");
      setGames(res.data);
      calculateStats(res.data);
    } catch (error) {
      console.error("Error al obtener estadísticas:", error);
    }
  };

  const calculateStats = (gamesList) => {
    if (gamesList.length === 0) {
      setStats({
        totalGames: 0,
        completedGames: 0,
        totalHours: 0,
        averageRating: 0,
        topGenre: "N/A",
        topPlatform: "N/A",
      });
      return;
    }

    const totalGames = gamesList.length;
    const completedGames = gamesList.filter((g) => g.completed).length;
    const totalHours = gamesList.reduce((sum, g) => sum + (g.hoursPlayed || 0), 0);
    const averageRating =
      gamesList.filter((g) => g.rating).length > 0
        ? (gamesList.reduce((sum, g) => sum + (g.rating || 0), 0) / gamesList.filter((g) => g.rating).length).toFixed(2)
        : 0;

    // Top genre
    const genreCount = {};
    gamesList.forEach((g) => {
      if (g.genre) {
        genreCount[g.genre] = (genreCount[g.genre] || 0) + 1;
      }
    });
    const topGenre = Object.keys(genreCount).length > 0
      ? Object.keys(genreCount).reduce((a, b) => (genreCount[a] > genreCount[b] ? a : b))
      : "N/A";

    // Top platform
    const platformCount = {};
    gamesList.forEach((g) => {
      if (g.platform) {
        platformCount[g.platform] = (platformCount[g.platform] || 0) + 1;
      }
    });
    const topPlatform = Object.keys(platformCount).length > 0
      ? Object.keys(platformCount).reduce((a, b) => (platformCount[a] > platformCount[b] ? a : b))
      : "N/A";

    setStats({
      totalGames,
      completedGames,
      totalHours,
      averageRating,
      topGenre,
      topPlatform,
    });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="container">
      <button onClick={handleBack} className="btn secondary" style={{ marginBottom: "20px" }}>
        ← Volver a Biblioteca
      </button>

      <h1>Estadísticas</h1>

      {/* Tarjetas de estadísticas */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total de Juegos</h3>
          <div className="value">{stats.totalGames}</div>
        </div>

        <div className="stat-card">
          <h3>Completados</h3>
          <div className="value">{stats.completedGames}</div>
          <small style={{ color: "var(--text-secondary)" }}>
            {stats.totalGames > 0 ? ((stats.completedGames / stats.totalGames) * 100).toFixed(1) : 0}%
          </small>
        </div>

        <div className="stat-card">
          <h3>Horas Jugadas</h3>
          <div className="value">{stats.totalHours}</div>
        </div>

        <div className="stat-card">
          <h3>Calificación Promedio</h3>
          <div className="value">{stats.averageRating}</div>
          <small style={{ color: "var(--text-secondary)" }}>de 5</small>
        </div>

        <div className="stat-card">
          <h3>Género Principal</h3>
          <div className="value" style={{ fontSize: "18px" }}>{stats.topGenre}</div>
        </div>

        <div className="stat-card">
          <h3>Plataforma Principal</h3>
          <div className="value" style={{ fontSize: "18px" }}>{stats.topPlatform}</div>
        </div>
      </div>

      <hr />

      {/* Top Games */}
      <h2>Juegos Mejor Calificados</h2>
      {games.filter((g) => g.rating > 0).length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {games
            .filter((g) => g.rating > 0)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6)
            .map((game) => (
              <div key={game._id} className="card">
                {game.imageUrl && (
                  <img src={game.imageUrl} alt={game.title} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
                )}
                <h4>{game.title}</h4>
                <p style={{ color: "#3b82f6", fontWeight: "bold" }}>{game.rating}/5</p>
                <small style={{ color: "var(--text-secondary)" }}>{game.platform} • {game.genre}</small>
              </div>
            ))}
        </div>
      ) : (
        <p style={{ color: "var(--text-secondary)" }}>Aún no tienes juegos calificados.</p>
      )}

      <hr />

      {/* Games by Genre */}
      <h2>Juegos por Género</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {Object.entries(
          games.reduce((acc, game) => {
            if (game.genre) {
              acc[game.genre] = (acc[game.genre] || 0) + 1;
            }
            return acc;
          }, {})
        ).map(([genre, count]) => (
          <div key={genre} className="stat-card">
            <h3>{genre}</h3>
            <div className="value">{count}</div>
            <small style={{ color: "var(--text-secondary)" }}>juegos</small>
          </div>
        ))}
      </div>

      <hr />

      {/* Games by Platform */}
      <h2>Juegos por Plataforma</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
        {Object.entries(
          games.reduce((acc, game) => {
            if (game.platform) {
              acc[game.platform] = (acc[game.platform] || 0) + 1;
            }
            return acc;
          }, {})
        ).map(([platform, count]) => (
          <div key={platform} className="stat-card">
            <h3>{platform}</h3>
            <div className="value">{count}</div>
            <small style={{ color: "var(--text-secondary)" }}>juegos</small>
          </div>
        ))}
      </div>
    </div>
  );
}
