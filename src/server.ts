import express, { Request, Response, NextFunction } from "express";
import connectDB from "./config/database";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/taskRoutes";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { setupSwagger } from "./config/swagger";

dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
const allowedOrigins = [
  "http://localhost:5173", // Frontend en desarrollo
  "https://to-do-app-front-end-beta.vercel.app", // Dominio en Vercel (asegúrate de que sea correcto)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Origen no permitido: ${origin}`); // Mensaje de error más claro
        callback(new Error("No permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Incluye OPTIONS para preflight
    credentials: true, // Necesario si usas cookies
  })
);

// Manejo de solicitudes preflight (OPTIONS)
app.options("*", cors()); // Este middleware maneja las solicitudes OPTIONS automáticamente

// Configurar Swagger en todos los entornos
setupSwagger(app);

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
