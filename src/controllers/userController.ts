import { Request, Response } from "express";
import { Jwt } from "jsonwebtoken";
import User from "../models/User";
import Joi from "joi";

// Esquema de validación para el registro
const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "El nombre es obligatorio.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El correo es obligatorio.",
    "string.email": "El correo debe ser válido.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.empty": "La contraseña es obligatoria.",
    "string.min": "La contraseña debe tener al menos 8 caracteres.",
  }),
});

import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      res.status(400).json({ message: "Errores de validación", errors });
      return;
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "El correo ya está registrado." });
      return;
    }

    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();

    // Generar un token JWT
    const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET || "defaultSecret", {
      expiresIn: "1h",
    });

    // Responder con el token y la información del usuario
    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { id: savedUser.id, name: savedUser.name, email: savedUser.email },
      token,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno al registrar usuario" });
  }
};



// **Controlador para iniciar sesión**
    const loginSchema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "El correo es obligatorio.",
        "string.email": "El correo debe ser válido.",
      }),
      password: Joi.string().required().messages({
        "string.empty": "La contraseña es obligatoria.",
      }),
    });

    // Controlador para iniciar sesión
    export const loginUser = async (req: Request, res: Response): Promise<void> => {
      try {
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
          const errors = error.details.map((err) => err.message);
          res.status(400).json({ message: "Errores de validación", errors });
          return;
        }
    
        const { email, password } = req.body;
    
        // Buscar el usuario por email
        const user = await User.findOne({ email });
        if (!user) {
          res.status(401).json({ message: "Correo o contraseña incorrectos." });
          return;
        }
    
        // Verificar contraseña
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
          res.status(401).json({ message: "Correo o contraseña incorrectos." });
          return;
        }
    
        // Generar un token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "defaultSecret", {
          expiresIn: "1h",
        });
    
        res.status(200).json({
          message: "Inicio de sesión exitoso",
          user: { id: user.id, name: user.name, email: user.email },
          token,
        });
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno al iniciar sesión" });
      }
    };
    
// **Controlador para obtener el usuario actual**
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ message: "El ID del usuario es obligatorio." });
      return;
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error al obtener el usuario actual:", error);
    res.status(500).json({ message: "Error interno al obtener el usuario actual" });
  }
};

