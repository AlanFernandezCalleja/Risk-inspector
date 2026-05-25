// index.ts (En tu BACKEND)
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; // <-- 1. IMPORTAR CORS
import rutasActivos from '../src/routes/routes.js'; 

const app = express();  
const port = process.env.PORT || 3000;

app.use(cors()); // <-- 2. ACTIVAR CORS (Permite que tu frontend se conecte)
app.use(express.json());
app.use('/', rutasActivos); 

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


export default app;