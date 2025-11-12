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
  }, [memoizedInitial._id]); // Solo depender del ID

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
    <form onSubmit={submit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Título *" required />
      <input name="platform" value={form.platform} onChange={handleChange} placeholder="Plataforma (PC, PS5, Xbox, etc.)" />
      <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género (RPG, Acción, etc.)" />
      <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="URL de portada (opcional)" />
      <input name="hoursPlayed" type="number" value={form.hoursPlayed} onChange={handleChange} placeholder="Horas jugadas" min="0" />
      <input name="rating" type="number" value={form.rating} onChange={handleChange} placeholder="Calificación (0-5)" min="0" max="5" step="0.5" />
      <label>
        <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} /> Completado
      </label>
      <div>
        <button className="primary" type="submit">{initial._id ? "Actualizar" : "Guardar"}</button>
        {onCancel && <button className="secondary" onClick={onCancel} type="button">Cancelar</button>}
      </div>
    </form>
  );
}
