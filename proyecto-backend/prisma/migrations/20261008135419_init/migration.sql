-- CreateTable
CREATE TABLE "Cancion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "reproducida" BOOLEAN NOT NULL DEFAULT false,
    "salidaEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "artista" TEXT NOT NULL,
    "genero" TEXT NOT NULL
);
