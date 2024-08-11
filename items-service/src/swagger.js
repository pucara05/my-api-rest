import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const setupSwagger = (app) => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'CRUD API',
        version: '1.0.0',
        description: 'A simple CRUD API',
      },
   servers: [
  {
    url: `http://localhost:${process.env.PORT || 3000}/api`,
    description: 'Local server',
  },
],

    },
 apis: ['./src/routes/*.js'], // Asegúrate de que esta ruta sea correcta
  };

  const swaggerSpec = swaggerJsDoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
