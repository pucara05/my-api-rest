import express from "express";
import routes from './routes/index.js';
import dotenv from 'dotenv';
import setupSwagger from "./swagger.js";

dotenv.config();



const app = express();

const port = process.env.PORT|| 3000;
app.use(express.json());
app.use("/api", routes);


// Configuración de Swagger
setupSwagger(app);  

app.listen(port, () => {
    
    console.log(`Server running on port http://localhost:${port}`);
    console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});


