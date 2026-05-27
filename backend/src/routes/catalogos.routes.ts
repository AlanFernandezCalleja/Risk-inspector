import { Router } from 'express';
import { CatalogosController } from '../controllers/catalogos.controller.js';

const router = Router();

router.get('/catalogos/tipos', CatalogosController.obtenerTipos);
router.get('/catalogos/niveles', CatalogosController.obtenerNiveles);
router.get('/catalogos/frecuencias', CatalogosController.obtenerFrecuencias);
// Añade esta línea junto a tus otras rutas de catálogos
router.get('/catalogos/tratamientos', CatalogosController.obtenerTratamientos);

export default router;