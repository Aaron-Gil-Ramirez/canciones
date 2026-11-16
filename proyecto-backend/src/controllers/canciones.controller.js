import prisma from "../lib/prisma.js";

export async function listarCanciones(req, res) {
  try {
    const canciones = await prisma.cancion.findMany({
      orderBy: { id: "asc" }
    });
    res.json(canciones);
  } catch (error) {
    res.status(500).json({ error: "No se pudieron obtener las canciones" });
  }
}

export async function obtenerCancion(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const cancion = await prisma.cancion.findUnique({
      where: { id }
    });

    if (!cancion) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    res.json(cancion);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener la canción" });
  }
}

export async function crearCancion(req, res) {
  try {
    const { titulo, descripcion, artista, genero } = req.body;

    // Validar campos obligatorios según el schema
    if (!titulo || !artista || !genero) {
      return res.status(400).json({ error: "El título, artista y género son obligatorios" });
    }

    const cancion = await prisma.cancion.create({
      data: {
        titulo: titulo.trim(),
        artista: artista.trim(),
        genero: genero.trim(),
        descripcion: descripcion?.trim() || null
      }
    });

    res.status(201).json(cancion);
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear la canción" });
  }
}

export async function actualizarCancion(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.cancion.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    const { titulo, descripcion, reproducida, artista, genero } = req.body;
    const datos = {};

    if (titulo !== undefined) {
      if (typeof titulo !== "string" || titulo.trim().length < 3) {
        return res.status(400).json({
          error: "El título debe tener al menos 3 caracteres"
        });
      }
      datos.titulo = titulo.trim();
    }

    if (artista !== undefined) {
      if (typeof artista !== "string" || artista.trim().length === 0) {
        return res.status(400).json({ error: "El artista no puede estar vacío" });
      }
      datos.artista = artista.trim();
    }

    if (genero !== undefined) {
      if (typeof genero !== "string" || genero.trim().length === 0) {
        return res.status(400).json({ error: "El género no puede estar vacío" });
      }
      datos.genero = genero.trim();
    }

    if (descripcion !== undefined) {
      datos.descripcion =
        typeof descripcion === "string" && descripcion.trim()
          ? descripcion.trim()
          : null;
    }

    if (reproducida !== undefined) {
      if (typeof reproducida !== "boolean") {
        return res.status(400).json({
          error: "reproducida debe ser true o false"
        });
      }
      datos.reproducida = reproducida;
    }

    const cancion = await prisma.cancion.update({
      where: { id },
      data: datos
    });

    res.json(cancion);
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar la canción" });
  }
}

export async function eliminarCancion(req, res) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.cancion.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    await prisma.cancion.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "No se pudo eliminar la canción" });
  }
}
