# **To-Do App**

To-Do App es una aplicación para gestionar tareas personales desarrollada con un stack **MERN** (MongoDB, Express, React y Node.js). Este proyecto incluye un front-end responsivo desplegado en **Vercel** y un back-end desplegado en **Render**.

---

## **Índice**
1. [Características](#características)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Instalación y Configuración](#instalación-y-configuración)
   - [Back-end](#back-end)
   - [Front-end](#front-end)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Variables de Entorno](#variables-de-entorno)
6. [Despliegue en Producción](#despliegue-en-producción)
7. [Endpoints del Back-end](#endpoints-del-back-end)
8. [Contribuciones](#contribuciones)
9. [Licencia](#licencia)

---

## **Características**
- Gestión de usuarios: registro e inicio de sesión con tokens JWT.
- CRUD de tareas: creación, lectura, actualización y eliminación de tareas.
- **Autenticación segura** con JWT.
- Front-end responsivo con React.
- Configuración de **CORS** para entornos de desarrollo y producción.
- Documentación de API con Swagger.

---

## **Tecnologías Utilizadas**
### **Back-end**
- **Node.js** con **Express**
- **MongoDB** como base de datos
- **TypeScript** para tipado estático
- **Swagger** para documentación de la API
- Desplegado en **Render**

### **Front-end**
- **React** con Hooks y React Router
- **Vite** para desarrollo rápido
- **Tailwind CSS** para diseño responsivo
- Desplegado en **Vercel**

---


Variables de Entorno
Back-end
PORT: Puerto para el servidor Express.
MONGO_URI: URL de conexión a MongoDB.
JWT_SECRET: Clave secreta para firmar los tokens JWT.
Front-end
VITE_API_URL: URL base para las solicitudes API al back-end.
Despliegue en Producción
Back-end
Plataforma: Render
Asegúrate de configurar las variables de entorno en Render:
MONGO_URI
JWT_SECRET
Front-end
Plataforma: Vercel
Configura las variables de entorno en Vercel:
VITE_API_URL
Endpoints del Back-end
Autenticación
POST /api/auth/register: Registro de usuarios.
POST /api/auth/login: Inicio de sesión.
GET /api/auth/me: Obtiene la información del usuario autenticado.
Tareas
POST /api/tasks: Crear una nueva tarea.
GET /api/tasks: Obtener las tareas del usuario.
PUT /api/tasks/:id: Actualizar una tarea.
DELETE /api/tasks/:id: Eliminar una tarea.


