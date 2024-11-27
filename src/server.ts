import express, { Request, Response, NextFunction } from "express";
import connectDB from "./config/database";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/taskRoutes";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { setupSwagger } from "./config/swagger";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173", // Para desarrollo local
  "https://mi-frontend-en-netlify.netlify.app", // Cambia a tu dominio en producción
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Permitir solicitudes desde orígenes válidos
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Si necesitas usar cookies o autenticación basada en sesiones
  })
);

// Configurar Swagger solo en desarrollo
if (process.env.NODE_ENV === "development") {
  setupSwagger(app);
}

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de tareas
app.use("/api/tasks", taskRoutes);

// Ruta por defecto
app.get("/", (req: Request, res: Response) => {
  res.send("API funcionando correctamente.");
});

// Middleware para manejo de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Inicialización del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.blue(`Servidor corriendo en puerto ${PORT}`));
});

export default app;
