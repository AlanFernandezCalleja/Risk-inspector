import { Request, Response, NextFunction } from 'express';
import { CatalogosService } from '../services/catalogos.service.js';

export const CatalogosController = {
  async obtenerTipos(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CatalogosService.obtenerTipos();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Error al obtener tipos' });
    }
  },

  async obtenerNiveles(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CatalogosService.obtenerNiveles();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Error al obtener niveles' });
    }
  },

  async obtenerFrecuencias(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CatalogosService.obtenerFrecuencias();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Error al obtener frecuencias' });
    }
  },
  async obtenerTratamientos(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CatalogosService.obtenerTratamientos();
      return res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Error al obtener tratamientos' });
    }
  }
};