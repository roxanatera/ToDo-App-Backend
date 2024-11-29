import { Router } from "express";
import { 
createTask,
getTasks, 
updateTask, 
deleteTask 
} 
from "../controllers/taskController";
import {verifyToken} from '../middleware/authMiddleware'

const router = Router();

// Crear tarea
router.post("/", verifyToken, createTask);

// Obtener todas las tareas
router.get("/", verifyToken, getTasks);

// Actualizar tarea
router.put("/:id", verifyToken, updateTask);

// Eliminar tarea
router.delete("/:id", verifyToken, deleteTask);

export default router;