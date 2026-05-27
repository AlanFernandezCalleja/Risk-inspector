// src/routes/riesgos.routes.ts

import { Router } from 'express';
import { RiesgosController } from '../controllers/riesgos.controller.js';

const router = Router();

// Endpoint para obtener la matriz completa
router.get('/riesgos/lista', RiesgosController.listaRiesgos);

// Endpoint para obtener un riesgo específico
router.get('/riesgos/detalle/:id', RiesgosController.obtenerRiesgo);

// Endpoint para crear un nuevo riesgo
router.post('/riesgos/crear', RiesgosController.crearRiesgo);

// Endpoint para editar un riesgo existente
router.put('/riesgos/editar/:id', RiesgosController.editarRiesgo);

// Endpoint para eliminar un riesgo
router.delete('/riesgos/eliminar/:id', RiesgosController.eliminarRiesgo);

export default router;