import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Acceso denegado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret") as { id: string };
    (req as any).user = { id: decoded.id }; // Asocia el ID del usuario a la solicitud
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
};
