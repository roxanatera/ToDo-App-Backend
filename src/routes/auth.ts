import express from "express";
import { 
  registerUser, 
  loginUser, 
  getCurrentUser 
} from "../controllers/userController";
import { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask 
} from "../controllers/taskController";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Correo electrónico del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         name: Juan Pérez
 *         email: juan@example.com
 *         password: password123
 * 
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *           description: El título de la tarea
 *         description:
 *           type: string
 *           description: La descripción de la tarea
 *         userId:
 *           type: string
 *           description: ID del usuario que creó la tarea
 *       example:
 *         title: Comprar leche
 *         description: Ir al supermercado y comprar leche
 *         userId: 12345abcde
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints relacionados con la autenticación
 *   - name: Tasks
 *     description: Endpoints relacionados con las tareas
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       400:
 *         description: Error de validación.
 */
router.post("/register", registerUser);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *       401:
 *         description: Credenciales inválidas.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtener el usuario actual
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Usuario autenticado.
 *       401:
 *         description: Acceso denegado.
 */
router.get("/auth/me", getCurrentUser);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada con éxito.
 *       400:
 *         description: Error de validación (faltan datos obligatorios).
 *       500:
 *         description: Error al crear la tarea.
 */
router.post("/tasks", createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtener todas las tareas de un usuario
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       400:
 *         description: El userId es obligatorio.
 *       500:
 *         description: Error al obtener las tareas.
 */
router.get("/tasks", getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada con éxito.
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error al actualizar la tarea.
 */
router.put("/tasks/:id", updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada con éxito.
 *       404:
 *         description: Tarea no encontrada.
 *       500:
 *         description: Error al eliminar la tarea.
 */
router.delete("/tasks/:id", deleteTask);



export default router;
