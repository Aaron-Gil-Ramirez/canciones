# 🎵 Gestión de Canciones y Artistas

Aplicación web full-stack para gestionar un catálogo de canciones y artistas. Permite consultar, crear, editar y eliminar registros mediante una API REST conectada a una base de datos relacional.

## 🌐 Despliegue en producción (Render)

* **Frontend (Static Site):** [https://onrender.com](https://onrender.com)
* **Backend (Web Service / API):** [https://onrender.com](https://onrender.com)

---

## 📁 Estructura del proyecto

```text
├── proyecto-backend/     # API REST con Node.js, Express y Prisma ORM
└── proyecto-frontend/    # Interfaz de usuario (SPA con Vite / React)
```

---

## 🚀 Ejecución en local

### 1. Requisitos previos
* Node.js (v18 o superior)
* Base de datos (PostgreSQL / SQLite según tu configuración)

### 2. Configuración del Backend
Entra en la carpeta del servidor, instala las dependencias y prepara la base de datos:

```bash
cd proyecto-backend
npm install
```

Crea un archivo `.env` en `proyecto-backend/` con las siguientes variables:
```env
DATABASE_URL="tu_cadena_de_conexion"
FRONTEND_URL="http://localhost:5173"
PORT=3000
```

Ejecuta las migraciones, carga los datos iniciales (`seed`) y arranca el servidor:
```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### 3. Configuración del Frontend
En una nueva terminal, entra en la carpeta del cliente e instala sus dependencias:

```bash
cd proyecto-frontend
npm install
```

Crea un archivo `.env` en `proyecto-frontend/` apuntando a tu backend local:
```env
VITE_API_URL="http://localhost:3000"
```

Arranca la aplicación:
```bash
npm run dev
```

