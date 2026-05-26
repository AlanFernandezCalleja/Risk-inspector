// src/controllers/prioridades.controller.ts
import { Request, Response, NextFunction } from 'express';
import { PrioridadesService } from '../services/prioridades.service.js';

export const PrioridadesController = {
  async obtenerPrioridades(req: Request, res: Response, next: NextFunction) {
    try {
      const prioridades = await PrioridadesService.obtenerTodas();
      return res.status(200).json(prioridades);
    } catch (error) {
      next(error);
    }
  }
};