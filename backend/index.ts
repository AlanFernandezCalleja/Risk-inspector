// index.ts
import express, { application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './src/middlewares/errorHandler.js';
import rutasActivos from './src/routes/activos.routes.js';
import rutasPrioridades from './src/routes/prioridades.routes.js';
import rutasRiesgos from './src/routes/riesgos.routes.js';
import rutasAmenazas from './src/routes/amenazas.routes.js';
import rutasControles from './src/routes/controles.routes.js';
import rutasCatalogo from './src/routes/catalogos.routes.js'

import rutasAuth from './src/routes/auth.routes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoints agrupados y limpios
app.use('/api', rutasCatalogo);
app.use('/api', rutasActivos);
app.use('/api', rutasPrioridades);
app.use('/api', rutasRiesgos);
app.use('/api', rutasAmenazas);
app.use('/api', rutasControles);
app.use('/api', rutasRiesgos);
app.use('/api', rutasAuth);

// El manejador de errores siempre debe ir al final
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}

export default app;