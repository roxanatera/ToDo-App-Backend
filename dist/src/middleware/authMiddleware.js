"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extraer el token del encabezado
    if (!token) {
        res.status(401).json({ message: "No se proporcionó el token." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "defaultSecret");
        res.locals.userId = decoded.id; // Guardar el userId en res.locals
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Token inválido o expirado." });
    }
};
exports.verifyToken = verifyToken;
