import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // --- Canciones de tu base de datos (IDs 1 al 11) ---
  await prisma.cancion.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      titulo: "Joseph",
      descripcion: null,
      reproducida: false,
      salidaEn: new Date("2026-10-08T14:20:49.294Z"),
      artista: "Falling In Reverse",
      genero: "Metal",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      titulo: "The hum",
      descripcion: null,
      reproducida: false,
      salidaEn: new Date("2026-10-13T13:40:42.959Z"),
      artista: "Dimitry vegas",
      genero: "EDM",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      titulo: "Mas Alcohol",
      descripcion: null,
      reproducida: false,
      salidaEn: new Date("2026-11-16T18:10:01.352Z"),
      artista: "Natos y Waor",
      genero: "Rap",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      titulo: "Blinding Lights",
      descripcion: "Uno de los mayores éxitos de la música pop moderna.",
      reproducida: false,
      salidaEn: new Date("2026-10-08T14:27:17.680Z"),
      artista: "The Weeknd",
      genero: "Synthwave",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 5 },
    update: {},
    create: {
      id: 5,
      titulo: "Chop Suey!",
      descripcion: null,
      reproducida: false,
      salidaEn: new Date("2026-10-08T14:27:51.352Z"),
      artista: "System of a Down",
      genero: "Alternative Metal",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 6 },
    update: {},
    create: {
      id: 6,
      titulo: "Starboy",
      descripcion: null,
      reproducida: false,
      salidaEn: new Date("2026-10-08T14:28:34.512Z"),
      artista: "The Weeknd ft. Daft Punk",
      genero: "R&B",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 7 },
    update: {},
    create: {
      id: 7,
      titulo: "Strobe",
      descripcion: "Considerada una de las obras maestras de la música electrónica de club.",
      reproducida: false,
      salidaEn: new Date("2026-10-08T14:28:57.664Z"),
      artista: "deadmau5",
      genero: "Progressive House",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 8 },
    update: {},
    create: {
      id: 8,
      titulo: "Animals",
      descripcion: "El éxito global que definió la era dorada del EDM en 2013.",
      reproducida: false,
      salidaEn: new Date("2026-10-08T14:29:03.512Z"),
      artista: "Martin Garrix",
      genero: "Big Room House",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 9 },
    update: {},
    create: {
      id: 9,
      titulo: "Scary Monsters and Nice Sprites",
      descripcion: "Tema icónico que popularizó el sonido brostep a nivel mundial.",
      reproducida: false,
      salidaEn: new Date("2026-10-08T14:29:14.816Z"),
      artista: "Skrillex",
      genero: "Dubstep",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 10 },
    update: {},
    create: {
      id: 10,
      titulo: "Levels",
      descripcion: null,
      reproducida: false,
      salidaEn: new Date("2026-10-08T14:29:40.310Z"),
      artista: "Avicii",
      genero: "Melodic House",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 11 },
    update: {},
    create: {
      id: 11,
      titulo: "Clarity",
      descripcion: null,
      reproducida: false,
      salidaEn: new Date("2026-10-08T14:30:01.087Z"),
      artista: "Zedd ft. Foxes",
      genero: "Electro House",
    },
  });

  // --- Canciones de tu seed original añadidas al final (IDs 12 y 13) ---
  await prisma.cancion.upsert({
    where: { id: 12 },
    update: {},
    create: {
      id: 12,
      titulo: "Adagio for Strings",
      descripcion: "Himno icónico del trance incluido en el álbum Just Be",
      reproducida: false,
      salidaEn: new Date("2005-01-31T00:00:00.000Z"),
      artista: "Tiësto",
      genero: "Trance",
    },
  });

  await prisma.cancion.upsert({
    where: { id: 13 },
    update: {},
    create: {
      id: 13,
      titulo: "Infinity 2008",
      descripcion: "Clásico del dance y house europeo (Klaas Vocal Edit)",
      reproducida: true,
      salidaEn: new Date("2008-05-14T00:00:00.000Z"),
      artista: "Guru Josh Project",
      genero: "Electrónica",
    },
  });
}

main().finally(() => prisma.$disconnect());
