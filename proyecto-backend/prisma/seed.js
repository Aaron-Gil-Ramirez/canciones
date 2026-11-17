import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.cancion.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      titulo: "Infinity 2008",
      descripcion: "Clásico del dance y house europeo (Klaas Vocal Edit)",
      reproducida: true,
      salidaEn: new Date("2008-05-14T00:00:00.000Z"),
      artista: "Guru Josh Project",
      genero: "Electrónica",
    },
  });
  await prisma.cancion.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      titulo: "Adagio for Strings",
      descripcion: "Himno icónico del trance incluido en el álbum Just Be",
      reproducida: false,
      salidaEn: new Date("2005-01-31T00:00:00.000Z"),
      artista: "Tiësto",
      genero: "Trance",
    },
  });
}

main().finally(() => prisma.$disconnect());
