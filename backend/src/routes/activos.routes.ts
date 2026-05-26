// src/routes/activos.routes.ts
import { Router } from 'express';
import { ActivosController } from '../controllers/activos.controller.js';

const router = Router();

router.get('/activos/todos', ActivosController.obtenerActivos); // lista activos
router.post('/activos/crear', ActivosController.crearActivo); // crea un nuevo activo

// TODO: Endpoint Editar activo 
// Endpoint Editar activo listo:
router.put('/activos/editar/:id', ActivosController.actualizarActivo);



// Endpoint para Eliminar un Activo por id listo:
router.delete('/activos/eliminar/:id', ActivosController.eliminarActivo); 


export default router;