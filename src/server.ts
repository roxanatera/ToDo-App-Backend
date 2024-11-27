import express from "express";
import connectDB from "./config/database";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/taskRoutes";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { setupSwagger } from "./config/swagger";

dotenv.config();
connectDB();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia al dominio de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Configurar Swagger
setupSwagger(app);

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// Rutas de tareas
app.use("/api/tasks", taskRoutes);

// Ruta por defecto
app.get("/", (req, res) => {
  res.send("API funcionando correctamente.");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(colors.blue(`Servidor corriendo en puerto ${PORT}`));
});

export default app;
