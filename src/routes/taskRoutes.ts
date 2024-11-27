import { Router } from "express";
import { 
createTask,
getTasks, 
updateTask, 
deleteTask } 
from "../controllers/taskController";

const router = Router();

// Crear tarea
router.post("/", createTask);

// Obtener todas las tareas
router.get("/", getTasks);

// Actualizar una tarea
router.put("/:id", updateTask); 

// Eliminar una tarea
router.delete("/:id", deleteTask); 

export default router;
