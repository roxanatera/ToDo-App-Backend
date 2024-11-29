"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Crear tarea
router.post("/", authMiddleware_1.verifyToken, taskController_1.createTask);
// Obtener todas las tareas
router.get("/", authMiddleware_1.verifyToken, taskController_1.getTasks);
// Actualizar tarea
router.put("/:id", authMiddleware_1.verifyToken, taskController_1.updateTask);
// Eliminar tarea
router.delete("/:id", authMiddleware_1.verifyToken, taskController_1.deleteTask);
exports.default = router;
