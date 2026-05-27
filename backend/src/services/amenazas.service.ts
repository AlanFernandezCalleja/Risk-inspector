// src/services/amenazas.service.ts
import { supabase } from '../config/supabase.js';

export const AmenazasService = {
  
  // 1. GET de todas las amenazas con su activo relacionado
  async obtenerAmenazas() {
    const { data, error } = await supabase
      .from('amenazas')
      .select(`
        id,
        amenaza,
        descripcion_amenaza,
        consecuencia,
        descripcion_consecuencia,
        probabilidad,
        impacto,
        activo:activos (
          id,
          nombre,
          descripcion_activo
        )
      `);

    if (error) {
      throw new Error(`Error al obtener amenazas: ${error.message}`);
    }
    // 💡 Inyectamos el cálculo de riesgo_inherente en caliente para el Frontend
    return data.map((item) => ({
      ...item,
      riesgo_inherente: item.probabilidad * item.impacto
    }));
  },

  // GET amenazas por id:
  async obtenerAmenaza(id:number){
    const { data, error } = await supabase
      .from('amenazas').select(`
        id,
        amenaza,
        descripcion_amenaza,
        consecuencia,
        descripcion_consecuencia,
        probabilidad,
        impacto,
        activo:activos (
          id,
          nombre,
          descripcion_activo
        )
      `).eq('id', id).single();

    if (error) {
      throw new Error(`Error al editar amenaza: ${error.message}`);
    }
    return data;
  },

  // 2. PUT o Edición de una Amenaza
  async editarAmenaza(id: number, datos: {
    activo_id?: number;
    amenaza?: string;
    descripcion_amenaza?: string;
    consecuencia?: string;
    descripcion_consecuencia?: string;
    probabilidad?: number;
    impacto?: number;
  }) {
    const { data, error } = await supabase
      .from('amenazas')
      .update(datos)
      .eq('id', id)
      .select().single();

    if (error) {
      throw new Error(`Error al editar amenaza: ${error.message}`);
    }
    return data;
  },

  // 3. DELETE de amenaza por id
  async eliminarAmenaza(id: number) {
    const { error } = await supabase
      .from('amenazas')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Error al eliminar amenaza: ${error.message}`);
    }
    return true;
  },
  // POST: Crear una nueva amenaza
  async crearAmenaza(datos: {
    activo_id: number;
    amenaza: string;
    descripcion_amenaza: string;
    consecuencia: string;
    descripcion_consecuencia: string;
    probabilidad: number;
    impacto: number;
  }) {
    const { data, error } = await supabase
      .from('amenazas')
      .insert([datos]) // Supabase espera un arreglo para el insert
      .select()
      .single();

    if (error) {
      throw new Error(`Error al crear amenaza: ${error.message}`);
    }
    return data;
  },
};