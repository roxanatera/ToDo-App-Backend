"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const cors_1 = __importDefault(require("cors"));
const swagger_1 = require("./config/swagger");
dotenv_1.default.config();
// Conectar a la base de datos
(0, database_1.default)();
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use(express_1.default.json());
// Configuración de CORS
const allowedOrigins = [
    "http://localhost:5173", // Frontend en desarrollo
    "https://to-do-app-front-end-beta.vercel.app", // Dominio en Vercel (asegúrate de que sea correcto)
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.error(`Origen no permitido: ${origin}`); // Mensaje de error más claro
            callback(new Error("No permitido por CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Incluye OPTIONS para preflight
    credentials: true, // Necesario si usas cookies
}));
// Manejo de solicitudes preflight (OPTIONS)
app.options("*", (0, cors_1.default)()); // Este middleware maneja las solicitudes OPTIONS automáticamente
// Configurar Swagger en todos los entornos
(0, swagger_1.setupSwagger)(app);
// Rutas de autenticación
app.use("/api/auth", auth_1.default);
app.use("/api/tasks", taskRoutes_1.default);
// Ruta por defecto
app.get("/", (req, res) => {
    res.send("API funcionando correctamente.");
});
app.get("/health", (req, res) => {
    res.status(200).json({ message: "El servidor está funcionando correctamente." });
});
// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});
// Inicialización del servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(colors_1.default.blue(`Servidor corriendo en puerto ${PORT}`));
});
exports.default = app;
