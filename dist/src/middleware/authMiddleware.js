"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ message: "Acceso denegado" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "defaultsecret");
        req.user = { id: decoded.id }; // Asocia el ID del usuario a la solicitud
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Token inválido" });
    }
};
exports.authMiddleware = authMiddleware;
