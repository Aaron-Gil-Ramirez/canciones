import { useCallback, useEffect, useState } from "react";
import { obtenerCanciones, crearCancion, modificarCancion, eliminarCancion }
  from "./services/cancionesApi";
import CancionForm from "./components/CancionForm";
import CancionItem from "./components/CancionItem";

function App() {
  const [canciones, setCanciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [aviso, setAviso] = useState(null);

  function mostrarAviso(tipo, texto) {
    setAviso({ tipo, texto });
  }

  const [apiKey, setApiKey] = useState(
    () => sessionStorage.getItem("apiKey") ?? ""
  );

  function guardarApiKey() {
    sessionStorage.setItem("apiKey", apiKey);
    mostrarAviso("ok", "Clave guardada correctamente para esta sesión");
  }


  const cargarCanciones = useCallback(async () => {
    try {
      setErrorCarga("");
      setCanciones(await obtenerCanciones());
    } catch (err) {
      setErrorCarga(err.message);
    }
  }, []);

  useEffect(() => {
    cargarCanciones().finally(() => setCargando(false));
  }, [cargarCanciones]);

  async function manejarEliminar(id) {
    if (!window.confirm("¿Seguro que quieres eliminar esta canción de la lista?")) return;
    try {
      await eliminarCancion(id);
      setCanciones((actuales) => actuales.filter((c) => c.id !== id));
      mostrarAviso("ok", "Canción eliminada correctamente");
    } catch (err) {
      mostrarAviso("error", err.message);
    }
  }


  async function manejarCambiarEstado(cancion) {
    const cambios = { reproducida: !cancion.reproducida };
    try {
      const actualizada = await modificarCancion(cancion.id, cambios);
      setCanciones((actuales) =>
        actuales.map((c) =>
          // copia nueva; si la API no devuelve la canción, aplicamos el cambio local
          c.id === cancion.id ? { ...c, ...cambios, ...actualizada } : c
        )
      );
      mostrarAviso("ok", `Estado de "${cancion.titulo}" actualizado`);
    } catch (err) {
      mostrarAviso("error", err.message);
    }
  }

  async function manejarCrear(datos) {
    try {
      const nueva = await crearCancion(datos);
      setCanciones((actuales) => [...actuales, nueva]);
      mostrarAviso("ok", `Canción "${nueva.titulo}" añadida con éxito`);
      return true;
    } catch (err) {
      mostrarAviso("error", err.message);
      return false;
    }
  }

  function reintentar() {
    setCargando(true);
    cargarCanciones().finally(() => setCargando(false));
  }

  return (
    <main>
      <h1>Gestor de canciones</h1>

      {aviso && (
        <p className={`aviso aviso-${aviso.tipo}`} role="status">
          {aviso.texto}
        </p>
      )}

      <section>
        <h2>Acceso a operaciones protegidas</h2>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Introduce la API key"
        />
        <button onClick={guardarApiKey}>Guardar durante la sesión</button>
      </section>

      <CancionForm onCrear={manejarCrear} />


      {cargando && <p>Cargando...</p>}

      {!cargando && errorCarga && (
        <div role="alert">
          <p>{errorCarga}</p>
          <button onClick={reintentar}>Reintentar</button>
        </div>
      )}

      {!cargando && !errorCarga && canciones.length === 0 && (
        <p>No hay canciones en la lista.</p>
      )}

      {!cargando && !errorCarga && canciones.map((cancion) => (
        <CancionItem
          key={cancion.id}
          cancion={cancion}
          onCambiarEstado={manejarCambiarEstado}
          onEliminar={manejarEliminar}
        />
      ))}
    </main>
  );
}

export default App;
