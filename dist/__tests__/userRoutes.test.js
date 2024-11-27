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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server")); // Asegúrate de apuntar correctamente al servidor
const mongoose_1 = __importDefault(require("mongoose"));
describe("Auth Routes", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Cierra la conexión a la base de datos después de las pruebas
        yield mongoose_1.default.connection.close();
    }));
    describe("POST /register", () => {
        it("debería registrar un usuario correctamente", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post("/api/auth/register")
                .send({ name: "Juan", email: "juan@example.com", password: "12345678Na" });
            expect(response.status).toBe(201); // Debería devolver 201 si el registro es exitoso
            expect(response.body).toEqual(expect.objectContaining({
                message: "Usuario registrado con éxito",
                user: expect.objectContaining({
                    id: expect.any(String),
                    name: "Juan",
                    email: "juan@example.com",
                }),
            }));
        }));
        it("debería devolver errores de validación si los campos están vacíos", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post("/api/auth/register")
                .send({ name: "", email: "", password: "" });
            expect(response.status).toBe(400); // Debería devolver 400 por errores de validación
            expect(response.body).toEqual(expect.objectContaining({
                message: "Errores de validación",
                errors: expect.arrayContaining([
                    "El nombre es obligatorio.",
                    "El correo es obligatorio.",
                    "La contraseña es obligatoria.",
                ]),
            }));
        }));
        it("no debería registrar un usuario si el correo ya está registrado", () => __awaiter(void 0, void 0, void 0, function* () {
            // Registra un usuario inicial
            yield (0, supertest_1.default)(server_1.default).post("/api/auth/register").send({
                name: "Prueba",
                email: "duplicado@example.com",
                password: "12345678Na",
            });
            // Intenta registrar otro usuario con el mismo correo
            const response = yield (0, supertest_1.default)(server_1.default)
                .post("/api/auth/register")
                .send({ name: "Duplicado", email: "duplicado@example.com", password: "12345678Na" });
            expect(response.status).toBe(400); // Debería devolver 400 por correo duplicado
            expect(response.body).toEqual(expect.objectContaining({
                message: "El correo ya está registrado.",
            }));
        }));
    });
    describe("POST /login", () => {
        it("debería iniciar sesión correctamente", () => __awaiter(void 0, void 0, void 0, function* () {
            // Registra un usuario para la prueba
            yield (0, supertest_1.default)(server_1.default).post("/api/auth/register").send({
                name: "Login Test",
                email: "testlogin@example.com",
                password: "12345678Na",
            });
            // Intenta iniciar sesión con las credenciales correctas
            const response = yield (0, supertest_1.default)(server_1.default)
                .post("/api/auth/login")
                .send({ email: "testlogin@example.com", password: "12345678Na" });
            expect(response.status).toBe(200); // Debería devolver 200 si el inicio de sesión es exitoso
            expect(response.body).toEqual(expect.objectContaining({
                message: "Inicio de sesión exitoso",
                user: expect.objectContaining({
                    id: expect.any(String),
                    name: "Login Test",
                    email: "testlogin@example.com",
                }),
            }));
        }));
        it("debería devolver un error si las credenciales son incorrectas", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post("/api/auth/login")
                .send({ email: "noexiste@example.com", password: "contraseñaIncorrecta" });
            expect(response.status).toBe(401); // Debería devolver 401 si las credenciales son incorrectas
            expect(response.body).toEqual(expect.objectContaining({
                message: "Correo o contraseña incorrectos.",
            }));
        }));
        it("debería devolver errores de validación si faltan campos", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default)
                .post("/api/auth/login")
                .send({ email: "", password: "" });
            expect(response.status).toBe(400); // Debería devolver 400 por errores de validación
            expect(response.body).toEqual(expect.objectContaining({
                message: "Errores de validación",
                errors: expect.arrayContaining([
                    "El correo es obligatorio.",
                    "La contraseña es obligatoria.",
                ]),
            }));
        }));
    });
    describe("GET /me", () => {
        let userId;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            // Registra un usuario y guarda su ID
            const registerResponse = yield (0, supertest_1.default)(server_1.default).post("/api/auth/register").send({
                name: "GetMe Test",
                email: "getme@example.com",
                password: "12345678Na",
            });
            userId = registerResponse.body.user.id;
        }));
        it("debería devolver un error si no se envía un userId", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get("/api/auth/me");
            expect(response.status).toBe(400); // Error de validación
            expect(response.body).toEqual(expect.objectContaining({
                message: "El ID del usuario es obligatorio.",
            }));
        }));
        it("debería devolver información del usuario autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/auth/me?userId=${userId}`);
            expect(response.status).toBe(200); // Respuesta exitosa
            expect(response.body).toEqual(expect.objectContaining({
                user: expect.objectContaining({
                    id: expect.any(String),
                    name: "GetMe Test",
                    email: "getme@example.com",
                }),
            }));
        }));
        it("debería devolver un error si el usuario no existe", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(server_1.default).get(`/api/auth/me?userId=64a1234f56b7890c12345678`);
            expect(response.status).toBe(404); // Usuario no encontrado
            expect(response.body).toEqual(expect.objectContaining({
                message: "Usuario no encontrado.",
            }));
        }));
    });
});
