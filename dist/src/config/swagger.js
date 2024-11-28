"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'To-Do App API',
            version: '1.0.0',
            description: 'API para gestionar tareas y usuarios.',
        },
        servers: [
            {
                url: 'https://todo-app-backend-eef5.onrender.com/',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    const serverUrl = process.env.NODE_ENV === 'production'
        ? 'https://todo-app-backend-eef5.onrender.com/api-docs'
        : `http://localhost:${process.env.PORT || 5000}/api-docs`;
    console.log(`Documentación de API disponible en: ${serverUrl}`);
};
exports.setupSwagger = setupSwagger;
