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
exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const joi_1 = __importDefault(require("joi"));
// Esquema de validación para el registro
const registerSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required().messages({
        "string.empty": "El nombre es obligatorio.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.empty": "El correo es obligatorio.",
        "string.email": "El correo debe ser válido.",
    }),
    password: joi_1.default.string().min(8).required().messages({
        "string.empty": "La contraseña es obligatoria.",
        "string.min": "La contraseña debe tener al menos 8 caracteres.",
    }),
});
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            res.status(400).json({ message: "Errores de validación", errors });
            return;
        }
        const { name, email, password } = req.body;
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "El correo ya está registrado." });
            return;
        }
        const newUser = new User_1.default({ name, email, password });
        const savedUser = yield newUser.save();
        // Generar un token JWT
        const token = jsonwebtoken_1.default.sign({ id: savedUser.id }, process.env.JWT_SECRET || "defaultSecret", {
            expiresIn: "1h",
        });
        // Responder con el token y la información del usuario
        res.status(201).json({
            message: "Usuario registrado con éxito",
            user: { id: savedUser.id, name: savedUser.name, email: savedUser.email },
            token,
        });
    }
    catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error interno al registrar usuario" });
    }
});
exports.registerUser = registerUser;
// **Controlador para iniciar sesión**
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.empty": "El correo es obligatorio.",
        "string.email": "El correo debe ser válido.",
    }),
    password: joi_1.default.string().required().messages({
        "string.empty": "La contraseña es obligatoria.",
    }),
});
// Controlador para iniciar sesión
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = loginSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);
            res.status(400).json({ message: "Errores de validación", errors });
            return;
        }
        const { email, password } = req.body;
        // Buscar el usuario por email
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Correo o contraseña incorrectos." });
            return;
        }
        // Verificar contraseña
        const isPasswordCorrect = yield user.comparePassword(password);
        if (!isPasswordCorrect) {
            res.status(401).json({ message: "Correo o contraseña incorrectos." });
            return;
        }
        // Generar un token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || "defaultSecret", {
            expiresIn: "1h",
        });
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    }
    catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno al iniciar sesión" });
    }
});
exports.loginUser = loginUser;
// **Controlador para obtener el usuario actual**
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(400).json({ message: "El ID del usuario es obligatorio." });
            return;
        }
        const user = yield User_1.default.findById(id);
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
    }
    catch (error) {
        console.error("Error al obtener el usuario actual:", error);
        res.status(500).json({ message: "Error interno al obtener el usuario actual" });
    }
});
exports.getCurrentUser = getCurrentUser;
