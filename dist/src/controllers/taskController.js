"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
// Crear una tarea
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId; // Obtenemos el userId del middleware
        const { title, description } = req.body;
        if (!title || !description) {
            res.status(400).json({ message: "El título y la descripción son obligatorios." });
            return;
        }
        const existingTask = yield Task_1.default.findOne({ title, description, userId });
        if (existingTask) {
            res.status(400).json({ message: "La tarea ya existe." });
            return;
        }
        const newTask = new Task_1.default({ title, description, userId });
        yield newTask.save();
        res.status(201).json({ message: "Tarea creada con éxito.", task: newTask });
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la tarea.", error: error.message });
    }
});
exports.createTask = createTask;
// Obtener todas las tareas
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId; // Obtenemos el userId del middleware
        const tasks = yield Task_1.default.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({ tasks });
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas.", error });
    }
});
exports.getTasks = getTasks;
// Actualizar una tarea
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId; // Obtenemos el userId del middleware
        const { id } = req.params;
        const { title, description } = req.body;
        if (!title || !description) {
            res.status(400).json({ message: "El título y la descripción son obligatorios." });
            return;
        }
        const task = yield Task_1.default.findOne({ _id: id, userId });
        if (!task) {
            res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario." });
            return;
        }
        task.title = title;
        task.description = description;
        const updatedTask = yield task.save();
        res.status(200).json({ message: "Tarea actualizada con éxito.", task: updatedTask });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea.", error });
    }
});
exports.updateTask = updateTask;
// Eliminar una tarea
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.userId; // Obtenemos el userId del middleware
        const { id } = req.params;
        const task = yield Task_1.default.findOneAndDelete({ _id: id, userId });
        if (!task) {
            res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario." });
            return;
        }
        res.status(200).json({ message: "Tarea eliminada con éxito." });
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea.", error });
    }
});
exports.deleteTask = deleteTask;
