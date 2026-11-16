import { useState } from "react";
 
function CancionForm({ onCrear }) {
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [genero, setGenero] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [enviando, setEnviando] = useState(false);
 
  async function manejarSubmit(evento) {
    evento.preventDefault();
    setEnviando(true);
    
    const creada = await onCrear({ 
      titulo: titulo.trim(), 
      artista: artista.trim(),
      genero: genero.trim(),
      descripcion: descripcion.trim() || null 
    });
    
    setEnviando(false);
    if (creada) {
      setTitulo("");
      setArtista("");
      setGenero("");
      setDescripcion("");
    }
  }
 
  return (
    <form onSubmit={manejarSubmit}>
      <h2>Nueva canción</h2>
      
      <label>
        Título
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          minLength={3}
        />
      </label>

      <label>
        Artista
        <input
          value={artista}
          onChange={(e) => setArtista(e.target.value)}
          required
        />
      </label>

      <label>
        Género
        <input
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />
      </label>

      <label>
        Descripción (Opcional)
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </label>

      <button type="submit" disabled={enviando}>
        {enviando ? "Añadiendo..." : "Añadir canción"}
      </button>
    </form>
  );
}
 
export default CancionForm;
