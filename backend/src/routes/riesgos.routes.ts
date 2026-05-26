// src/routes/riesgos.routes.ts
import { Router } from 'express';
import { RiesgosController } from '../controllers/riesgos.controller.js';

const router = Router();
// TODO: Endpoint para obtener todas las prioridades
router.get('/riesgos', RiesgosController.obtenerRiesgos); //obtener todos los riesgos

router.get('/test-fantasma', (req, res) => {
  res.send('¡Hola! Si puedes ver esto, el servidor sí está leyendo este archivo.');
});

export default router;