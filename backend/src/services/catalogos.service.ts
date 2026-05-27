// src/services/catalogos.service.ts
import { supabase } from '../config/supabase.js';

export const CatalogosService = {
  // GET: Tipos de Control
  async obtenerTipos() {
    const { data, error } = await supabase
      .from('tipos_control')
      .select('id, nombre');

    if (error) throw new Error(`Error al obtener tipos: ${error.message}`);
    return data;
  },

  // GET: Niveles (Automático, Manual, etc.)
  async obtenerNiveles() {
    const { data, error } = await supabase
      .from('niveles_control')
      .select('id, nombre');

    if (error) throw new Error(`Error al obtener niveles: ${error.message}`);
    return data;
  },

  // GET: Frecuencias
  async obtenerFrecuencias() {
    const { data, error } = await supabase
      .from('frecuencias')
      .select('id, nombre');

    if (error) throw new Error(`Error al obtener frecuencias: ${error.message}`);
    return data;
  },

  // GET: Tratamientos de Riesgo
  async obtenerTratamientos() {
    const { data, error } = await supabase
      .from('tratamientos_riesgo') // ⚠️ Ojo: Cambia esto si tu tabla se llama diferente (ej. tratamientos_riesgo)
      .select('id, nombre'); // ⚠️ Ojo: Cambia 'nombre' si tu columna se llama distinto (ej. descripcion)

    if (error) throw new Error(`Error al obtener tratamientos: ${error.message}`);
    return data;
  }
};