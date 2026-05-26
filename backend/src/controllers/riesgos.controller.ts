// src/controllers/activos.controller.ts
import { Request, Response, NextFunction } from 'express';
import { RiesgosService } from '../services/riesgos.service.js';

export const RiesgosController = {
  async obtenerRiesgos(req: Request, res: Response, next: NextFunction) {
    try {
      const riesgos = await RiesgosService.obtenerMatrizCompleta();
      return res.status(200).json(riesgos);
    } catch (error) {
      next(error); // Envía el error al middleware global
    }
  },
};