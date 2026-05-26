// src/controllers/activos.controller.ts
import { Request, Response, NextFunction } from 'express';
import { ActivosService } from '../services/activos.service.js';

export const ActivosController = {
  async obtenerActivos(req: Request, res: Response, next: NextFunction) {
    try {
      const activos = await ActivosService.obtenerTodos();
      return res.status(200).json(activos);
    } catch (error) {
      next(error); // Envía el error al middleware global
    }
  },

  async crearActivo(req: Request, res: Response, next: NextFunction) {
    try {
      const nuevoActivo = await ActivosService.crear(req.body);
      return res.status(201).json(nuevoActivo);
    } catch (error) {
      next(error);
    }
  },

  async actualizarActivo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const datosAActualizar = req.body;
      const idNumerico = Number(id);

      // Llamamos al servicio pasando el ID y los datos correspondientes
      const activoActualizado = await ActivosService.actualizar(idNumerico, datosAActualizar);

      return res.status(200).json({
        mensaje: 'Activo actualizado correctamente',
        data: activoActualizado
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || 'Error al actualizar el activo'
      });
    }
  },
  // Agregar esto dentro del objeto ActivosController:

  async eliminarActivo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idNumerico = Number(id);

      // Llamamos al servicio para borrar
      const activoEliminado = await ActivosService.eliminar(idNumerico);

      return res.status(200).json({
        mensaje: 'Activo eliminado correctamente',
        data: activoEliminado
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message || 'Error al eliminar el activo'
      });
    }
  }
};