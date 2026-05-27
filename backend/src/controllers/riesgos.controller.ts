// src/controllers/riesgos.controller.ts

import { Request, Response, NextFunction } from 'express';
import { RiesgosService } from '../services/riesgos.service.js';

export const RiesgosController = {
  
  // OBTENER TODOS
  async listaRiesgos(req: Request, res: Response, next: NextFunction) {
    try {
      const matriz = await RiesgosService.obtenerMatrizCompleta();
      return res.status(200).json(matriz);
    } catch (error) {
      next(error);
    }
  },

  // OBTENER POR ID
  async obtenerRiesgo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumerico = Number(id);

      if (isNaN(idNumerico)) {
        return res.status(400).json({ error: 'El ID proporcionado no es válido' });
      }

      const riesgo = await RiesgosService.obtenerRiesgoPorId(idNumerico);

      if (!riesgo) {
        return res.status(404).json({ error: 'Riesgo no encontrado' });
      }

      return res.status(200).json(riesgo);
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Error al obtener el riesgo' });
    }
  },

  // CREAR NUEVO
  async crearRiesgo(req: Request, res: Response, next: NextFunction) {
    try {
      // 🌟 Extraemos controlesIds y el resto de los datos de forma limpia
      const { controlesIds, ...datosRiesgo } = req.body;

      const nuevoRiesgo = await RiesgosService.crearRiesgo(datosRiesgo, controlesIds);

      return res.status(201).json({
        mensaje: 'Riesgo creado exitosamente',
        data: nuevoRiesgo
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Error al crear el riesgo' });
    }
  },

  // EDITAR POR ID
  async editarRiesgo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumerico = Number(id);
      
      const { controlesIds, ...datosRiesgo } = req.body;

      const riesgoEditado = await RiesgosService.editarRiesgo(idNumerico, datosRiesgo, controlesIds);

      return res.status(200).json({
        mensaje: 'Riesgo actualizado correctamente',
        data: riesgoEditado
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Error al editar el riesgo' });
    }
  },

  // ELIMINAR POR ID
  async eliminarRiesgo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumerico = Number(id);
      
      await RiesgosService.eliminarRiesgo(idNumerico);

      return res.status(200).json({
        mensaje: 'Riesgo y sus controles asociados eliminados correctamente'
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Error al eliminar el riesgo' });
    }
  }
};