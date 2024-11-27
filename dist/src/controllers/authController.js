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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Todos los campos son obligatorios" });
            return;
        }
        // Verifica si el usuario ya existe
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "El usuario ya existe" });
            return;
        }
        // Crea y guarda el nuevo usuario
        const newUser = new User_1.default({ name, email, password });
        yield newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });
    }
    catch (error) {
        res.status(500).json({ message: "Error al registrar usuario", error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Por favor, completa todos los campos." });
            return;
        }
        const user = yield User_1.default.findOne({ email });
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            res.status(400).json({ message: "Credenciales inválidas." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "defaultsecret", {
            expiresIn: "1d",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Error del servidor", error });
    }
});
exports.loginUser = loginUser;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Acceder al usuario desde el middleware
        if (!userId) {
            res.status(401).json({ message: "No autorizado." });
            return;
        }
        const user = yield User_1.default.findById(userId).select("-password");
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error del servidor", error });
    }
});
exports.getCurrentUser = getCurrentUser;
