import { Router } from "express";
import {
  listarCanciones,
  obtenerCancion,
  crearCancion,
  actualizarCancion,
  eliminarCancion
} from "../controllers/canciones.controller.js"; // ⚠️ Verifica que este nombre de archivo sea exacto en tu carpeta
import { validarCancion } from "../middleware/validarCancion.js";
import { comprobarApiKey } from "../middleware/apiKey.js";

const router = Router();

router.get("/", listarCanciones);
router.get("/:id", obtenerCancion);

// Flujo correcto: 1° Comprueba API Key -> 2° Valida Campos -> 3° Registra en Base de Datos
router.post("/", comprobarApiKey, validarCancion, crearCancion);
router.patch("/:id", comprobarApiKey, actualizarCancion);
router.delete("/:id", comprobarApiKey, eliminarCancion);

export default router;
