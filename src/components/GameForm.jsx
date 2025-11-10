import { useState, useEffect } from "react";

export default function GameForm({ onSubmit, initial = {}, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    platform: "",
    genre: "",
    hoursPlayed: 0,
    completed: false,
    rating: 0,
    ...initial,
  });

  useEffect(() => {
    setForm((prev) => ({ ...prev, ...initial }));
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: "",
      platform: "",
      genre: "",
      hoursPlayed: 0,
      completed: false,
      rating: 0,
    });
  };

  return (
    <form onSubmit={submit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Título" />
      <input name="platform" value={form.platform} onChange={handleChange} placeholder="Plataforma" />
      <input name="genre" value={form.genre} onChange={handleChange} placeholder="Género" />
      <input name="hoursPlayed" type="number" value={form.hoursPlayed} onChange={handleChange} placeholder="Horas jugadas" />
      <input name="rating" type="number" value={form.rating} onChange={handleChange} placeholder="Calificación (0-5)" />
      <label>
        <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} /> Completado
      </label>
      <div>
        <button className="primary" type="submit">Guardar</button>
        {onCancel && <button className="secondary" onClick={onCancel} type="button">Cancelar</button>}
      </div>
    </form>
  );
}
