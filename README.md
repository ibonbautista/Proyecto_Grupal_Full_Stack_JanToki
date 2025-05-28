# 🍽️ janToki

**janToki** es una aplicación web full-stack que conecta a los amantes de la gastronomía vasca con restaurantes organizados por categorías como **asador**, **alta cocina**, **sidrería**, **fusion**, **pintxos**, y muchas más. Los usuarios pueden descubrir, valorar y guardar sus restaurantes favoritos, mientras que los administradores pueden gestionar el contenido de la plataforma.

---

## 🚀 Características principales

- 🔍 Búsqueda por nombre de restaurante o población.
- 🗂️ Clasificación por categorías (moderna, tradicional, autor, etc.).
- 🗺️ Mapa interactivo con Leaflet para mostrar la ubicación del restaurante.
- 📷 Imagen, descripción y rating medio basado en reviews.
- 📝 Sistema de reviews CRUD solo para usuarios registrados.
- ⭐ Guardado de restaurantes favoritos por usuario.
- 🛠️ Panel de administración (CRUD completo de restaurantes y usuarios).
- 👤 Perfil con historial de reviews personales.
- 🔐 Autenticación con JWT, roles de usuario/admin.
- 🐳 Proyecto dockerizado (MongoDB + Backend Express).
- ⚛️ Frontend en React con componentes reutilizables, contexto global, estilos y utilidades.

---

## 🧑‍💻 Tecnologías utilizadas

### Backend
- **Node.js**, **Express**
- **MongoDB** + **Mongoose**
- **JWT**, **bcrypt**, **Multer**, **dotenv**
- Arquitectura modelo-controlador-ruta
- Control de errores centralizado
- Autenticación por token + middleware `isAdmin`
- Paginación en las respuestas

### Frontend
- **React**
- React Router
- Context API para autenticación y favoritos
- Hooks personalizados
- Styled Components / CSS Modules (según implementación)
- Axios para la comunicación con la API

### DevOps
- **Docker** y **Docker Compose** para levantar tanto la app como MongoDB
- **Mongo Compass** para gestión visual de la base de datos

---

## 🗄️ Estructura de carpetas (resumen)

### Backend (`/server`)
```
/controllers
    authController.js        → Controla el registro, login y autenticación de usuarios
    userController.js        → Gestión de usuarios: perfil, actualización, etc.
    restaurantController.js  → Lógica relacionada con restaurantes (crear, listar, detalle...)
    reviewController.js      → Gestión de reseñas de los restaurantes
    favoriteController.js    → Controlador para gestionar favoritos de los usuarios

/middlewares
    authMiddleware.js        → Middleware para proteger rutas privadas con JWT
    isAdmin.js               → Middleware para verificar si un usuario es admin
    errorHandler.js          → Middleware centralizado para el manejo de errores
    multerConfig.js          → Configuración de Multer para la subida de imágenes

/models
    → Esquemas de la base de datos (User, Restaurant, Review, etc.)

/routes
    → Definición de rutas de la API y conexión con sus controladores

/utils
    → Funciones auxiliares, validaciones, helpers, etc.

/docker
    → Archivos relacionados con la configuración y despliegue en Docker (Dockerfile, docker-compose.yml, etc.)



```
### Frontend (`/client`)
```

/components
    categoriesList/          → Lista de categorías de restaurantes
    createRestaurantForm/    → Formulario para crear nuevos restaurantes
    favoritesList/           → Lista de restaurantes marcados como favoritos
    loginModal/              → Modal de inicio de sesión
    mapLeaflet/              → Mapa interactivo con Leaflet
    navbar/                  → Barra de navegación principal
    registerModal/           → Modal de registro de usuario
    restaurantCard/          → Tarjeta visual con información de un restaurante
    restaurantsList/         → Vista con la lista general de restaurantes
    reviewForm/              → Formulario para dejar reseñas
    reviewsList/             → Lista de reseñas por restaurante
    searchFilter/            → Filtros de búsqueda por texto, categoría, etc.

/pages
    home/                    → Página principal de la aplicación
    profile/                 → Perfil del usuario, con favoritos y datos personales
    restaurantDetail/        → Detalle de cada restaurante individual
    root/                    → Layout general y configuración de rutas principales

/context
    → Contextos globales como autenticación, tema o favoritos

/styles
    → Estilos generales o compartidos (CSS, SCSS, Tailwind config...)

/utils
    → Funciones reutilizables, helpers, validaciones, etc.

```
---

## 📦 Instalación local

### 1. Clona el repositorio

```bash
git clone https://github.com/ibonbautista/Proyecto_Grupal_Full_Stack_JanToki
cd Proyecto_Grupal_Full_Stack_JanToki
```

### 2. Crea el archivo `.env` en el backend

Ejemplo de contenido:

```
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

APP_PORT=your_app_port
APP_HOST=your_app_host
JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173
```

> ⚠️ No subas tu `.env` a GitHub.

### 3. Inicia el proyecto con Docker

```bash
docker compose up --build
```

Esto levantará tanto el backend como la base de datos MongoDB.

### 4. Inicia el frontend

```bash
cd client
npm install
npm run dev
```

---

## 🧪 Funcionalidades según rol

| Funcionalidad                         | Visitante | Usuario | Admin |
|--------------------------------------|-----------|---------|-------|
| Ver restaurantes                     | ✅        | ✅      | ✅    |
| Buscar por nombre/población          | ✅        | ✅      | ✅    |
| Ver mapa de restaurante              | ✅        | ✅      | ✅    |
| Registrarse / Iniciar sesión         | ✅        | ✅      | ✅    |
| Escribir y editar reviews            | ❌        | ✅      | ✅    |
| Guardar favoritos                    | ❌        | ✅      | ✅    |
| Ver perfil con reviews               | ❌        | ✅      | ✅    |
| Crear/editar/eliminar restaurantes   | ❌        | ❌      | ✅    |
| Gestionar usuarios                   | ❌        | ❌      | ✅    |

---

## 🧰 Scripts útiles

```bash
# Backend
npm run dev       # Ejecuta el backend con nodemon

# Frontend
npm run dev       # Lanza el frontend React en http://localhost:5173
npm run build     # Build de producción

# Docker
docker-compose up       # Levanta la app y Mongo
docker-compose down     # Apaga todo
```

---

## 🧑‍🏫 Cómo contribuir

1. Haz un fork del proyecto.
2. Crea tu rama (`git checkout -b feature/nueva-feature`).
3. Haz commit de tus cambios (`git commit -am 'Add nueva feature'`).
4. Push a la rama (`git push origin feature/nueva-feature`).
5. Abre un Pull Request.

---

## 🧩 Posibles mejoras futuras

- 🌍 Traducción de la interfaz (euskera, francés, inglés…)
- 🔔 Notificaciones por email
- 🧠 Recomendador basado en tus reviews

---

## 🛡️ Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## ✨ Autor

**janToki** ha sido desarrollado por Sandra, Anaís, Ibon y Gaizka con ❤️ por la cultura gastronómica vasca.
