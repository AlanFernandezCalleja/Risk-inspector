// Archivo src/controllers/amenazas.controller.ts

import { Request, Response, NextFunction } from 'express';
import { AmenazasService } from '../services/amenazas.service';


export const AmenazasController = {
    async listaAmenazas(req: Request, res: Response, next: NextFunction) {
        try {
            const amenazas = await AmenazasService.obtenerAmenazas();
            return res.status(200).json(amenazas);
        } catch (error) {
            next(error); // Envía el error al middleware global
        }
    },
    async eliminarAmenaza(req: Request, res: Response) {

        try {
            const { id } = req.params;
            const idNumerico = Number(id);
            const activoEliminado = await AmenazasService.eliminarAmenaza(idNumerico);

            return res.status(200).json({
                mensaje: 'Activo eliminado correctamente',
                data: activoEliminado
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message || 'Error al eliminar el activo'
            });
        }
    },
    async obtenerAmenaza(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const idNumerico = Number(id);

            // Validamos que el ID sea un número válido
            if (isNaN(idNumerico)) {
                return res.status(400).json({ error: 'El ID proporcionado no es válido' });
            }

            const amenaza = await AmenazasService.obtenerAmenaza(idNumerico);

            // Si Supabase devuelve un arreglo vacío (o null si usaste .single())
            if (!amenaza || (Array.isArray(amenaza) && amenaza.length === 0)) {
                return res.status(404).json({ error: 'Amenaza no encontrada' });
            }

            return res.status(200).json(amenaza);
        } catch (error: any) {
            return res.status(400).json({
                error: error.message || 'Error al obtener la amenaza'
            });
        }
    },

    // TODO: Editar amenaza controller. 
    async editarAmenaza(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const idNumerico = Number(id);
            const datosActualizados = req.body;

            const amenazaEditada = await AmenazasService.editarAmenaza(idNumerico, datosActualizados);

            return res.status(200).json({
                mensaje: 'Amenaza actualizada correctamente',
                data: amenazaEditada
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message || 'Error al editar la amenaza'
            });
        }
    },
        async crearAmenaza(req: Request, res: Response, next: NextFunction) {
            try {
                const nuevaAmenaza = await AmenazasService.crearAmenaza(req.body);
                return res.status(201).json({
                    mensaje: 'Amenaza creada exitosamente',
                    data: nuevaAmenaza
                });
            } catch (error: any) {
                return res.status(400).json({ error: error.message || 'Error al crear amenaza' });
            }
        },
} 