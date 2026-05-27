// TODO: rutas de amenaza 
// TODO: endpoint obtener la lista de amenazas: GET /amenazas/lista
// TODO: endpoint editar una amenaza por id: PUT /amenaza/id
// TODO: endpoint eliminar una amenaza por id: DELETE /amenaza/id
// src/routes/amenazas.routes.ts

import { Router } from 'express';
import { AmenazasController } from '../controllers/amenazas.controller.js';

const router = Router();

// Endpoint para obtener la lista de amenazas
router.get('/amenazas/lista', AmenazasController.listaAmenazas);

//  Endpoint para obtener una sola amenaza por su ID
router.get('/amenazas/detalle/:id', AmenazasController.obtenerAmenaza);

// Endpoint para editar una amenaza por id
router.put('/amenazas/editar/:id', AmenazasController.editarAmenaza);

// Endpoint para eliminar una amenaza por id
router.delete('/amenazas/eliminar/:id', AmenazasController.eliminarAmenaza);

router.post('/amenazas/crear', AmenazasController.crearAmenaza);

export default router;