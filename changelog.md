# 📦 CHANGELOG OFICIAL

**Versión:** `v1.0 – Lanzamiento Beta Completo`  
**Fecha de lanzamiento:** 26 de mayo de 2025

---

## 🚀 Nuevas funcionalidades

- Valoración media en tarjetas y en el detalle del restaurante
- CRUD completo de restaurantes para administradores (crear, editar, borrar)
- Filtro por categoría, municipio y puntuación media
- Sistema de favoritos personalizado y persistente por usuario
- Sistema de reseñas:
  - Creación con texto e imágenes
  - Edición y eliminación de reseñas propias
  - Vista de reseñas públicas por restaurante
- Autenticación con roles (`usuario` y `admin`)
- Vista de perfil de usuario con:
  - Restaurantes guardados
  - Reseñas publicadas
- Subida de imágenes con Multer (restaurantes y reseñas)
- Selector de tema claro / oscuro en el frontend
- Mapa interactivo en la vista de detalle del restaurante
- Paginación en listados de restaurantes, reseñas y favoritos
- Rediseño completo de la interfaz para una experiencia más moderna y accesible

---

## 🐞 Correcciones importantes

- Solucionado error al acceder a favoritos vacíos
- Corrección de error al cargar restaurantes sin reseñas
- Eliminación de conflictos por nombres de archivo (`restaurantDetail.jsx`, `RestaurantDetail.jsx`, etc.)
- Unificación y uso coherente de `name` y `username` en formularios y datos
- Eliminación de errores de consola en vistas con listas vacías
- Validación robusta de roles y rutas protegidas
- Eliminación de archivos y componentes duplicados

---

## 🔄 Mejoras internas

- Refactorización de controladores y middlewares
- Limpieza de código innecesario y líneas repetidas
- Traducción y mejora de los mensajes de error del backend
- Gestión adecuada de imágenes por ID y nombres únicos
- Mejora de la estructura del frontend (componentes, rutas, hooks personalizados)

---

## 📅 Historial de cambios por fecha de commit

> Orden cronológico de los avances principales

### 📌 13 mayo 2025
- Añadido middleware de autenticación por rol
- División inicial de rutas protegidas (usuario / admin)

### 📌 15 mayo 2025
- CRUD básico de restaurantes
- Creación del modelo `Restaurant` con rating como `null` por defecto
- Vista de listado de restaurantes

### 📌 17 mayo 2025
- Sistema de login y registro funcionando
- Subida de imagen con Multer para restaurantes
- Página de perfil de usuario iniciada

### 📌 19 mayo 2025
- Sistema de favoritos por usuario
- Añadida lógica de guardado y borrado de favoritos
- Diseño inicial de botón de favorito en cards

### 📌 20 mayo 2025
- Mapa interactivo en detalle del restaurante
- Vista de reseñas por restaurante
- Paginación de listados

### 📌 21 mayo 2025
- Reseñas públicas y privadas
- Permisos y validaciones para editar y borrar reseñas propias

### 📌 22 mayo 2025
- Filtros por categoría, municipio y puntuación media
- Corrección de errores en rutas sin reseñas

### 📌 23 mayo 2025
- Tema claro / oscuro con persistencia
- Perfil de usuario completo con favoritos y reseñas
- Optimización de las vistas por roles

### 📌 25 mayo 2025
- Rediseño de la interfaz general
- Limpieza y organización de componentes
- Traducción de mensajes al español

---

## ✅ Estado actual del proyecto

El proyecto **JanToki** se encuentra en fase beta completamente funcional. Se abre ahora a pruebas internas y feedback real para preparar la siguiente iteración.

---

**¿Sugerencias o errores?**  
Abre un issue o contacta al equipo de desarrollo.  
¡Gracias por usar JanToki! 🍽️
