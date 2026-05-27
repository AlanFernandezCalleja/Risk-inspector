// src/controllers/controles.controller.ts

import { Request, Response, NextFunction } from 'express';
import { ControlesService } from '../services/controles.service.js';

export const ControlesController = {
  
  // Obtener todos los controles
  async listaControles(req: Request, res: Response, next: NextFunction) {
    try {
      const controles = await ControlesService.obtenerControles();
      return res.status(200).json(controles);
    } catch (error) {
      next(error);
    }
  },

  // Obtener un solo control por ID
  async obtenerControl(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumerico = Number(id);

      if (isNaN(idNumerico)) {
        return res.status(400).json({ error: 'El ID proporcionado no es válido' });
      }

      const control = await ControlesService.obtenerControl(idNumerico);

      if (!control) {
        return res.status(404).json({ error: 'Control no encontrado' });
      }

      return res.status(200).json(control);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || 'Error al obtener el control'
      });
    }
  },

  // Editar un control por ID
  async editarControl(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumerico = Number(id);
      const datosActualizados = req.body;

      const controlEditado = await ControlesService.editarControl(idNumerico, datosActualizados);

      return res.status(200).json({
        mensaje: 'Control actualizado correctamente',
        data: controlEditado
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || 'Error al editar el control'
      });
    }
  },

  // Eliminar un control por ID
  async eliminarControl(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const idNumerico = Number(id);
      
      const controlEliminado = await ControlesService.eliminarControl(idNumerico);

      return res.status(200).json({
        mensaje: 'Control eliminado correctamente',
        data: controlEliminado
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || 'Error al eliminar el control'
      });
    }
  },
  async crearControl(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoControl = await ControlesService.crearControl(req.body);
      return res.status(201).json({
        mensaje: 'Control creado exitosamente',
        data: nuevoControl
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message || 'Error al crear control' });
    }
  },
};