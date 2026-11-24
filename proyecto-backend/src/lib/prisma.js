import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client.js";

// Carpeta proyecto-backend, se arranque el servidor desde donde se arranque
const raiz = fileURLToPath(new URL("../../", import.meta.url));
dotenv.config({ path: path.join(raiz, ".env"), quiet: true });

// Convierte "file:./dev.db" en una ruta absoluta dentro de proyecto-backend
const url = process.env.DATABASE_URL ?? "file:./dev.db";
const ruta = path.resolve(raiz, url.replace(/^file:/, ""));

const adapter = new PrismaBetterSqlite3({ url: `file:${ruta}` });
const prisma = new PrismaClient({ adapter });

export default prisma;