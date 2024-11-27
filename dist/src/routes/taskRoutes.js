"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
// Crear tarea
router.post("/", taskController_1.createTask);
// Obtener todas las tareas
router.get("/", taskController_1.getTasks);
// Actualizar una tarea
router.put("/:id", taskController_1.updateTask);
// Eliminar una tarea
router.delete("/:id", taskController_1.deleteTask);
exports.default = router;
