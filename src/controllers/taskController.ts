import { Request, Response } from "express";
import Task from "../models/Task";


// Crear una tarea
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.userId; // Obtenemos el userId del middleware
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: "El título y la descripción son obligatorios." });
      return;
    }

    const existingTask = await Task.findOne({ title, description, userId });
    if (existingTask) {
      res.status(400).json({ message: "La tarea ya existe." });
      return;
    }

    const newTask = new Task({ title, description, userId });
    await newTask.save();

    res.status(201).json({ message: "Tarea creada con éxito.", task: newTask });
  } catch (error: any) {
    res.status(500).json({ message: "Error al crear la tarea.", error: error.message });
  }
};

// Obtener todas las tareas
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.userId; // Obtenemos el userId del middleware

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas.", error });
  }
};

// Actualizar una tarea
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.userId; // Obtenemos el userId del middleware
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: "El título y la descripción son obligatorios." });
      return;
    }

    const task = await Task.findOne({ _id: id, userId });
    if (!task) {
      res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario." });
      return;
    }

    task.title = title;
    task.description = description;
    const updatedTask = await task.save();

    res.status(200).json({ message: "Tarea actualizada con éxito.", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea.", error });
  }
};

// Eliminar una tarea
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = res.locals.userId; // Obtenemos el userId del middleware
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId });
    if (!task) {
      res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario." });
      return;
    }

    res.status(200).json({ message: "Tarea eliminada con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea.", error });
  }
};
