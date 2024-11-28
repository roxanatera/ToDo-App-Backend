import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "To-Do App API",
      version: "1.0.0",
      description: "API para gestionar tareas y usuarios.",
    },
    servers: [
      {
        url: "https://todo-app-backend-eef5.onrender.com/",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Ruta donde están definidas tus rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Application): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  const serverUrl =
  process.env.NODE_ENV === "production"
      ? "https://todo-app-backend-eef5.onrender.com/api-docs" // URL del servidor en producción
      : "http://localhost:1000/api-docs"; // URL en desarrollo/local

  console.log(`Documentación de API disponible en: ${serverUrl}`);
};

