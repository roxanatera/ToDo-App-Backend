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
  console.log("Documentación de API disponible en http://localhost:5000/api-docs");
};
