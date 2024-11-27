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
(0, database_1.default)();
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use(express_1.default.json());
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Cambia al dominio de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// Configurar Swagger
(0, swagger_1.setupSwagger)(app);
// Rutas de autenticación
app.use("/api/auth", auth_1.default);
// Rutas de tareas
app.use("/api/tasks", taskRoutes_1.default);
// Ruta por defecto
app.get("/", (req, res) => {
    res.send("API funcionando correctamente.");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(colors_1.default.blue(`Servidor corriendo en puerto ${PORT}`));
});
exports.default = app;
