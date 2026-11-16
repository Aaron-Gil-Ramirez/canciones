function CancionItem({ cancion, onCambiarEstado, onEliminar }) {
  return (
    <article>
      <h3>{cancion.titulo}</h3>
      <p><strong>Artista:</strong> {cancion.artista}</p>
      <p><strong>Género:</strong> {cancion.genero}</p>
      {cancion.descripcion && <p><strong>Descripción:</strong> {cancion.descripcion}</p>}
      <p>Estado: {cancion.reproducida ? "Reproducida" : "Pendiente de escuchar"}</p>
      
      <button onClick={() => onCambiarEstado(cancion)}>
        {cancion.reproducida ? "Escuchar de nuevo" : "Marcar como reproducida"}
      </button>
      <button onClick={() => onEliminar(cancion.id)}>Eliminar</button>
    </article>
  );
}
 
export default CancionItem;
