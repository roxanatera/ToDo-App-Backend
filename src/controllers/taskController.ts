import { Request, Response } from "express";
import Task from "../models/Task";
import mongoose from "mongoose";
import User from "../models/User"; 


// Crear una tarea
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, userId } = req.body;

    if (!userId || !title || !description) {
      res.status(400).json({ message: "Todos los campos (userId, title, description) son obligatorios." });
      return;
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "El userId no es válido." });
      return;
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      res.status(404).json({ message: "El usuario no existe en la base de datos." });
      return;
    }

    // **Validación para evitar duplicados**
    const existingTask = await Task.findOne({ title, description, userId });
    if (existingTask) {
      res.status(400).json({ message: "La tarea ya existe." });
      return;
    }

    const newTask = new Task({ title, description, userId });
    await newTask.save();

    res.status(201).json({ message: "Tarea creada con éxito.", task: newTask });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Ya existe una tarea con este título para este usuario." });
    } else {
      res.status(500).json({ message: "Error al crear la tarea.", error: error.message });
    }
  }
};


// Obtener todas las tareas
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ message: "El userId es obligatorio." });
      return;
    }

    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas.", error });
  }
};


// Actualizar una tarea
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Validar campos
    if (!title?.trim() || !description?.trim()) {
      res.status(400).json({ message: "El título y la descripción son obligatorios." });
      return;
    }

    // Buscar y actualizar la tarea
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Tarea no encontrada." });
      return;
    }

    res.status(200).json({ message: "Tarea actualizada con éxito.", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea.", error });
  }
};
// Eliminar una tarea

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // ID de la tarea desde los parámetros de la ruta

    // Buscar y eliminar la tarea
    const deletedTask = await Task.findByIdAndDelete(id);

    // Verificar si la tarea existía
    if (!deletedTask) {
      res.status(404).json({ message: "Tarea no encontrada." });
      return;
    }

    // Respuesta de éxito
    res.status(200).json({ message: "Tarea eliminada con éxito." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea.", error });
  }
};
