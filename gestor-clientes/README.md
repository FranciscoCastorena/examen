# Gestor de Clientes

Aplicación web para registrar, consultar, editar y eliminar clientes.

## Requisitos

Para ejecutar este proyecto es necesario contar con las siguientes dependencias:

- Node.js 20 o superior
- npm

##  Instalación para Desarrollo

Para instalar el proyecto por primera vez, sigue estos pasos:

### 1 Clonar el repositorio

```bash
git clone https://github.com/FranciscoCastorena/examen.git
cd examen/gestor-clientes
```

### 2 Instalar las dependencias del backend

```bash
cd backend
npm install
```

### 3 Preparar archivos de configuración

Generar el `.env` dentro de la carpeta `backend` a partir de una copia del archivo `.env.example`:


### 4 Ejecutar las migraciones de la base de datos

Crea la base de datos SQLite (`backend/prisma/dev.db`) y la tabla de clientes:

```bash
npm run db:migrate
```

### 5 Levantar el servidor backend

```bash
npm run dev
```

La API queda disponible en http://localhost:3001/api/clientes

### 6 Instalar las dependencias del frontend

En otra terminal, desde la carpeta `gestor-clientes`:

```bash
cd frontend
npm install
```

### 7 Levantar el frontend

```bash
npm run dev
```

Abrir http://localhost:5173 en el navegador.
