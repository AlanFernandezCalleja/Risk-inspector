// src/routes/activos.ts
import { Router, Request, Response } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

// GET: Obtener todos los activos
router.get('/activos', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('activos')
            .select(`
        id, 
        nombre, 
        descripcion_activo, 
        prioridad_id:prioridades (id, nombre, nivel_peso)
      `); // <--- Aquí ocurre el JOIN automático usando alias

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (err: any) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// POST: Crear un nuevo activo
router.post('/activos', async (req: Request, res: Response) => {
    const { nombre, descripcion_activo, prioridad_id } = req.body;

    try {
        const { data, error } = await supabase
            .from('activos')
            .insert([{ nombre, descripcion_activo, prioridad_id }])
            .select(); // El .select() al final hace que devuelva el objeto recién creado con su ID generado

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(201).json(data[0]);
    } catch (err: any) {
        return res.status(500).json({ error: 'Error al insertar el activo' });
    }
});



router.get('/prioridades', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('prioridades')
            .select(`
        id, 
        nombre, 
        nivel_peso
      `); // <--- Aquí ocurre el JOIN automático usando alias

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json(data);
    } catch (err: any) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});


export default router;