// src/routes/controles.routes.ts

import { Router } from 'express';
import { ControlesController } from '../controllers/controles.controller.js';

const router = Router();

// Endpoint para obtener la lista completa de controles
router.get('/controles/lista', ControlesController.listaControles);

// Endpoint para crear
router.post('/controles/crear', ControlesController.crearControl);

// Endpoint para obtener un solo control por su ID
router.get('/controles/detalle/:id', ControlesController.obtenerControl);

// Endpoint para editar un control por ID
router.put('/controles/editar/:id', ControlesController.editarControl);

// Endpoint para eliminar un control por ID
router.delete('/controles/eliminar/:id', ControlesController.eliminarControl);

export default router;