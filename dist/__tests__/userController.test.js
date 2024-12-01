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
const userController_1 = require("../src/controllers/userController");
const User_1 = __importDefault(require("../src/models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Mock de Mongoose y dependencias
jest.mock("../src/models/User");
jest.mock("bcryptjs");
const MockedUser = User_1.default;
describe("registerUser", () => {
    it("debería registrar un usuario correctamente", () => __awaiter(void 0, void 0, void 0, function* () {
        // Simula que no hay un usuario existente
        MockedUser.findOne.mockResolvedValueOnce(null);
        // Mock para el método save en el prototipo
        const saveMock = jest.fn();
        MockedUser.prototype.save = saveMock;
        // Mock para bcrypt
        bcryptjs_1.default.hash.mockResolvedValueOnce("hashedPassword");
        const req = {
            body: { name: "Juan", email: "juan@example.com", password: "12345678" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        yield (0, userController_1.registerUser)(req, res);
        expect(MockedUser.findOne).toHaveBeenCalledWith({
            email: "juan@example.com",
        });
        expect(bcryptjs_1.default.hash).toHaveBeenCalledWith("12345678", 10);
        expect(saveMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Usuario registrado con éxito",
        });
    }));
});
