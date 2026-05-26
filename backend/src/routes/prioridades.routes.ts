// src/routes/prioridades.routes.ts
import { Router } from 'express';
import { PrioridadesController } from '../controllers/prioridades.controller.js';

const router = Router();
// Endpoint para obtener todas las prioridades
router.get('/prioridades/lista', PrioridadesController.obtenerPrioridades);

export default router;