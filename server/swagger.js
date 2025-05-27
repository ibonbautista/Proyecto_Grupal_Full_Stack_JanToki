// swagger.js

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();
const APP_PORT = process.env.APP_PORT;
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'JanToki API',
    version: '1.0.0',
    description: 'API RESTful para la gestión de reviews de restaurantes, con autenticación de usuarios para crear, editar y consultar opiniones, además de permitir añadir restaurantes a favoritos de forma segura.',
  },
  servers: [
    {
      url: `http://localhost:${APP_PORT}/`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
