import { registerUser } from "../src/controllers/userController";
import User from "../src/models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

// Mock de Mongoose y dependencias
jest.mock("../src/models/User");
jest.mock("bcryptjs");

const MockedUser = User as jest.Mocked<typeof User>;

describe("registerUser", () => {
  it("debería registrar un usuario correctamente", async () => {
    // Simula que no hay un usuario existente
    MockedUser.findOne.mockResolvedValueOnce(null);

    // Mock para el método save en el prototipo
    const saveMock = jest.fn();
    MockedUser.prototype.save = saveMock;

    // Mock para bcrypt
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce("hashedPassword");

    const req = {
      body: { name: "Juan", email: "juan@example.com", password: "12345678" },
    } as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await registerUser(req, res);

    expect(MockedUser.findOne).toHaveBeenCalledWith({
      email: "juan@example.com",
    });
    expect(bcrypt.hash).toHaveBeenCalledWith("12345678", 10);
    expect(saveMock).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario registrado con éxito",
    });
  });
});
