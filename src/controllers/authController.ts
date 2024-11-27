import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Usa el tipo extendido de Request
interface CustomRequest extends Request {
  user?: { id: string };
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }

    // Verifica si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }

    // Crea y guarda el nuevo usuario
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Por favor, completa todos los campos." });
      return;
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Credenciales inválidas." });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "defaultsecret", {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error });
  }
};

export const getCurrentUser = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user?.id; // Acceder al usuario desde el middleware
    if (!userId) {
      res.status(401).json({ message: "No autorizado." });
      return;
    }

    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error });
  }
};
