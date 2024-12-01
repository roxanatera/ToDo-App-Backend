import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


interface TokenPayload {
  id: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Extraer el token del encabezado
  if (!token) {
    res.status(401).json({ message: "No se proporcionó el token." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret") as TokenPayload;
    res.locals.userId = decoded.id; // Guardar el userId en res.locals
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado." });
  }
};
