// src/services/activos.service.ts
import { supabase } from '../config/supabase.js';

export const ActivosService = {
  async obtenerTodos() {
    const { data, error } = await supabase
      .from('activos')
      .select('id, nombre, descripcion_activo, prioridad_id:prioridades (id, nombre, nivel_peso)');

    if (error) throw new Error(error.message);
    return data;
  },

  async crear(activo: { nombre: string; descripcion_activo: string; prioridad_id: number }) {
    const { data, error } = await supabase
      .from('activos')
      .insert([activo])
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  },
  
  async actualizar(id: string | number, activo: { nombre?: string; descripcion_activo?: string; prioridad_id?: number }) {
    const { data, error } = await supabase
      .from('activos')
      .update(activo) // Supabase es inteligente: solo actualizará los campos que le envíes
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error('Activo no encontrado');

    return data[0]; // Retornamos el activo ya modificado
  },
  // Agregar esto dentro del objeto ActivosService:

  async eliminar(id: number) {
    const { data, error } = await supabase
      .from('activos')
      .delete()
      .eq('id', id)
      .select(); // .select() nos permite devolver el activo que acabamos de borrar

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error('El activo no existe o ya fue eliminado');

    return data[0];
  }
};